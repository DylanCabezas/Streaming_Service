from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import mysql.connector

# Configuración de la base de datos
host_name = "mysql"  # Nombre del servicio de MySQL en Docker Compose
port_number = 3306
user_name = "user"
password_db = "userpassword"
database_name = "user_db"

app = FastAPI()

# Modelos de datos
class User(BaseModel):
    id: int
    username: str
    email: str
    edad: int
    genero: str
    ciudad: str
    video_id: List[int]

class Favorite(BaseModel):
    id: int
    video_id: int

@app.post("/user")
def create_user(user: User):
    try:
        db = mysql.connector.connect(host=host_name, port=port_number, user=user_name, password=password_db, database=database_name)
        cursor = db.cursor()
        cursor.execute("""
            INSERT INTO users (id, username, email, edad, genero, ciudad)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (user.id, user.username, user.email, user.edad, user.genero, user.ciudad))
        
        for video_id in user.video_id:
            cursor.execute("""
                INSERT INTO favorites (id, video_id) 
                VALUES (%s, %s)
            """, (user.id, video_id))

        db.commit()
        cursor.close()
        db.close()
        return {"message": "User created successfully"}
    except Exception as e:
        return {"error": str(e)}

@app.get("/users")
def get_users():
    db = mysql.connector.connect(host=host_name, port=port_number, user=user_name, password=password_db, database=database_name)
    cursor = db.cursor()
    cursor.execute("""
        SELECT u.id, u.username, u.email, u.edad, u.genero, u.ciudad, GROUP_CONCAT(f.video_id) as favorite_videos
        FROM users u
        LEFT JOIN favorites f ON u.id = f.id
        GROUP BY u.id
    """)
    result = cursor.fetchall()
    cursor.close()
    db.close()
    return {"users": result}
