import TextField from "@material-ui/core/TextField";
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import "./index.css";
import Chats from "../chats";
import SendIcon from '@material-ui/icons/Send';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const imgUrl =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/";

function Chat(props) {
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

    const inputRef = useRef(null);

    const [messages, setMessages] = useState([]);

    const [chatID, setChatID] = useState();
    const [messageAuthor, setMessageAuthor] = useState("");
    const [messageText, setMessageText] = useState("");
    const [messageId, setMessageId] = useState(0);

    const [chats, setChats] = useState([{ id: 1, user: 'Ivan', messages: [] }, { id: 2, user: 'Alex', messages: [] }]);

    if (props.match.params.chatId && props.match.params.chatId !== chatID) {
        let currentChat = chats.find(ch => ch.id === +props.match.params.chatId);

        setMessageAuthor(currentChat.user);

        setMessages(currentChat.messages);

        setChatID(props.match.params.chatId);
    }

    const sendMessage = (msgAuthor, msgText) => {
        if (msgAuthor === "" && msgText === "") {
            return;
        }
        setMessageId(messageId + 1);
        setMessages([...messages, { author: msgAuthor, text: msgText, id: messageId }]);

        let currentChat = chats.find(ch => ch.id === +props.match.params.chatId);

        currentChat.messages = messages;
        inputRef.current.focus();
    }

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
        <div className="chat">
            <ThemeProvider theme={theme}>
                <img src={imgUrl + "1280px-React-icon.svg.png"} />

                <div className="content">

                    <Chats chats={chats} />

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

export default Chat;