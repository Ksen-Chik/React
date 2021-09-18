import TextField from "@material-ui/core/TextField";
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useState, useEffect, useRef, useCallback } from "react";
import "./index.css";
import Chats from "../chats";
import SendIcon from '@material-ui/icons/Send';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getChats } from "../store/chats/selectors";
import { addMessage } from "../store/messages/actions";
import { getMessages } from "../store/messages/selectors";

const imgUrl =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/";

function Chat(props) {

    const { chats } = useSelector(getChats, shallowEqual);
    const { messages } = useSelector(getMessages, shallowEqual);

    const dispatch = useDispatch();

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

    const [currentMessages, setCurrentMessages] = useState([]);

    const [chatID, setChatID] = useState(0);
    const [messageAuthor, setMessageAuthor] = useState("");
    const [messageText, setMessageText] = useState("");

    const putMessageToStore = useCallback(
        (chatID, newMessage) => {
            dispatch(addMessage(chatID, newMessage));
        },
        [dispatch]
    );

    if (props.match.params.chatId && +props.match.params.chatId !== chatID) {
        let currentChat = chats.find(ch => ch.id === +props.match.params.chatId);

        setMessageAuthor(currentChat.user);

        setChatID(+props.match.params.chatId);

        console.log(`props.chatId ${+props.match.params.chatId}`);
        console.log(`chatID ${chatID}`);
        console.log("messages");
        console.log(messages);

        let foundMessages = messages.filter(m => m.chatId === +props.match.params.chatId);
        if (!foundMessages) {
            foundMessages = [];
        }

        console.log("foundMessages");
        console.log(foundMessages);

        setCurrentMessages(foundMessages);
    }

    const sendMessage = (msgAuthor, msgText) => {
        if (msgAuthor === "" && msgText === "") {
            return;
        }

        let newMessage = { author: msgAuthor, text: msgText };

        setCurrentMessages([...currentMessages, newMessage]);

        putMessageToStore(chatID, newMessage);

        inputRef.current.focus();
    }

    useEffect(() => {
        inputRef.current.focus();
        const timeout = setTimeout(() => {
            let lastMessage = currentMessages[currentMessages.length - 1];
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
                        {currentMessages.map((message, index) =>
                            <div key={index}>
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