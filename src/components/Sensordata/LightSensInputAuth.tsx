import { useState } from "react";

function LightSensInputAuth() {
	const [selectedLight, setSelectedLight] = useState <number | null >(null);
	const [selectedLightHueBridgeIndex, setSelectedLightHueBridgeIndex] = useState <string | null >(null);

	// const apiURL = import.meta.env.REACT_APP_LOCAL_URL
	const apiURL = import.meta.env.VITE_LOCAL_URL; //lokalt

	const userString = localStorage.getItem("loggedInUser");
	  const user = userString ? JSON.parse(userString) : null;
	  const userId = user?.id;
	  console.log(user.id);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 

		const formData = new FormData(e.currentTarget);
        const lightSensitivity = formData.get("light") as number | null; 
		const lightIndex = formData.get("index") as string | null; 

        setSelectedLight(lightSensitivity); 
		setSelectedLightHueBridgeIndex(lightIndex);

	fetch(`${apiURL}/user/lightsens/${userId}/${lightSensitivity}/${lightIndex}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},	  
	})
	.then(res => res.json())
	.then(data => {
		console.log(JSON.stringify(data));
		
	}) 	

	console.log("SelectedLight: ", lightSensitivity, "SelectedLiughthuiebruirji: ",lightIndex);
	
};
	//TODO spara till user

	return (
		<div id="selectLightForm">
			<h3>AutoLight</h3>
			<form onSubmit={handleSubmit}>
				<label>Select sensitivity for lightSensor:</label>
                <div>
					<div>
					<label htmlFor="light">Light:</label>
					</div>
					<div>
					<input type="text" id="light" name="light" required/>
					</div>
				</div>
				<label>Select the deviceIndex from Huebridge:</label>
                <div>
					<div>
					<label htmlFor="index">Index:</label>
					</div>
					<div>
					<input type="text" id="index" name="index" required/>
					</div>
				</div>
                <button type="submit">Submit</button>
				
                {selectedLight && <p>Selected Light sensitivity: {selectedLight}</p>}
				{selectedLightHueBridgeIndex && <p>Selected Index: {selectedLightHueBridgeIndex}</p>}
			</form>
		</div>
	);
}

export default LightSensInputAuth;