import React, { useEffect, useState } from 'react';

interface DhtData {
	timeStamp: string,
	celsius: number,
	humidity: number,

}

function Dht11() {

    const [latestInput, setLatestInput] = useState<DhtData | null >(null);

    useEffect(() => {
        fetchLatestDht11SensorData(); 
    }, []); //körs vid första rendering

	//"13" är idt på smartpluggen till fläkten
    function fetchLatestDht11SensorData() {
        fetch(`http://localhost:8080/get-latest-dht11-sensor-data`)
			.then(response => response.json())
            .then(data => {
                setLatestInput(data);

//TODO///////////////////////////////////////////////////////////////
				//fixa imput för vilken temp fläkten ska gå igång
				if(data.celsius > 25) {
					toggleFan("13",true);
				} else {
					toggleFan("13",false);
				}
            })
    }

    function showLatestDht11Input(latestInput : DhtData | null) {
        if (!latestInput) {
            return <li>Ingen data tillgänglig.</li>; 
        }

        let timeStampString = latestInput.timeStamp.toString();
        let date = timeStampString.substring(0, 10);
        let time = timeStampString.substring(11, 16);
		console.log(latestInput);
		
        return (
            <li>
                Date: {date} | Time: {time} | Temperature: {latestInput.celsius}°C | Humidity: {latestInput.humidity}%
            </li>
        );
    }

	function toggleFan(fanId: string, isOn: boolean) {
		console.log(isOn);
		console.log(fanId);
		
		fetch(`http://localhost:8080/api/lights/${fanId}/state`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			
			body: JSON.stringify({
				on: isOn,	
			}),	
		})
		.then(response => response.json())
		.then(data => {
			console.log(data);
		})		
	};
	
    return (
        <div>
            <ul className="listUl">
                {showLatestDht11Input(latestInput)}{/* Visa felmeddelande om det finns */}
            </ul>
        </div>
    );
}

export default Dht11;