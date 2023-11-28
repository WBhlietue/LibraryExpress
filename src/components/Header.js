import { Link } from "react-router-dom"
import "../style/Header.scss"

export function Header(){
    return (
        <div className="header">
            <nav>
                <li>
                    <Link className="header-Link" to={"/"}>Home</Link>
                </li>
            </nav>
        </div>
    )
}