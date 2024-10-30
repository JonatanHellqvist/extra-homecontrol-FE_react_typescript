import React, { useState } from 'react';

interface UpdateBridgeIpProps {
    userId: string; 
}

function BridgeIpInput({userId } :UpdateBridgeIpProps){
    const [newBridgeIp, setNewBridgeIp] = useState<string>('');
    
    ////TODO visa bara efter knapptryck
	

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewBridgeIp(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        fetch(`https://clownfish-app-2jcw3.ondigitalocean.app/user/bridgeip/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
				body: newBridgeIp, 
            })
			.then(res => res.json())
			.then(data => {
				console.log(JSON.stringify(data));
				
			}) 
        
		}
	

    return (
        <div>
            <h2>Update Bridge IP</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="bridgeIp">New Bridge IP:</label>
                    <input
                        type="text" 
						name= "bridgeIp"
                        // value={newBridgeIp}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Update</button>
            </form>
           
        </div>
    );
};

export default BridgeIpInput;