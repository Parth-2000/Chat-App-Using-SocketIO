import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import "./Chat.css";
import Messages from "../Messages/Messages";
import { useHistory } from "react-router-dom";
import TextContainer from "../TextContainer/TextContainer";

let socket;

const Chat = ({ location }) => {
	const [name, setName] = useState("");
	const [room, setRoom] = useState("");
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const [users, setUsers] = useState("");
	const END_POINT = "YOUR SERVER URL";
	const history = useHistory();

	useEffect(() => {
		const { name, room } = queryString.parse(location.search);
		var connectionOptions = {
			"force new connection": true,
			reconnectionAttempts: "Infinity",
			timeout: 10000,
			transports: ["websocket"],
		};
		socket = io(END_POINT, connectionOptions);
		setName(name);
		setRoom(room);

		socket.emit("join", { name, room }, error => {
			if (error) {
				alert(error + " Go back, & please take another Username");
				history.push("/");
			}
		});

		return () => {
			socket.emit("disconnect");
			socket.off();
		};
	}, [END_POINT, location.search]);

	useEffect(() => {
		socket.on("message", message => {
			setMessages([...messages, message]);
		});
		socket.on("roomData", ({ users }) => {
			setUsers(users);
		});
	}, [messages]);

	const sendMessage = e => {
		e.preventDefault();
		if (message) {
			socket.emit("sendMessage", message, () => setMessage(""));
			setMessage("");
		}
	};

	return (
		<div className="outerContainer">
			<div className="container">
				<InfoBar room={room} />
				<Messages messages={messages} name={name} />
				<Input
					message={message}
					setMessage={setMessage}
					sendMessage={sendMessage}
				/>
			</div>
			<TextContainer users={users} />
		</div>
	);
};

export default Chat;
