import { useRef, useEffect, useState } from "react";
import { socket } from '../App'
import Alert from "./Alert";
import {v4} from 'uuid'
const id = v4(); 


function Chat({ user }) {
    const messageRef = useRef(null);
    const messageList = useRef(null);
    const [alerts, setAlerts] = useState([]);
    const [message, newMessage] = useState('');
    const [typing, setTyping] = useState('');
    const [typingAlert, setTypingAlert] = useState('');

    

    useEffect(() => {
        socket.on('new message', ({ message, user, idUser }) => {
            const mensaje = document.createElement('li');
            mensaje.textContent = `${idUser !== id ? user + ':' : ''} ${message}`;
            mensaje.classList.add('py-2', 'px-4', 'my-2', 'w-fit', 'rounded-md', 'text-white', 'font-semibold')
            idUser === id 
                ? mensaje.classList.add('bg-blue-300', 'self-end')
                : mensaje.classList.add('bg-gray-300', 'self-start');
            messageList.current.appendChild(mensaje);
        });

        socket.on('join', (user) => setAlerts([...alerts, `${user} join chat`]));
        socket.on('typing', (userTyping) => setTypingAlert(`${userTyping} are typing...`));
        socket.on('stop typing', () => setTypingAlert(''));
    }, []);

    useEffect(() => {
        if (message !== '') socket.emit('new message', { message, user, id });
    }, [message]);

    useEffect(() => {
        if(typing != '') {
            socket.emit('typing', user);
        }
        else{
            socket.emit('stop typing', user);
        }


    }, [typing])

    return (
        <div className="chat-app h-screen container mx-auto flex pt-4 pb-2 relative space-x-8">
            <div className="people w-3/12">
                <h2>Hi {user}, write a message!</h2>
                {alerts.map((alert, index) => (
                    <Alert key={index} message={alert} />
                ))}
            </div>

            <div className="chat w-full flex flex-col">

                <div className="message-container relative h-[calc(100%-3rem)]">
                    <ul ref={messageList} className="flex flex-col">

                    </ul> 
                </div>


                <form id="chat-form" className="flex space-x-10" onSubmit={(e) => {
                    e.preventDefault();
                    setTyping('');
                    if (messageRef.current.value.trim() !== '') newMessage(messageRef.current.value)
                }}>
                    {typingAlert != '' &&  <span className="text-xs text-gray-600">{typingAlert}</span>}
                    <input id="input-message" autoComplete="off" className="w-full bg-gray-100 outline-0 px-4 py-1" ref={messageRef} value={typing} onInput={({target}) => setTyping(target.value)} />
                    <button type="submit" className="bg-blue-700 text-white font-semibold py-2 px-4 rounded">Send</button>
                </form>
            </div>



        </div>
    )
}

export default Chat;