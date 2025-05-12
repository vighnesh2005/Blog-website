import mysql.connector

mydb = mysql.connector.connect(
    host="localhost",   
    port=4802,
    user="root",
    password="prasad2005"
)

cur = mydb.cursor()
cur.execute("USE blog_web")
cur.execute("SELECT * FROM posts")
print("Last post:", cur.fetchone())

