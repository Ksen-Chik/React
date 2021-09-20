import "./index.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { useRef } from "react";
import Button from '@material-ui/core/Button';

function Chats(props) {

    const inputRef = useRef(null);

    return (
        <div className="chats">
            <nav>
                <List>
                    {props.chats.map((chat) =>
                        <ListItem key={chat.id}>
                            <Link to={`/chats/${chat.id}`}>{chat.user}</Link>
                            <Button
                                className='chat-delete-button'
                                onClick={() => {
                                    props.deleteChat(chat.id);
                                }}
                            >X</Button>
                        </ListItem>)}
                </List>
            </nav>
            <div className='new-chat-creator'>
                <TextField
                    className="new-chat-name"
                    placeholder="new chat"
                    inputRef={inputRef}
                />
                <Button
                    className='chat-create-button'
                    onClick={() => {
                        props.addChat(inputRef.current.value);
                        inputRef.current.value = "";
                    }}
                >Create</Button>
            </div>
        </div>
    );
}

export default Chats;