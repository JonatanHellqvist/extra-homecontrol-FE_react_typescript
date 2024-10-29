import { useEffect, useState } from 'react';
import { useSubscription } from 'react-stomp-hooks';
import showLatestsensorInput from '../printdata/showLatestsensorInput';
import toggleDevice from '../toggledevice/toggleDevice';

interface LatestInputData {
	timeStamp: string,
	celsius: number,
	humidity: number,
	photoTransistorValue: number,

}

interface ChangeListenerProps {
    onDataReceived: (data: LatestInputData) => void; // Funktion för att skicka data tillbaka
}

const ChangeListener: React.FC<ChangeListenerProps> = ({ onDataReceived }) => {
	const [latestInput,setLatestInput] = useState<LatestInputData | null>(null);

	//subscribe
	useSubscription('/topic/changes', (message) => {
		const changeData: LatestInputData = JSON.parse(message.body);
		setLatestInput(changeData);
		onDataReceived(changeData); 
		console.log(changeData);
		
	});

	//körs varje gång databasen uppdateras och latestInput ändras
	//TODO ändra vilken temperatur fläkten ska gå igång och vilken index den har
	//flyttad till sensordata
	// useEffect(() => {
	// 	if(latestInput) {
	// 		if(latestInput.celsius > 24
	// 		) {
	// 			toggleDevice(13,true);
	// 		} else {
	// 			toggleDevice(13,false);
	// 		}
	// 	}
	// },[latestInput]);
	//input för vilken ljusstyrka innan lampa tänds
	//TODO useEffect för ljussensorn/phototransistor
	//flyttad till sensordata
	// useEffect(() => {
	// 	if(latestInput) {
    //         if(latestInput.photoTransistorValue < 50) {
    //             toggleDevice(5,true);
    //         } else {
    //             toggleDevice(5,false);
    //         }
    //     }
	// }, [latestInput]);

	return null;
};

export default ChangeListener;