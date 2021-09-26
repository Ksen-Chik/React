import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Home } from "../home";
import { Profile } from "../profile";
import Animals from "../animals";
import Chat from "../chat";

export const Routes = () => {
    return (
        <BrowserRouter>
            <ul>
                <li>
                    <Link to="/profile">profile</Link>
                </li>

                <li>
                    <Link to="/chats">chats</Link>
                </li>

                <li>
                    <Link to="/">Home</Link>
                </li>

                <li>
                    <Link to="/animals">Animals</Link>
                </li>
            </ul>

            <Switch>
                <Route path="/profile">
                    <Profile />
                </Route>
                <Route path="/chats/:chatId?" component={Chat} />
                <Route path="/animals">
                    <Animals />
                </Route>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route>
                    <h4>Ошибка 404 - Страница не найдена!</h4>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}