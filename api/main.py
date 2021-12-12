from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

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

class User(BaseModel):
    name: str
    riddle: str

users = {}

@app.get("/")
def read_root():
    return {"Hello": "Nya"}

@app.get("/users")
def get_users():
    return [{ "name": key, "riddle": users[key] } for key in users]

@app.post("/users")
def add_user(user: User):
    users[user.name] = user.riddle

    return [{ "name": key, "riddle": users[key] } for key in users]
