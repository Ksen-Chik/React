import "./index.css";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import { useRef } from "react";
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';

function MessageList(props) {

    const inputRef = useRef(null);
    const classes = makeStyles((theme) => ({
        button: {
            margin: theme.spacing(1),
        },
    }));

    const form = props.showSendForm ? (
        <form>
            <label>Сообщение: </label>
            <TextField
                placeholder="message"
                inputRef={inputRef}
            />

            <Button onClick={() => {
                props.sendMessage(props.messageAuthor, inputRef.current.value);
                inputRef.current.value = "";
                inputRef.current.focus();
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
        <div className="messages">
            {props.messages.map((message, index) =>
                <div key={index}>
                    <div>{message.author} - {message.text}</div>
                </div>)}
            {form}
        </div>
    );
}

export default MessageList;