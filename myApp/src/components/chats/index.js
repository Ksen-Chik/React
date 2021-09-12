import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
//import "./index.css";
//import { SimpleText } from "./components/SimpleText";
import SendIcon from '@material-ui/icons/Send';
//import { Message } from "./components/message/message";
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import { Link } from "react-router-dom";

function Chats(props) {

    return (
        <div className="chats">
            <nav>
                <List>
                    {props.chats.map((chat) =>
                        <ListItem key={chat.id}>
                            <Link to={`/chats/${chat.id}`}>{chat.user}</Link>
                        </ListItem>)}
                </List>
            </nav>
        </div>
    );
}

export default Chats;