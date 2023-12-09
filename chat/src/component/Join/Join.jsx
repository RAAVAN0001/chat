import React, { useState } from 'react';
import './join.css';
import logo from '../../assets/logo3.png';
import { Link } from 'react-router-dom';

let user;

const sendUser = () => {
    user = document.getElementById('joinInput').value; // Use 'value' instead of 'Value'
    document.getElementById('joinInput').value = ""; // Use 'value' instead of 'Value'
};

const Join = () => {
    const [name, setname] = useState(''); // Set the initial state to an empty string
    console.log(name);

    return (
        <div className='joinPage'>
            <div className="joinContainer">
                <div className='imgBox'>
                    <img src={logo} alt="logo" className='logo' />
                </div>
                <h1>Baatein</h1>
                <input type="text" onKeyPress={(e) => e.key === "Enter" && { sendUser }} onChange={(e) => setname(e.target.value)} placeholder='ENTER YOUR NAME' id='joinInput' />
                <Link to='/chat' onClick={(e) => !name ? e.preventDefault() : null}>
                    <button onClick={sendUser} className='joinbtn'>Login</button>
                </Link>

            </div>
        </div>
    );
};

export default Join;
export { user };
