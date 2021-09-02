import React from 'react';
//import ReactDOM from 'react-dom';
import './message.css';

export const Message = (props) => {
    return (
        <h3> {props.text} </h3>
    )
};

export const MessagesList = () => {
    const [messages, setMessages] = useState([]);

    const handleChange = (event) => {
        /*setMessages([...messages, {messages.text: event.target.value, }]);*/
    }

    return (
        <div>
            {messages.map((message) =>
                <div>
                    <div>{message.text}</div>
                    <div>{message.author}</div>
                </div>)}

            <div>
                <input type="text" ></input>
                <input type="text" ></input>
            </div>
        </div>
    );
};