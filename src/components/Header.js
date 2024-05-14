import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/Header.scss";

export function Header() {
    const [logged, setLogged] = useState(false);
    useEffect(() => {
        const user = localStorage.getItem("user", "");
        console.log(user);
        if (user != "") {
            setLogged(true);
        } else {
            setLogged(false);
        }
        console.log(localStorage.getItem("admin"));
    }, []);
    return (
        <div className="header">
            <Link className="header-Link" to={"/"}>
                Home
            </Link>
            {!logged ? (
                <div className="user">
                    <Link className="header-Link-btn" to={"/login"}>
                        Login
                    </Link>
                    <Link className="header-Link-btn" to={"/register"}>
                        Register
                    </Link>
                </div>
            ) : (
                <div className="user">
                    {localStorage.getItem("user")}
                    {localStorage.getItem("admin")==1 ? (
                        <>
                            <Link
                                className="header-Link-btn"
                                to={"/userView"}
                                onClick={() => {}}
                            >
                                User Views
                            </Link>
                            <Link
                                className="header-Link-btn"
                                to={"/bookView"}
                                onClick={() => {}}
                            >
                                Book Views
                            </Link>
                            <Link
                                className="header-Link-btn"
                                to={"/category"}
                                onClick={() => {}}
                            >
                                Manage Category
                            </Link>
                            <Link
                                className="header-Link-btn"
                                to={"/request"}
                                onClick={() => {}}
                            >
                                Upload Request
                            </Link>
                        </>
                    ) : (
                        <></>
                    )}
                    <Link
                        className="header-Link-btn"
                        to={"/history"}
                        onClick={() => {}}
                    >
                        My History
                    </Link>
                    <Link
                        className="header-Link-btn"
                        to={"/upload"}
                        onClick={() => {}}
                    >
                        Upload
                    </Link>
                    <div
                        className="header-Link-btn"
                        onClick={() => {
                            localStorage.setItem("user", "");
                            localStorage.setItem("email", "");
                            window.location.href = "/";
                        }}
                    >
                        LogOut
                    </div>
                </div>
            )}
        </div>
    );
}
