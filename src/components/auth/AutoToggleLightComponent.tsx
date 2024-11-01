import { useEffect, useState} from 'react';
import LightSensInputAuth from './LightSensInputAuth';
import { getLoggedInUser } from '../user/getLoggedInUser';


const user = getLoggedInUser();
const userId = user?.id;

function AutoToggleLightComponent() {
	const [selectedLight, setSelectedLight] = useState <number | null >(null);
	const [selectedDeviceRidIndex, setSelectedDeviceRidIndex] = useState <string| null >(null);

	useEffect(() => {
        if (!userId) {
            console.error("User ID is not available.");
            return; 
        }

        fetch(`https://clownfish-app-2jcw3.ondigitalocean.app/user/lightsens/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json(); 
            })
            .then(data => {
                console.log("Light sense settings: ", data);
				setSelectedLight(data.lightSensitivity);
				setSelectedDeviceRidIndex(data.lightIndex);
            })
            .catch(error => console.error("Fetch error:", error));
    }, []); 

	return (
		<div>
			<div id="selectedLightDiv">
                <h2>AutoLight</h2>
                <h3>Current settings for AutoLight:</h3>
				<h4>Selected lightsense: {selectedLight} | Selected device RID: {selectedDeviceRidIndex}</h4>
				{/* <p>selected device name?</p> */}
			</div>
			<LightSensInputAuth/>
		</div>
	);
}

export default AutoToggleLightComponent;