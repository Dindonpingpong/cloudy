from fastapi import FastAPI
from pydantic import BaseModel
from pydantic.types import UUID4

app = FastAPI()

class User(BaseModel):
    name: str
    riddle: str

users = {}

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/users")
def get_users():
    return users

@app.post("/users")
def add_user(user: User):
    users[user.name] = user

    return users.items()
