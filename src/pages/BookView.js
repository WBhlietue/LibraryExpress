import { useEffect } from "react";
import { useState } from "react";
import Table from "../components/Table";
export default function BookView(){
    const [data, setData] = useState();
    useEffect(() => {
        fetch("http://localhost:8000/getBookView").then((res) => {
            res.json().then((d) => {
                const cat = [["Book ID", "Book Name", "Number of read by user"]]
                const ac = []
                for(let i of d){
                    cat.push([i[0], i[1], i[2]])
                }
            console.log(cat);
            setData(cat)
        })
        })
    }, [])
    return (
        <div>
            <Table
                data={data}
                action={[]}
            />
        </div>
    );
}