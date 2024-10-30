import { useEffect, useState } from 'react';
import TempSensInputAuth from './TempSensInputAuth';

// const apiURL = import.meta.env.REACT_APP_LOCAL_URL
const apiURL = import.meta.env.VITE_LOCAL_URL; //lokalt

const userString = localStorage.getItem("loggedInUser");
	  const user = userString ? JSON.parse(userString) : null;
	  const userId = user?.id;
	  console.log(user.id);

function AutoToggleFanComponent() {
	const [selectedTemp, setSelectedTemp] = useState <number | null >(null);
	const [selectedDeviceRidIndex, setSelectedDeviceRidIndex] = useState <string| null >(null);


	useEffect(() => {
        if (!userId) {
            console.error("User ID is not available.");
            return; // Exit early if userId is not set
        }

        fetch(`${apiURL}/user/tempsens/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json(); // Correctly return the parsed JSON
            })
            .then(data => {
                console.log("Temperature settings: ", data);
				setSelectedTemp(data.tempSensitivity);
				setSelectedDeviceRidIndex(data.tempIndex);
            })
            .catch(error => console.error("Fetch error:", error));
    }, []); 

	
	return (
		<div>
			<div id="selectedTempDiv">
				<h4>Selected temperature: {selectedTemp}°C | Selected device: {selectedDeviceRidIndex}</h4>
				<p>selected device namn?</p>
			</div>
			<TempSensInputAuth/>
		</div>
	);
}

export default AutoToggleFanComponent;