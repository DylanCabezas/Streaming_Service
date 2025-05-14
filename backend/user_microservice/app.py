from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import mysql.connector

# Configuración de la base de datos
host_name = "mysql"  
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
    password: str 
    video_id: List[int]

class Favorite(BaseModel):
    id: int
    video_id: int

@app.get("/")
def health_check():
    return {"status": "API is running"}

@app.post("/user")
def create_user(user: User):
    try:
        db = mysql.connector.connect(host=host_name, port=port_number, user=user_name, password=password_db, database=database_name)
        cursor = db.cursor()
        cursor.execute("""
            INSERT INTO users (id, username, email, edad, genero, ciudad, password)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """, (user.id, user.username, user.email, user.edad, user.genero, user.ciudad, user.password)) 
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

@app.get("/user/{user_id}")
def get_user(user_id: int):
    db = mysql.connector.connect(host=host_name, port=port_number, user=user_name, password=password_db, database=database_name)
    cursor = db.cursor()
    cursor.execute("""
        SELECT u.id, u.username, u.email, u.edad, u.genero, u.ciudad, GROUP_CONCAT(f.video_id) as favorite_videos
        FROM users u
        LEFT JOIN favorites f ON u.id = f.id
        WHERE u.id = %s
        GROUP BY u.id
    """, (user_id,))
    result = cursor.fetchone()
    cursor.close()
    db.close()
    return {"user": result}

@app.patch("/user/{user_id}")
def update_user(user_id: int, user: User):
    try:
        db = mysql.connector.connect(host=host_name, port=port_number, user=user_name, password=password_db, database=database_name)
        cursor = db.cursor()
        cursor.execute("""
            UPDATE users
            SET username = %s, email = %s, edad = %s, genero = %s, ciudad = %s, password = %s
            WHERE id = %s
        """, (user.username, user.email, user.edad, user.genero, user.ciudad, user.password, user_id))  # Actualizar el password
        
        # Eliminar los favoritos actuales
        cursor.execute("DELETE FROM favorites WHERE id = %s", (user_id,))
        
        # Insertar los nuevos favoritos
        for video_id in user.video_id:
            cursor.execute("""
                INSERT INTO favorites (id, video_id) 
                VALUES (%s, %s)
            """, (user_id, video_id))

        db.commit()
        cursor.close()
        db.close()
        return {"message": "User updated successfully"}
    except Exception as e:
        return {"error": str(e)}

@app.delete("/user/{user_id}")
def delete_user(user_id: int):
    try:
        db = mysql.connector.connect(host=host_name, port=port_number, user=user_name, password=password_db, database=database_name)
        cursor = db.cursor()
        
        # Eliminar los favoritos del usuario
        cursor.execute("DELETE FROM favorites WHERE id = %s", (user_id,))
        
        # Eliminar el usuario
        cursor.execute("DELETE FROM users WHERE id = %s", (user_id,))
        
        db.commit()
        cursor.close()
        db.close()
        return {"message": "User deleted successfully"}
    except Exception as e:
        return {"error": str(e)}

@app.post("/favorite")
def add_favorite(item: Favorite):
    try:
        db = mysql.connector.connect(host=host_name, port=port_number, user=user_name, password=password_db, database=database_name)
        cursor = db.cursor()
        cursor.execute("""
            INSERT INTO favorites (id, video_id) 
            VALUES (%s, %s)
        """, (item.id, item.video_id))
        db.commit()
        cursor.close()
        db.close()
        return {"message": "Video added to favorites"}
    except Exception as e:
        return {"error": str(e)}

@app.delete("/favorite/{video_id}")
def delete_favorite(video_id: int):
    try:
        db = mysql.connector.connect(host=host_name, port=port_number, user=user_name, password=password_db, database=database_name)
        cursor = db.cursor()
        cursor.execute("DELETE FROM favorites WHERE video_id = %s", (video_id,))
        db.commit()
        cursor.close()
        db.close()
        return {"message": "Video removed from favorites"}
    except Exception as e:
        return {"error": str(e)}

@app.get("/favorites/{user_id}")
def get_favorites(user_id: int):
    db = mysql.connector.connect(host=host_name, port=port_number, user=user_name, password=password_db, database=database_name)
    cursor = db.cursor()
    cursor.execute("""
        SELECT f.video_id
        FROM favorites f
        WHERE f.id = %s
    """, (user_id,))
    result = cursor.fetchall()
    cursor.close()
    db.close()
    return {"favorites": result}
