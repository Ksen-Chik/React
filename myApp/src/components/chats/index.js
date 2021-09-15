import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
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