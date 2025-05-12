from fastapi import FastAPI, HTTPException
from jose import jwt, JWTError
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os
import bcrypt
import mysql.connector
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import io

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

from jose import jwt, JWTError

def verify_token(token: str) -> bool:
    try:
        jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return True
    except JWTError:
        return False


con = mysql.connector.connect(
    host="localhost",
    port=4802,
    user="root",
    password="prasad2005",
    database="blog_web"
)

cur = con.cursor()

class UserSignup(BaseModel):
    username: str
    password: str
    confirm_password: str

class UserLogin(BaseModel):
    username: str
    password: str

class SaveBlog(BaseModel):
    username:str
    content:str
    token:str
    title:str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],  # Allow the necessary methods
    allow_headers=["Content-Type", "Authorization", "*"],  # Allow necessary headers
)


@app.post("/signup")
def signup(user: UserSignup):
    if user.password != user.confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")

    try:
        cur.execute("SELECT * FROM users WHERE username = %s", (user.username,))
        new_user = cur.fetchone()

        if new_user:
            raise HTTPException(status_code=400, detail="User already exists")

        hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())
        cur.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (user.username, hashed_password))
        con.commit()

    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")

    return {"status": "User created successfully"}

@app.post("/login")
def login(user: UserLogin):
    print(user)
    cur.execute("SELECT username, password FROM users WHERE username = %s", (user.username,))
    db_user = cur.fetchone()

    if not db_user:
        raise HTTPException(status_code=400, detail="User doesn't exist")

    valid = bcrypt.checkpw(user.password.encode('utf-8'), db_user[1].encode('utf-8'))
    if not valid:
        raise HTTPException(status_code=400, detail="Password doesn't match")

    token = create_access_token({"sub": user.username})
    return {
        "status": "Login successful",
        "username": user.username,
        "token": token
    }

@app.post("/saveblog")
def saveblog(data:SaveBlog):
    if(not verify_token(data.token)):
        return {"status":"Not Logged in"}
    username = data.username
    blog = data.content
    title = data.title
    category=data.category


    cur.execute("SELECT id FROM users WHERE username = (%s)",[username,])
    userid = cur.fetchone()[0]

    cur.execute("INSERT INTO posts (user_id,title,content) VALUES(%s,%s,%s,%s)",[userid,title,blog,category])
    con.commit()

    return {"status":"OK"}
