import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    return(
        <ul className="navbar">
            <li className="navbar_item active">
                <Link className="navbar_link" to="/newgame">
                    New Game
                </Link>
            </li>
            <li className="navbar_item active">
                <Link className="navbar_link" to="/allgames">
                    All Games
                </Link>
            </li>
            <li className="navbar_item active">
                <Link className="navbar_link" to="/previousgames">
                    Previous Games
                </Link>
            </li>
            <li className="navbar_item active">
                <Link className="navbar__link" to="#"
                    onClick={
                        () => {
                        localStorage.removeItem("betcha_user")
                        }
                     }>
                Logout
                </Link>
        </li>
        </ul>
    )
}