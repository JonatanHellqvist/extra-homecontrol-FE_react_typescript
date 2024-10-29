import { useState } from "react";

function TempSensInput() {
	const [selectedTemp, setSelectedTemp] = useState<number | null >(null);
	const [selectedIndex, setSelectedIndex] = useState<number| null >(null);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
		const formData = new FormData(e.currentTarget);
        const temp = formData.get("temp") as number | null; 
		const index = formData.get("index") as number | null; 
        setSelectedTemp(temp); 
		setSelectedIndex(index); 
		console.log(selectedIndex);
		
    };

	//TODO spara till user

	return (
		<div id="selectTempForm">
			<form onSubmit={handleSubmit}>
				<label>Select what temperature fan will start:</label>
                <div>
					<div>
					<label htmlFor="temp">Temp:</label>
					</div>
					<div>
					<input type="text" id="temp" name="temp" required/>
					</div>
				</div>
				<label>Select index for fandevice from HueBridge:</label>
                <div>
					<div>
					<label htmlFor="index">Index:</label>
					</div>
					<div>
					<input type="text" id="index" name="index" required/>
					</div>
				</div>
                <button type="submit">Submit</button>
				
                {selectedTemp && <p>Selected temperature: {selectedTemp}°C</p>}
				{selectedIndex && <p>Selected index: {selectedIndex}</p>}
			</form>
		</div>
	);
}

export default TempSensInput;