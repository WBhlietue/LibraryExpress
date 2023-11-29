import { useEffect, useState } from "react";
import { BookView } from "./BookView";

export function BookLibrary(props) {
    const [datas, setDatas] = useState([]);
    useEffect(() => {
        let a = [];
        props.data.map((data, i) => {
            if(props.filter == "All" || props.filter == data.category){
                a.push(<BookView data={data} key={i} />)
            }
        });
        setDatas(a);
        console.log("AS");
    }, [props.filter]);
    return (
        <div className="flexCenter row bookList">
            {datas}
        </div>
    );
}
