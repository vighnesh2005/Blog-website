import mysql.connector

mydb = mysql.connector.connect(
    host="localhost",   
    port=4802,
    user="root",
    password="prasad2005"
)

cur = mydb.cursor()

cur.execute("CREATE DATABASE IF NOT EXISTS blog_web")

cur.execute("USE blog_web")

cur.execute("""
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    profile_picture BLOB DEFAULT NULL,
    bio TEXT DEFAULT NULL
)
""")
mydb.commit()
print("Table created successfully")

cur.execute("""
CREATE TABLE IF NOT EXISTS posts(
    id INT AUTO_INCREMENT PRIMARY KEY ,
    title VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
)""")

print('before')
cur.execute("ALTER TABLE users MODIFY profile_picture LONGBLOB")
mydb.commit()

print('after')