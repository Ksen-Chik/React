import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import { useState, useRef } from "react";
import "./index.css";
import Chats from "../chats";
import SendIcon from '@material-ui/icons/Send';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getChats } from "../store/chats/selectors";
import { addMessage } from "../store/messages/actions";
import { getMessages } from "../store/messages/selectors";
import { makeStyles } from '@material-ui/core/styles';
import { addChat, deleteChat } from "../store/chats/actions";
import { useHistory } from "react-router-dom";

const imgUrl =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/";

function Chat(props) {

    const { chats } = useSelector(getChats, shallowEqual);
    const { messages } = useSelector(getMessages, shallowEqual);

    const dispatch = useDispatch();

    const inputRef = useRef(null);

    const [chatID, setChatID] = useState(0);
    const [messageAuthor, setMessageAuthor] = useState("");

    const currentMessages = messages.filter(m => m.chatId === +props.match.params.chatId) ?? [];

    const history = useHistory();

    const putMessageToStoreWithThunk = (chatId, message) => (dispatch, getState) => {
        dispatch(addMessage(chatId, message));
        if (message.author !== "Robot") {
            const botMessage = { author: "Robot", text: "ваш звонок очень важен для вас" };
            setTimeout(() => dispatch(addMessage(chatId, botMessage)), 2000);
        }
    }

    if (!props.match.params.chatId && chatID) {
        setChatID(props.match.params.chatId);
    }

    if (props.match.params.chatId && +props.match.params.chatId !== chatID) {

        let currentChat = chats.find(ch => ch.id === +props.match.params.chatId);

        if (!currentChat) {
            history.push("/chats");
        } else {
            setMessageAuthor(currentChat.user);
            setChatID(+props.match.params.chatId);
        }
    }

    const sendMessage = (msgAuthor, msgText) => {
        if (msgAuthor === "" || msgText === "") {
            return;
        }

        let newMessage = { author: msgAuthor, text: msgText };

        dispatch(putMessageToStoreWithThunk(chatID, newMessage));

        inputRef.current.focus();
    }

    const useStyles = makeStyles((theme) => ({
        button: {
            margin: theme.spacing(1),
        },
    }));

    const classes = useStyles();

    const form = chatID ? (
        <form>
            <label>Сообщение: </label>
            <TextField
                placeholder="message"
                inputRef={inputRef}
            />

            <Button onClick={() => {
                sendMessage(messageAuthor, inputRef.current.value);
                inputRef.current.value = "";
            }}
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<SendIcon />}
            >
                SEND
            </Button>
        </form>) : "";

    return (
        <div className="chat">
            <img src={imgUrl + "1280px-React-icon.svg.png"} />

            <div className="content">

                <Chats
                    chats={chats}
                    addChat={(user) => dispatch(addChat(user))}
                    deleteChat={(id) => dispatch(deleteChat(id))} />

                <div className="messages">
                    {currentMessages.map((message, index) =>
                        <div key={index}>
                            <div>{message.author} - {message.text}</div>
                        </div>)}
                    {form}
                </div>
            </div>
        </div >
    );
}

export default Chat;