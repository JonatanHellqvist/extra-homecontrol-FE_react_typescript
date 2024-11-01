///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////|FÖR LOKAL ANVÄNDING AV BRIDGE MED LOKALT IP|////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import { useState } from "react";

// function TempSensInput() {
// 	const [selectedTemp, setSelectedTemp] = useState<number | null >(null);
// 	const [selectedLightHueBridgeIndex, setSelectedLightHueBridgeIndex] = useState<number| null >(null);

// 	const userString = localStorage.getItem("loggedInUser");
// 	  const user = userString ? JSON.parse(userString) : null;
// 	  const userId = user?.id;
// 	  console.log(user.id);


// 	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault(); 
// 		const formData = new FormData(e.currentTarget);
//         const tempSensitivity = formData.get("temp") as number | null; 
// 		const tempIndex = formData.get("index") as number | null; 
//         setSelectedTemp(tempSensitivity); 
// 		setSelectedLightHueBridgeIndex(tempIndex); 

// 		fetch(`https://clownfish-app-2jcw3.ondigitalocean.app/user/tempsens/${userId}`, {
// 			            method: 'PUT',
// 			            headers: {
// 			                'Content-Type': 'application/json',
// 			            },
// 						body: JSON.stringify({
// 							"tempSensitivity": tempSensitivity, 
// 							"tempIndex": tempIndex,
// 						})  
// 			        })
// 					.then(res => res.json())
// 					.then(data => {
// 						console.log(JSON.stringify(data));
						
// 					}) 	
//     };

// 	return (
// 		<div id="selectTempForm">
// 			<form onSubmit={handleSubmit}>
// 				<label>Select what temperature fan will start:</label>
//                 <div>
// 					<div>
// 					<label htmlFor="temp">Temp:</label>
// 					</div>
// 					<div>
// 					<input type="text" id="temp" name="temp" required/>
// 					</div>
// 				</div>
// 				<label>Select index for fandevice from HueBridge:</label>
//                 <div>
// 					<div>
// 					<label htmlFor="index">Index:</label>
// 					</div>
// 					<div>
// 					<input type="text" id="index" name="index" required/>
// 					</div>
// 				</div>
//                 <button type="submit">Submit</button>
				
//                 {selectedTemp && <p>Selected temperature: {selectedTemp}°C</p>}
// 				{selectedLightHueBridgeIndex && <p>Selected index: {selectedLightHueBridgeIndex}</p>}
// 			</form>
// 		</div>
// 	);
// }

// export default TempSensInput;