import { useEffect, useState } from "react";

function Register() {

	interface User {
		id: string;
		username: string;
		password: string;
	}

	const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
	const [loginForm, setLoginForm] = useState(false);

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
		
		fetch("http://localhost:8080/user/register", {
		method: "POST",
		headers: {
			"content-type": "application/json"
		},
		body: JSON.stringify({username, password})
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

{/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
{/*  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/}
				
					{/* |  KUL MISS  | 

					tror jag drog hela formet runt submit knappen bara tidigare..

					efter att jag "städade upp koden" och splittade login och register till egna komponenter
					så missade jag tydligen detta, tror formet hamnade bara runt submit knappen | */}

{/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
{/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}

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