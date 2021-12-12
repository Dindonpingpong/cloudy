import './App.css';
import Game from './Game';
import Login from './Login';
import { useEffect, useState } from 'react';

export default function App() {
	const [isLogged, setIsLogged] = useState(false);
	const [login, setLogin] = useState();

	useEffect(() => {
		let user = sessionStorage.getItem('login');
		console.log(user);
		if (user != null) {
			setLogin(user);
			setIsLogged(true);
		}
	}, [])

	return (
		<div className="App">
			{
				!isLogged &&
				<Login setLogin={setLogin} setIsLogged={setIsLogged} login={login}/>
			}
			{
				isLogged &&
				<Game login={login} />
			}
		</div>
	)
}
