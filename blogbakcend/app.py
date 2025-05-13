from fastapi import FastAPI, HTTPException
from jose import jwt, JWTError
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os
import bcrypt
import mysql.connector
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import re,base64

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def verify_token(token: str) -> bool:
    try:
        jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return True
    except JWTError:
        return False

def extract_first_image(html_content):
    match = re.search(r'<img\s+[^>]*src=["\']([^"\']+)["\']', html_content)
    return match.group(1) if match else None

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        port=4802,
        user="root",
        password="prasad2005",
        database="blog_web",
        connection_timeout=600000
    )

class UserSignup(BaseModel):
    username: str
    password: str
    confirm_password: str

class UserLogin(BaseModel):
    username: str
    password: str

class SaveBlog(BaseModel):
    username: str
    content: str
    token: str
    title: str
    category: str

class MyBlogs(BaseModel):
    username: str
    token: str

class   ViewBlog(BaseModel):
    token: str
    id: int

class Profile(BaseModel):
    username:str
    token:str

class Edit(BaseModel):
    id:int
    title:str
    content:str
    category:str
    token:str



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "*"],
)

@app.post("/signup")
def signup(user: UserSignup):
    if user.password != user.confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")

    try:
        con = get_db_connection()
        cur = con.cursor()
        cur.execute("SELECT * FROM users WHERE username = %s", (user.username,))
        new_user = cur.fetchone()

        if new_user:
            raise HTTPException(status_code=400, detail="User already exists")

        hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())
        cur.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (user.username, hashed_password))
        con.commit()

    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        con.close()

    return {"status": "User created successfully"}

@app.post("/login")
def login(user: UserLogin):
    try:
        con = get_db_connection()
        cur = con.cursor()
        cur.execute("SELECT username, password FROM users WHERE username = %s", (user.username,))
        db_user = cur.fetchone()

        if not db_user:
            raise HTTPException(status_code=400, detail="User doesn't exist")

        valid = bcrypt.checkpw(user.password.encode('utf-8'), db_user[1].encode('utf-8'))
        if not valid:
            raise HTTPException(status_code=400, detail="Password doesn't match")

        token = create_access_token({"sub": user.username})

    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        con.close()

    return {
        "status": "Login successful",
        "username": user.username,
        "token": token
    }

@app.post("/saveblog")
def saveblog(data: SaveBlog):
    if not verify_token(data.token):
        return {"status": "Not Logged in"}
    
    username = data.username
    title = data.title
    content = data.content
    category = data.category

    try:
        con = get_db_connection()
        cur = con.cursor()
        cur.execute("SELECT id FROM users WHERE username = %s", (username,))
        user_row = cur.fetchone()
        
        if not user_row:
            return {"status": "User not found"}

        user_id = user_row[0]

        cur.execute(
            "INSERT INTO posts (user_id, title, content, category) VALUES (%s, %s, %s, %s)",
            (user_id, title, content, category)
        )
        con.commit()

    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        con.close()

    return {"status": "OK"}

@app.post("/myblogs")
def myblogs(data: MyBlogs):
    username = data.username
    token = data.token

    if not verify_token(token):
        return {"status": "Not Logged in"}

    try:
        con = get_db_connection()
        cur = con.cursor()
        cur.execute("SELECT id FROM users WHERE username = %s", (username,))
        user_row = cur.fetchone()
        if not user_row:
            return {"status": "User not found"}
        user_id = user_row[0]

        cur.execute("SELECT id, title, content, category, created_at FROM posts WHERE user_id = %s", (user_id,))
        posts = cur.fetchall()

        blogs = []
        for post in posts:
            blog_id, title, content, category, created_at = post
            picture = extract_first_image(content)
            blogs.append({
                "id": blog_id,
                "picture": picture,
                "title": title,
                "category": category,
                "createdat": created_at
            })

    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        con.close()

    return {"status": "OK", "blogs": blogs}

@app.get("/getdata")
def getdata():
    try:
        con = get_db_connection()
        cur = con.cursor()
        cur.execute('''SELECT p.id,p.category,p.title,u.username,p.content
                        FROM posts as p
                        INNER JOIN users as u on u.id = p.user_id
                        ORDER BY p.created_at
                        LIMIT 18''')
        data = cur.fetchall()
        blogs = []
        for post in data:
            id, category, title, username, content = post
            picture = extract_first_image(content)
            blogs.append({
                "id": id,
                "category": category,
                "title": title,
                "author": username,
                "picture": picture
            })
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")
    finally:
        con.close()

    return blogs

@app.post("/viewblog")
def viewblog(data: ViewBlog):
    if not verify_token(data.token):
        return {"status": "Not Logged in"}

    try:
        con = get_db_connection()
        cur = con.cursor()
        cur.execute("SELECT p.title, u.username, p.category, p.content FROM posts as p JOIN users as u on p.user_id = u.id WHERE p.id = (%s)", (data.id,))
        res = cur.fetchone()
        if not res:
            return {"status": "error", "message": "Post not found"}
        return {
            "status": "ok",
            "username": res[1],
            "title": res[0],
            "category": res[2],
            "content": res[3]
        }
    except Exception as e:
        return {"status": "error", "message": f"Error: {str(e)}"}
    finally:
        con.close()

@app.post("/deleteblog")
def delete(data:ViewBlog):
    if not verify_token(data.token):
        return {"status":"Not Logged in"}
    con = get_db_connection()
    cur = con.cursor()
    cur.execute("DELETE p FROM posts as p WHERE id = %s",(data.id,))
    con.commit()
    return {"status":"Success"}

@app.post("/profile")
def profile(data:Profile):
    if not verify_token(data.token):
        return {"status":"Not Logged in"}
    
    con = get_db_connection()
    cur = con.cursor()
    cur.execute("SELECT profile_picture from users WHERE username = %s",(data.username,))

    result = cur.fetchone()
    con.close()

    if not result or result[0] is None:
        return {"status": "ok", "photo": "None"}

    photo_blob = result[0]
    base64_photo = base64.b64encode(photo_blob).decode("utf-8")

    return {
        "status": "ok",
        "photo": f"data:image/jpeg;base64,{base64_photo}"
    }

class Profpic(BaseModel):
    username: str
    token: str
    file: str 

@app.post("/profpic")
def update_profile_pic(data: Profpic):
    if not verify_token(data.token):
        return {"status": "Not Logged In"}

    base64_data = re.sub(r'^data:image\/[a-zA-Z]+;base64,', '', data.file)

    try:
        image_bytes = base64.b64decode(base64_data)
    except Exception as e:
        return {"status": "error", "message": "Invalid image data"}

    try:
        con = get_db_connection()
        cur = con.cursor()

        cur.execute("UPDATE users SET profile_picture = %s WHERE username = %s", (image_bytes, data.username))
        con.commit()
        con.close()

        return {
            "status": "ok",
            "message": "Profile picture updated successfully",
            "photo": data.file  
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}
    
class name(BaseModel):
    search:str

@app.post("/search")
def search(data:name):
    con = get_db_connection()
    cur = con.cursor()
    name = data.search.lower()
    pattern = f"%{name}%"

    cur.execute('''SELECT p.id,p.title,p.category,p.content,u.username
                FROM posts as p JOIN users as u
                ON u.id = p.user_id
                WHERE LOWER(u.username) LIKE %s OR LOWER(p.title) LIKE %s OR LOWER(p.category) LIKE %s
            ''',(pattern,pattern,pattern,))
    
    posts = cur.fetchall()
    res = []
    for post in posts:
        id,title,category,content,username = post
        photo = extract_first_image(content)
        res.append(
            {
                "id":id,
                "title":title,
                "category":category,
                "picture":photo,
                "author":username
            }
        )
    return res

@app.post("/edit")
def edit(data:Edit):
    if not verify_token(data.token):
        return {"status" : "Not Logged in"}
    
    con = get_db_connection()
    cur = con.cursor()

    cur.execute('''UPDATE posts SET title = %s,category = %s,content=%s WHERE id = %s
                ''',(data.title,data.category,data.content,data.id,))
    con.commit()
    cur.close()
    con.close()
    return {"status":"ok"}

