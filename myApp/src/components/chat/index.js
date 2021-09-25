import { useState } from "react";
import "./index.css";
import Chats from "../chats";
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { getChats } from "../store/chats/selectors";
import { putMessageToStoreWithThunk, clearChat } from "../store/messages/actions";
import { getMessages } from "../store/messages/selectors";
import { addChat, deleteChat } from "../store/chats/actions";
import { useHistory } from "react-router-dom";
import MessageList from "../messageList";

function Chat(props) {

    const { chats } = useSelector(getChats, shallowEqual);
    const { messages } = useSelector(getMessages, shallowEqual);

    const dispatch = useDispatch();

    const [chatID, setChatID] = useState(0);
    const [messageAuthor, setMessageAuthor] = useState("");

    const imgUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/";

    const currentMessages = messages.filter(m => m.chatId === +props.match.params.chatId) ?? [];

    const history = useHistory();

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
    }

    const addChatHandler = (user) => {
        dispatch(addChat(user));
    };

    const deleteChatHandler = (id) => {
        dispatch(clearChat(id));
        dispatch(deleteChat(id));
        history.push("/chats");
    };

    return (
        <div className="chat">
            <img src={imgUrl + "1280px-React-icon.svg.png"} alt="logo" />

            <div className="content">

                <Chats
                    chats={chats}
                    addChat={addChatHandler}
                    deleteChat={deleteChatHandler} />

                <MessageList
                    showSendForm={chatID}
                    messages={currentMessages}
                    messageAuthor={messageAuthor}
                    sendMessage={sendMessage}
                />
            </div>
        </div >
    );
}

export default Chat;