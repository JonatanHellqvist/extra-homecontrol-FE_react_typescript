import { useState, ChangeEvent, useEffect } from 'react';

type ChatMessage = {
	sender: 'user' | 'system';
	message: string;
};

function Aichat() {
	
	const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
	const [inputValue, setInputValue] = useState<string>(''); 
	const [isWelcomeMessageAdded, setIsWelcomeMessageAdded] = useState<boolean>(false); 

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	useEffect(() => {
        // Kontrollera om chatHistoriken är tom
        if (chatHistory.length === 0 && !isWelcomeMessageAdded) {
            setChatHistory((prev) => [
                ...prev,
                { sender: 'system', message: "Hej och välkommen till chatten, hur kan jag hjälpa dig med smarta hemlösningar idag?" }
            ]);
			setIsWelcomeMessageAdded(true);
        }
    }, [chatHistory, isWelcomeMessageAdded]); // Kör effekt när chatHistory ändras

	const handleSend = () => {
		if (inputValue) {

			setChatHistory((prev) => [...prev, { sender: 'user', message: inputValue }]);

			fetch('https://clownfish-app-2jcw3.ondigitalocean.app/chat', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ prompt: inputValue })
			})
			.then(response => response.text())
			.then((data) => {
				setChatHistory((prev) => [...prev, { sender: 'system', message: data }]);
				setInputValue('');
			})
		}
	};

	return (
		<div id="aiChatDiv">
			<h1 id="aiChatH1">Chat</h1>
			<ul id="aiChatUl">
				{chatHistory.map((entry, index) => (
					<li key={index} id="aiChatLi" style={{ fontWeight: entry.sender === 'user' ? 'bold' : 'normal' }}>
						{entry.sender}: {entry.message}
					</li>
				))}
			</ul>
			<div id="aiChatInputDiv">
				<input
					type="text"
					id="aiChatInput"
					value={inputValue}
					onChange={handleInputChange}
				/>
				<button id="aiChatInputButton" onClick={handleSend}>Send</button>
			</div>
		</div>
	);
}

export default Aichat;