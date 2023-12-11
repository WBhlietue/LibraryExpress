import { useEffect, useState } from "react";
import { GetHistoryBookData } from "../Back";
import { BookLibrary } from "../components/BookLibrary";
import { Loader } from "../components/Loader";

export function History() {
    const [pageState, setPageState] = useState(0);
    const [currentData, setCurrentData] = useState([]);
    useEffect(() => {
        GetHistoryBookData().then((res) => {
            setPageState(1);
            setCurrentData(res);
        });
    }, []);
    return (
        <>
            {pageState == 0 ? (
                <Loader />
            ) : (
                <div className="fullFlex">
                    <BookLibrary filter={"All"} data={currentData} />
                </div>
            )}
        </>
    );
}
