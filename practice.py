import mysql.connector

mydb = mysql.connector.connect(
    host="localhost", 
    port=4802,     
    user="root",
    password="prasad2005")

cur = mydb.cursor()

cur.execute("CREATE DATABASE IF NOT EXISTS mydatabase")

print("Database created successfully")