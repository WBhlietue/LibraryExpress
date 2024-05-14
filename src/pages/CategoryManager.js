import { useEffect } from "react";
import { useState } from "react";
import Table from "../components/Table";

export default function CategoryManager() {
    const [data, setData] = useState();
    const [action, setAction] = useState({})
    useEffect(() => {
        fetch("http://localhost:8000/category").then((res) => {
            res.json().then((d) => {
                const cat = [["Category Name"]]
                const ac = [[]]
                for(let i of d){
                    cat.push([i._id])
                    ac.push([["Remove", ()=>{
                        fetch("http://localhost:8000/category/"+i._id).then((res) => {
                            window.location.reload()
                        })
                    }]])
                }
                cat.push([""])
                ac.push([["Add", ()=>{
                    const name = window.prompt("Enter category name")
                    if(name){
                        fetch("http://localhost:8000/category", {
                            method: "POST",
                            headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({name: name}),
                    }).then((res) => {
                        window.location.reload()
                    })
                }
            }]])
            console.log(cat);
            setData(cat)
            setAction(ac)
        })
        })
    }, [])
    return (
        <div>
            {/* {data} */}
            <Table
                data={data}
                action={action}
            />
        </div>
    );
}
