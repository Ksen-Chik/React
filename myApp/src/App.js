import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import "./App.css";
//import { SimpleText } from "./components/SimpleText";
import SendIcon from '@material-ui/icons/Send';
import { Counter } from "./components/counter/counter";
//import { Message } from "./components/message/message";
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const imgUrl =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/";

function App() {

  const theme = createTheme({
    palette: {
      primary: {
        main: purple[500],
      },
      secondary: {
        main: green[500],
      },
    },
  });

  const [showCounter, setShowCounter] = useState(true);

  const toggleCounter = () => {
    setShowCounter(!showCounter);
  };

  const inputRef = useRef(null);

  const [messages, setMessages] = useState([]);

  const [messageAuthor, setMessageAuthor] = useState("Human");
  const [messageText, setMessageText] = useState("");
  const [messageId, setMessageId] = useState(0);

  const sendMessage = (msgAuthor, msgText) => {
    if (msgAuthor === "" && msgText === "") {
      return;
    }
    setMessageId(messageId + 1);
    setMessages([...messages, { author: msgAuthor, text: msgText, id: messageId }]);
    inputRef.current.focus();
  }
  const chats = [{ name: 'Robot', id: 1 }, { name: 'Alex', id: 2 }];

  useEffect(() => {
    inputRef.current.focus();
    const timeout = setTimeout(() => {
      let lastMessage = messages[messages.length - 1];
      if (lastMessage !== undefined && lastMessage.author !== "Robot") {
        sendMessage("Robot", `${lastMessage.author}, ваш звонок очень важен для вас`);
        clearTimeout(timeout);
      }
    }, 2000);
  });

  const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));
  const classes = useStyles();
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <div onClick={toggleCounter}>TOGGLE COUNTER</div>
        <img src={imgUrl + "1280px-React-icon.svg.png"} />

        {showCounter ? <Counter /> : null}

        <div className="content">
          <nav>
            <List>
              {chats.map((chat) =>
                <ListItem key={chat.id}>
                  <div>{chat.name}: {chat.id}</div>
                </ListItem>)}
            </List>
          </nav>

          <div className="messages">
            {messages.map((message) =>
              <div key={message.id}>
                <div>{message.author} - {message.text}</div>
              </div>)}

            <form>
              <label>Сообщение: </label>
              <TextField
                placeholder="message"
                label="Label"
                value={messageText}
                onChange={(event) => { setMessageText(event.target.value) }}
                inputRef={inputRef}
              />

              <Button onClick={() => {
                sendMessage(messageAuthor, messageText);
                setMessageText("");
              }}
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<SendIcon />}
              >
                SEND
              </Button>
            </form>
          </div>
        </div>
      </ThemeProvider>
    </div >
  );
}

export default App;