import { useEffect, useState } from 'react';
import { useSubscription } from 'react-stomp-hooks';
import showLatestsensorInput from '../printdata/showLatestsensorInput';
import toggleDevice from '../toggledevice/toggleDevice';

interface latestInputData {
	timeStamp: string,
	celsius: number,
	humidity: number,

}
const ChangeListener = () => {
	const [latestInput,setLatestInput] = useState<latestInputData | null>(null);

	//subscribe
	useSubscription('/topic/changes', (message) => {
		const changeData = JSON.parse(message.body);
		setLatestInput(changeData);
		console.log(changeData);
		
	});

	//körs varje gång databasen uppdateras och latestInput ändras
	useEffect(() => {
		if(latestInput) {
			if(latestInput.celsius > 25) {
				toggleDevice(13,true);
			} else {
				toggleDevice(13,false);
			}
		}
	},[latestInput]);

	//TODO useEffect för ljussensorn/phototransistor

	return (
		<div>
			{showLatestsensorInput(latestInput)}
		</div>
	);
};

export default ChangeListener;



//TODO///////////////////////////////////////////////////////////////
				//fixa imput för vilken temp fläkten ska gå igång
	
