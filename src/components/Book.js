import { useEffect, useState } from "react";
import { GetBookDataWithId } from "../Back";
import "../style/Book.scss";
import { Button } from "./Button";
import { Loader } from "./Loader";

function LoadError() {
    return <div>Error</div>;
}
function ShowBook({ data, setView, setPdf }) {
    useEffect(() => {
        console.log(data);
    }, [])
    return (
        <div className="book">
            <div className="row m10 bookData">
                <div className="img">
                    <img className="img radiusM " src={data.image} />
                </div>
                <div className="bookDataView">
                    <br />
                    <div className="bold fBig">{data.name}</div>
                    <div className="fSmall">{data.author}</div>
                    <div className="fNormal">{data.description}</div>
                    <Button
                        text={"View Online"}
                        onClick={() => {
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
    return <iframe className="bookPdf" src={url}></iframe>;
}

export function Book() {
    const [pageState, setPageState] = useState(0);
    const [data, setData] = useState(null);
    const [view, setView] = useState(false);
    const [pdf, setPdf] = useState(null);
    useEffect(() => {
        let id = new URLSearchParams(window.location.search).get("id");
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
                <ShowBook data={data} setView={setView} setPdf={setPdf} />
            )}
            {view ? <ViewPDF url={pdf} /> : <></>}
        </div>
    );
}
