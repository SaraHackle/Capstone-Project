import React from "react";
import { Route } from "react-router-dom";
import { GameList } from "./components/game/GameList";
import { NewGameForm } from "./components/game/NewGameForm";

export const ApplicationViews = () => {
    return (
        <>
            <Route path="/allgames">
                <h3> Current Games: </h3>
                <GameList />
            </Route>
            <Route path="/newgame">
                <NewGameForm />
            </Route>
        </>
    )
}