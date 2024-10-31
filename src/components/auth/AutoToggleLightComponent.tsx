import { useEffect, useState} from 'react';
import LightSensInputAuth from './LightSensInputAuth';
import { getLoggedInUser } from '../user/getLoggedInUser';


// const apiURL = import.meta.env.REACT_APP_LOCAL_URL
const apiURL = import.meta.env.VITE_LOCAL_URL; //lokalt

// const userString = localStorage.getItem("loggedInUser");
// 	  const user = userString ? JSON.parse(userString) : null;
// 	  const userId = user?.id;
// 	  console.log(user.id);
const user = getLoggedInUser();
const userId = user?.id;

function AutoToggleLightComponent() {
	const [selectedLight, setSelectedLight] = useState <number | null >(null);
	const [selectedDeviceRidIndex, setSelectedDeviceRidIndex] = useState <string| null >(null);


	useEffect(() => {
        if (!userId) {
            console.error("User ID is not available.");
            return; // Exit early if userId is not set
        }

        fetch(`${apiURL}/user/lightsens/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json(); // Correctly return the parsed JSON
            })
            .then(data => {
                console.log("Light sense settings: ", data);
				setSelectedLight(data.lightSensitivity);
				setSelectedDeviceRidIndex(data.lightIndex);
            })
            .catch(error => console.error("Fetch error:", error));
	// 	fetch(`${apiURL}/user/lightsens/${userId}`)
    // .then(response => {
    //     if (!response.ok) {
    //         throw new Error(`HTTP error! status: ${response.status}`);
    //     }
    //     return response.text(); // Use .text() to get the raw response
    // })
    // .then(text => {
    //     console.log("Raw response text: ", text); // Log the raw response
    //     try {
    //         const data = JSON.parse(text); // Try to parse the text as JSON
    //         console.log("Light sense settings: ", data);
    //     } catch (error) {
    //         console.error("JSON parsing error:", error);
    //     }
    // })
    // .catch(error => console.error("Fetch error:", error));
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