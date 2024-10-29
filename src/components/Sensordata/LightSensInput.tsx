import { useState } from "react";

function LightSensInput() {
	const [selectedLight, setSelectedLight] = useState<number | null >(null);
	const [selectedIndex, setSelectedIndex] = useState<number | null >(null);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
		const formData = new FormData(e.currentTarget);
        const light = formData.get("light") as number | null; 
		const index = formData.get("index") as number | null; 
        setSelectedLight(light); 
		setSelectedIndex(index);
    };

	//TODO spara till user

	return (
		<div id="selectLightForm">
			<h3>AutoLight</h3>
			<form onSubmit={handleSubmit}>
				<label>Select sensitivity for lightSensor:</label>
                <div>
					<div>
					<label htmlFor="light">Light:</label>
					</div>
					<div>
					<input type="text" id="light" name="light" required/>
					</div>
				</div>
				<label>Select the deviceIndex from Huebridge:</label>
                <div>
					<div>
					<label htmlFor="index">Index:</label>
					</div>
					<div>
					<input type="text" id="index" name="index" required/>
					</div>
				</div>
                <button type="submit">Submit</button>
				
                {selectedLight && <p>Selected Light sensitivity: {selectedLight}</p>}
				{selectedIndex && <p>Selected Index: {selectedIndex}</p>}
			</form>
		</div>
	);
}

export default LightSensInput;