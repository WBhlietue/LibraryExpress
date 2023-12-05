import { useEffect, useState } from "react";
import "../style/Upload.scss";

export function Upload() {
    const [img, setImg] = useState("");
    const [pdf, setPdf] = useState("");
    useEffect(() => {
        document
            .getElementById("image")
            .addEventListener("change", async (event) => {
                const files = event.target.files[0];
                if (files) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        const base64String = reader.result.split(",")[1];
                        console.log(base64String);
                        setImg(base64String);
                    };
                    reader.readAsDataURL(files);
                }
            });
        document
            .getElementById("pdf")
            .addEventListener("change", async (event) => {
                const files = event.target.files[0];
                if (files) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        const base64String = reader.result.split(",")[1];
                        console.log(base64String);
                        setPdf(base64String);
                    };
                    reader.readAsDataURL(files);
                }
            });
    }, []);
    return (
        <div>
            <div className="uploadForm">
                <label>name</label>
                <br />
                <input id="name" />
                <br />
                <label>image</label>
                <br />
                <input id="image" type={"file"} accept={"image/*"} />
                <br />
                <label>category</label>
                <br />
                <input id="category" />
                <br />
                <label>language</label>
                <br />
                <input id="language" />
                <br />
                <label>author</label>
                <br />
                <input id="author" />
                <br />
                <label>pdf</label>
                <br />
                <input id="pdf" type={"file"} accept="application/pdf"/>
                <br />
            <div
                className="btn"
                onClick={() => {
                    const data = {
                        name: document.getElementById("name").value,
                        image: img,
                        category: document.getElementById("category").value,
                        language: document.getElementById("language").value,
                        author: document.getElementById("author").value,
                        pdf: pdf,
                    };
                    fetch("http://127.0.0.1:8000/upload", {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json",
                        },
                        body: JSON.stringify(data),
                    }).then((res) =>{
                        res.json().then((data) => {
                            console.log(data);
                            window.location.href="./"
                        })
                    });
                }}
            >
                Upload
            </div>
            </div>
        </div>
    );
}
