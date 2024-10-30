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
                <div>					
					<label htmlFor="light">Select sensitivity for lightSensor:</label>
					<input type="text" id="light" name="light" required/>	
				</div>
				
                <div>				
					<label htmlFor="index">Select the deviceIndex from Huebridge:</label>
					<input type="text" id="index" name="index" required/>	
				</div>
                <button type="submit">Submit</button>
				
                {selectedLight && <p>New Selected Light sensitivity: {selectedLight}</p>}
				{selectedLightHueBridgeIndex && <p>New Selected Index: {selectedLightHueBridgeIndex}</p>}
			</form>
		</div>
	);
}

export default LightSensInputAuth;