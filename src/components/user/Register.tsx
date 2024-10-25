import React, { ChangeEvent, FormEvent, useState } from 'react';

type User = {
	username: string;
	password: string;
};

function Register() {
	const [user, setUser] = useState<User>({ username: '', password: '' });
	const [success, setSuccess] = useState<boolean>(false);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value});
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		
		const response = await fetch('http://localhost:8080/register', {
			method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
		});
		
        if (!response.ok) {
            throw new Error('Registration failed');
        }

		setSuccess(true);//om inloggning lyckjas
		setUser({ username: '', password: '' }); 


	}
	return (
		<div>
			  <h2>Registrera dig</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Namn:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Lösenord:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Registrera</button>
      </form>

      {success && <p style={{ color: 'green' }}>Registrering lyckades!</p>}
		</div>
	);
}

export default Register;