import './App.css';
import React, { useState, useEffect } from "react";

function App() {
  const [messages, setMessages] = useState([]);

  const [messageAuthor, setMessageAuthor] = useState("");
  const [messageText, setMessageText] = useState("");
  const [messageId, setMessageId] = useState(0);

  const sendMessage = (msgAuthor, msgText) => {
    if (messageAuthor === "" || messageText === "") {
      return;
    }
    setMessageId(messageId + 1);
    setMessages([...messages, { author: msgAuthor, text: msgText, id: messageId }]);
  }

  useEffect(() => {
    setTimeout(function () {
      let lastMessage = messages[messages.length - 1];
      if (lastMessage !== undefined && lastMessage.author !== "Robot") {
        sendMessage("Robot", `${lastMessage.author}, ваш звонок очень важен для вас`);
      }
    }, 1500);
  });

  return (
    <div className="App">
      <div>
        {messages.map((message) =>
          <div key={message.id}>
            <div>{message.author}: {message.text}</div>
          </div>)}

        <div>
          <label>Автор: </label>
          <input type="text" name="author" value={messageAuthor}
            onChange={(event) => { setMessageAuthor(event.target.value) }}></input>

          <label> Сообщение: </label>
          <input type="text" name="message" value={messageText}
            onChange={(event) => { setMessageText(event.target.value) }}></input>

          <button onClick={() => sendMessage(messageAuthor, messageText)}>Отправить</button>
        </div>
      </div>

    </div>
  );
}

export default App;
