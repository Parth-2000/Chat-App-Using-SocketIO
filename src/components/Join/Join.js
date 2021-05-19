import React, { useState } from "react";
import "./Join.css";
import { Link } from "react-router-dom";

const Join = () => {
	const [name, setName] = useState("");
	const [room, setRoom] = useState("");

	return (
		<div className="join">
			<div className="join-container">
				<h1 className="join-container-heading text-center">Join</h1>
				<div className="form-floating mb-3">
					<input
						type="text"
						className="form-control"
						id="floatingInput"
						placeholder="Eg. john"
						onChange={e => setName(e.target.value)}
					/>
					<label htmlFor="floatingInput">Name</label>
				</div>
				<div className="form-floating">
					<input
						type="text"
						className="form-control"
						id="floatingPassword"
						placeholder="Room Name"
						onChange={e => setRoom(e.target.value)}
					/>
					<label htmlFor="floatingPassword">Room</label>
				</div>
				<div className="join-btn-container">
					<Link
						onClick={e => (!name || !room ? e.preventDefault() : null)}
						to={`/chat?name=${name}&room=${room}`}>
						<button type="submit" className="btn btn-secondary join-btn">
							Sign In
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Join;
