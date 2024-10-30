import { useEffect, useState } from "react";

function Register() {

	interface User {
		id: string;
		username: string;
		password: string;
	}

	const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
	const [loginForm, setLoginForm] = useState(false);

	// const apiURL = import.meta.env.REACT_APP_LOCAL_URL
	const apiURL = import.meta.env.VITE_LOCAL_URL; //lokalt

	useEffect(() => {
		console.log(loginForm);
	  }, [loginForm]);

	useEffect (() => {
		const userFromLocalStorage = localStorage.getItem("loggedInUser");
		if (userFromLocalStorage) {
			setLoggedInUser(JSON.parse(userFromLocalStorage));
		}
	}, [loggedInUser]);

	const handleShowLoginForm = () => {
        setLoginForm(true);
		console.log(loginForm)
    };

	const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// "type assortions"

		const target = e.currentTarget as typeof e.currentTarget &  {
			username : {value: string };
			password : {value: string };
	
		}
		const username = target.username.value;
		const password = target.password.value;
		const bridgeip = "*.*.*.*.*";
		
		fetch(`${apiURL}/user/register`, {
		method: "POST",
		headers: {
			"content-type": "application/json"
		},
		body: JSON.stringify({username, password, bridgeip}),
		})
		.then(res => res.json())
		.then(data => {
			console.log("Registration Sucessfull ", data)
		// setRegister(data);
		window.location.href = ("?page=user"); //ladda om sidan
		setLoginForm(true);
		})
		.catch(error => {
			console.error("Error when registrating User: ", error);
		});
	};	
	return (
		<div>
			{!loggedInUser ? (
				<div id="registerForm">
				 	<h1>Register</h1>

					<form onSubmit={handleRegister}>
						<div>
							<div>
								<div>
									<div>
										<label htmlFor="username">Username:</label>
									</div>
									<div>
										<input type="text" id="username" name="username" required/>
									</div>
								</div>
								<div>
									<div>
										<label htmlFor="password">Password:</label>
									</div>
									<div>
										<input type="password" id="password" name="password" required/>										
									</div>																
								</div>
							</div>
							<div>
							</div>
							<div>
							</div>
						</div>					
							<div id="registerBtns">
								<button type="submit">Register</button>
								<button type="button" onClick={handleShowLoginForm}>Cancel</button>
							</div>				 		
					</form>
				</div>
			) : null}	
		</div>
	);
}

export default Register;