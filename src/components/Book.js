import { useEffect, useState } from "react";
import { GetBookDataWithId } from "../Back";
import "../style/Book.scss";
import { Button } from "./Button";
import { Loader } from "./Loader";

function LoadError() {
    return <div>Error</div>;
}
function ShowBook({ data, setView, setPdf, id }) {
    useEffect(() => {
        console.log(data);
    }, []);
    return (
        <div className="book">
            <div className="row m10 bookData">
                <div className="img">
                    <img className="img radiusM " src={data.image} />
                </div>
                <div className="bookDataView">
                    <br />
                    <div className="bold fBig">{data.name}</div>
                    <div className="fNormal">{data.category}</div>
                    <div className="fSmall">{data.author}</div>
                    <div className="fNormal">{data.description}</div>
                    <Button
                        text={"View Online"}
                        onClick={() => {
                            fetch("http://127.0.0.1:8000/uploadHistory", {
                                method: "POST",
                                headers: { "Content-type": "application/json" },
                                body: JSON.stringify({
                                    email: localStorage.getItem("email"),
                                    id: id,
                                }),
                            }).then((res) => {
                                console.log(res);
                            });
                            setView(true);
                            setPdf(data.pdf);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

function ViewPDF({ url }) {
    return <iframe className="bookPdf" src={url + "#toolbar=0"} frameborder="0"></iframe>;
}

export function Book() {
    const [pageState, setPageState] = useState(0);
    const [data, setData] = useState(null);
    const [view, setView] = useState(false);
    const [pdf, setPdf] = useState(null);
    const [bookId, setBookIs] = useState(-1);
    useEffect(() => {
        let id = new URLSearchParams(window.location.search).get("id");
        setBookIs(id);
        if (id == "" || id == null) {
        } else {
            GetBookDataWithId(id).then((res) => {
                if (res) {
                    setData(res);
                    setPageState(2);
                } else {
                    setPageState(1);
                }
            });
        }
    }, []);
    return (
        <div>
            {pageState == 0 ? (
                <Loader />
            ) : pageState == 1 ? (
                <LoadError />
            ) : (
                <ShowBook
                    data={data}
                    setView={setView}
                    setPdf={setPdf}
                    id={bookId}
                />
            )}
            {view ? <ViewPDF url={pdf} /> : <></>}
        </div>
    );
}
