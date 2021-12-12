import React, { useEffect, useState } from 'react'
import { Button, Card, CardTitle, Col, Container, Input, InputGroup, InputGroupText, Row } from 'reactstrap';

const API_URL = "https://cloudy-bread.herokuapp.com";

function getUsers() {
    const request = new Request(`${API_URL}/users`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    })

    return fetch(request)
}

function setRiddle(login, riddle) {
    const request = new Request(`${API_URL}/users`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            "name": login,
            "riddle": riddle
        })
    })

    return fetch(request)
}

const PlayerCard = ({ login, isMe, riddle, index }) => {
    const [type, setType] = useState("password");
    const [newRiddle, setNewRiddle] = useState("");

    const toggleRiddle = () => {
        if (type === "password") {
            setType("text")
        } else {
            setType("password")
        }
    }

    const changeRiddle = async () => {
        await setRiddle(login, newRiddle);
    }

    return (
        <Col xs='4' key={index}>
            <Card className='px-3 py-3'>
                <CardTitle>{login}</CardTitle>
                {
                    isMe &&
                    <InputGroup>
                        <Input placeholder="Riddle" type={type} defaultValue={riddle} />
                        <InputGroupText>
                            <Input
                                addon
                                type="checkbox"
                                onClick={toggleRiddle}
                            />
                        </InputGroupText>
                    </InputGroup>
                }
                {
                    !isMe &&
                    <InputGroup>
                        <Input defaultValue={riddle} onChange={(e) => setNewRiddle(e.target.value)}/>
                        <Button onClick={changeRiddle}>
                            Change
                        </Button>
                    </InputGroup>
                }
            </Card>
        </Col>
    )
}

export default function Game({ login }) {
    const [users, setUsers] = useState([{ "name": "test", "riddle": "est" }]);

    useEffect(() => {
        async function fetchUsers() {
            let response = await getUsers();

            if (response.ok) {
                let json = await response.json();
                setUsers(json);
            }
        }

        fetchUsers();
    }, [])

    return (
        <Container className='lg mt-5' >
            <Row className='d-flex justify-content-center'>
                {
                    users.map((user, key) => {
                        const { name, riddle } = user;

                        if (login === name) {
                            return (
                                <PlayerCard key={key} index={key} login={login} isMe={true} riddle={riddle} />
                            )
                        } else {
                            return (
                                <PlayerCard key={key} index={key} login={name} isMe={false} riddle={riddle} />
                            )
                        }
                    })
                }
            </Row>
        </Container>
    )
}
