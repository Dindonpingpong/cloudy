from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import psycopg2

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "https://dindonpingpong.github.io"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

URI = "postgres://dhrmhtfbhqplfe:1ad5bfc52102553cd11f612e44f6fa0f626ee7f16bd3a4ee3c7e7712677dbf87@ec2-52-212-228-71.eu-west-1.compute.amazonaws.com:5432/d5nnlffhse9ujv"
# Connect to your postgres DB
conn = psycopg2.connect(URI)

class User(BaseModel):
    name: str
    riddle: str

users = {}

@app.get("/")
def read_root():
    return {"Hello": "Nya"}

@app.get("/users")
def get_users():
    cur = conn.cursor()

    cur.execute("SELECT * FROM users")

    records = cur.fetchall()

    return [{ "name": user[1], "riddle": user[2] } for user in records]

@app.post("/users")
def add_user(user: User):
    cur = conn.cursor()

    query = """ INSERT INTO users (nickname, riddle)
                    VALUES (%s, %s)
                    ON CONFLICT (nickname) DO UPDATE
                    SET riddle = %s"""

    record_to_insert = (user.name, user.riddle, user.riddle)

    cur.execute(query, record_to_insert)

    conn.commit()

    count = cur.rowcount

    if count == 0:
        return []

    cur.execute("SELECT * FROM users")

    records = cur.fetchall()

    return [{ "name": user[1], "riddle": user[2] } for user in records]
