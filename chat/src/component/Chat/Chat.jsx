import React, { useEffect, useState } from 'react';
import { user } from '../Join/Join';
import SocketIo from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './chat.css';
import Message from '../message/Message';
import ReactScrollToBottom from 'react-scroll-to-bottom'
import closeIcon from '../../assets/closeIcon.png'

let socket;
const ENDPOINT = "http://localhost:4500/";

const Chat = () => {

    const [id, setid] = useState("")
    const [messages, setMessages] = useState([])

    // const send = () => {
    //     const socket = SocketIo(ENDPOINT, { transports: ['websocket'] });
    //     const message = document.getElementById('chatInput').value;
    //     socket.emit('message', { message, id });
    //     document.getElementById('chatInput').value = "";

    // }

    const send = () => {
        const socket = SocketIo(ENDPOINT, { transports: ['websocket'] });
        const messageInput = document.getElementById('chatInput');
        const message = messageInput.value.trim(); // Trim to remove leading/trailing whitespaces

        if (message) {
            socket.emit('message', { message, id });
            messageInput.value = "";
        }
    }



    useEffect(() => {
        const socket = SocketIo(ENDPOINT, { transports: ['websocket'] });

        // socket.on('connect', () => {
        //     alert("connected");
        //     setid(socket.id)

        // });

        console.log(socket)
        socket.emit('joined', { user })

        socket.on('welcome', (data) => {
            setMessages([...messages, data])
            console.log(data.user, data.message);
        });


        socket.on('userJoined', (data) => {
            setMessages([...messages, data])
            console.log(data.user, data.message);
        })

        socket.on('leave', (data) => {
            setMessages([...messages, data])
            console.log(data.user, data.message);
        })

        return () => {
            socket.emit('disconnnect')
            socket.off();
        };
    }, []);

    useEffect(() => {
        const socket = SocketIo(ENDPOINT, { transports: ['websocket'] });

        socket.on('sendMessage', (data) => {
            setMessages([...messages, data])
            console.log(data.user, data.id, data.message);
        });

        return () => {
            // Clean up socket event listener if needed
            socket.off()
        };
    }, [messages]);



    return (
        <div className='chatPage ' >
            <div className="chatContainer">
                <div className="header">
                    <h2>Baatein</h2>
                    <a href="/"><img src={closeIcon} alt="close" /></a>

                </div>
                <ReactScrollToBottom className="chatBox">
                    {messages.map((item, i) => <Message user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />)}
                </ReactScrollToBottom>
                <div className="inputBox">
                    <input onKeyPress={(e) => e.key === 'Enter' ? send() : null} type="text" id='chatInput' />
                    <button onClick={send} className='sendbtn'>
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
