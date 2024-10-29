import { useState, ChangeEvent } from 'react';

type ChatMessage = {
	sender: 'user' | 'system';
	message: string;
};

function Aichat() {
	
	const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
	const [inputValue, setInputValue] = useState<string>(''); 

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const handleSend = () => {
		if (inputValue) {

			setChatHistory((prev) => [...prev, { sender: 'user', message: inputValue }]);

			fetch('https://shark-app-ewg2d.ondigitalocean.app/chat', {
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
		<div>
			<h1>Chat</h1>
			<ul id="chatUl">
				{chatHistory.map((entry, index) => (
					<li key={index} id="chatLi" style={{ fontWeight: entry.sender === 'user' ? 'bold' : 'normal' }}>
						{entry.sender}: {entry.message}
					</li>
				))}
			</ul>
			<div>
				<input
					type="text"
					id="chatInput"
					value={inputValue}
					onChange={handleInputChange}
				/>
				<button id="chatInputButton" onClick={handleSend}>Send</button>
			</div>
		</div>
	);
}

export default Aichat;