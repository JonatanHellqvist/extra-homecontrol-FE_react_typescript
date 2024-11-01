import { useEffect, useState } from 'react';
import TempSensInputAuth from './TempSensInputAuth';
import { getLoggedInUser } from '../user/getLoggedInUser';

const user = getLoggedInUser();
const userId = user?.id;

function AutoToggleFanComponent() {
	const [selectedTemp, setSelectedTemp] = useState <number | null >(null);
	const [selectedDeviceRidIndex, setSelectedDeviceRidIndex] = useState <string| null >(null);

	useEffect(() => {
        if (!userId) {
            console.error("User ID is not available.");
            return; 
        }

        fetch(`https://clownfish-app-2jcw3.ondigitalocean.app/user/tempsens/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json(); 
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
				<div>
				<h2>AutoFan</h2>
				<h3>Current settings for AutoFan:</h3>
				</div>
				<h4>Selected temperature: {selectedTemp}°C | Selected device RID: {selectedDeviceRidIndex}</h4>
				{/* <p>selected device namn?</p> */}
			</div>
			<TempSensInputAuth/>
		</div>
	);
}

export default AutoToggleFanComponent;