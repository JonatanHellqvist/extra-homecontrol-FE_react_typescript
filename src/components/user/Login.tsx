import { useEffect, useState } from "react";
import Register from "./Register";


function Login() {
	interface User {
		id: string;
		username: string;
		password: string;
	}

	const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
	const [invalidLogin, setInvalidLogin] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [registerForm, setRegisterForm] = useState(false);

	useEffect(() => {
		console.log(registerForm);
	  }, [registerForm]);
	  
	useEffect (() => {
		const userFromLocalStorage = localStorage.getItem("loggedInUser");
		if (userFromLocalStorage) {
			setLoggedInUser(JSON.parse(userFromLocalStorage));
		}
	}, []);

	const handleLogin = async (e:React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const res = await fetch ("https://clownfish-app-2jcw3.ondigitalocean.app/user/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body:JSON.stringify({ username, password})
		});

		if (res.ok) {
			const data = await res.json();
			if(data) {
				setLoggedInUser(data.user)
				localStorage.setItem("loggedInUser", JSON.stringify(data));
				console.log("Login successfull for User:", (data));	
				window.location.href = ("https://starfish-app-a5j77.ondigitalocean.app/user"); //ladda om usersidan
			}		
		} else if (res.status === 401){
			console.log("Invalid username or password")
			setInvalidLogin(true);
		} else {
			console.log("Login failed")
		}
		
	} 

	const handleShowRegisterForm = () => {
        setRegisterForm(true);
		console.log(registerForm)
    };

	const handleLogout = () => {
		setLoggedInUser(null);
		localStorage.removeItem("loggedInUser");
	};
	
	return (
		<>
		  <div>
			{!loggedInUser && !registerForm ? (
				<div id="loginFormDiv">
					<form onSubmit={handleLogin} id="loginForm">
						<div>
							<h1 id="loginFormH1">Login</h1>
						</div>
						<div className="loginFormDivDetails">
							<div className="loginFormDivDetailsLabel">
								<label className="loginFormDivDetailsLabelText" htmlFor="username">Username</label>
							</div>
							<div className="oginFormDivDetailsInputDiv">
								<input className="loginFormDivDetailsInput" type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
							</div>
						</div>
						<div className="loginFormDivDetails">
							<div className="loginFormDivDetailsLabel">
								<label className="loginFormDivDetailsLabelText" htmlFor="password">Password</label>
							</div>
							<div className="oginFormDivDetailsInput">
								<input className="loginFormDivDetailsInput" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
							</div>
						</div>												
						<br />
						<div className="loginFormBtnsDiv">
							<button type="submit">Logga in</button>
							<button type="button" onClick={handleShowRegisterForm}>Register</button>
						</div>
						
						{invalidLogin && <h2>Incorrect login info, try again!</h2>}
					</form>
			  </div>
			) : null }
				{registerForm && <Register/>}
				
			{loggedInUser && (
			  <>
			  	<div id="loggedInDiv">
					<h1 id="loggedInUserH1">Logged in as {loggedInUser.username}</h1>
					<div className="loginFormBtnsDiv">
					<button onClick={handleLogout}>Logout</button>
					</div>
				</div>
			  </>
			)}
		  </div>
		</>
	  );
	}
	
	export default Login;