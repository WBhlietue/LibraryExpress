import "../style/Header.scss";

export function Login() {
    return (
        <div>
            <div className="mForm">
                <label>Email</label>
                <input id="email" type="email" />
                <label>PassWord</label>
                <input id="pass" type="password" />

            <div
                className="login-btn"
                onClick={() => {
                    const data = {
                        email: document.getElementById("email").value,
                        pass: document.getElementById("pass").value,
                    };
                    console.log(data);
                    fetch("http://127.0.0.1:8000/login", {
                        method: "POST",
                        headers: { "Content-type": "application/json" },
                        body: JSON.stringify(data),
                    }).then((res) => {
                        res.json().then((data) => {
                            console.log(data);
                            if (data.status == 0) {
                                alert("user name error");
                            } else if (data.status == 1) {
                                alert("pass error");
                            } else {
                                localStorage.setItem("user", data.name);
                                localStorage.setItem("email", data.email);
                                
                                if(data.status == 3){
                                    localStorage.setItem("admin", 1);
                                }else{
                                    localStorage.setItem("admin", 0);
                                }
                                window.location.href = "./";
                            }
                        });
                    });
                }}
            >
                Login
            </div>
            </div>
        </div>
    );
}
export function Register() {
    return (
        <div>
            <div className="mForm">
                <label>Name</label>
                <br />
                <input id="name" type="text" />
                <br />
                <label>Email</label>
                <br />
                <input id="email" type="email" />
                <br />
                <label>PassWord</label>
                <br />
                <input id="pass" type="password" />
                <br />
            <div
                className="login-btn"
                onClick={() => {
                    const data = {
                        email: document.getElementById("email").value,
                        name: document.getElementById("name").value,
                        pass: document.getElementById("pass").value,
                    };
                    console.log(data);
                    fetch("http://127.0.0.1:8000/register", {
                        method: "POST",
                        headers: { "Content-type": "application/json" },
                        body: JSON.stringify(data),
                    }).then((res) => {
                        res.json().then((data) => {
                            console.log(data);
                            if (data.status == 0) {
                                alert("already have");
                            } else {
                                localStorage.setItem("user", data.name);
                                localStorage.setItem("email", data.email)
                                localStorage.setItem("admin", 0);
                                window.location.href = "./";
                            }
                        });
                    });
                }}
            >
                Register
            </div>
            </div>
        </div>
    );
}
