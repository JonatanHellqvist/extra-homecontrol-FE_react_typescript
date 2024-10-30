import { useState } from "react";

function TempSensInputAuth() {
	const [selectedTemp, setSelectedTemp] = useState <number | null >(null);
	const [selectedLightHueBridgeIndex, setSelectedLightHueBridgeIndex] = useState <string| null >(null);

	// const apiURL = import.meta.env.REACT_APP_LOCAL_URL
	const apiURL = import.meta.env.VITE_LOCAL_URL; //lokalt

	const userString = localStorage.getItem("loggedInUser");
	  const user = userString ? JSON.parse(userString) : null;
	  const userId = user?.id;
	  console.log(user.id);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
		
		const formData = new FormData(e.currentTarget);
        const tempSensitivity = formData.get("temp") as number | null; 
		const tempIndex = "1595cd0c-68f7-4dfd-a55a-75a9de1f1c7c" as string | null;

        setSelectedTemp(tempSensitivity); 
		setSelectedLightHueBridgeIndex(tempIndex); 

		fetch(`${apiURL}/user/tempsens/${userId}/${tempSensitivity}/${tempIndex}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			}, 
		})
		.then(res => res.json())
		.then(data => {
			console.log(JSON.stringify(data));
			
		}) 	
    };

	return (
		<div id="selectTempForm">
			<form onSubmit={handleSubmit}>
			<div>
						
					<label htmlFor="temp">Select at what Temperature to start the fan:</label>
					<input type="text" id="temp" name="temp" required/>
			</div>
				
                <div>
				<label>Select RID for device:</label>
					<label htmlFor="index">RID:</label>
					<input type="text" id="index" name="index" required/>
					
				</div>
                <button type="submit">Submit</button>
				
                {selectedTemp && <p>New Selected temperature: {selectedTemp}°C</p>}
				{selectedLightHueBridgeIndex && <p>New Selected RID: {selectedLightHueBridgeIndex}</p>} 
			</form>
		</div>
	);
}

export default TempSensInputAuth;