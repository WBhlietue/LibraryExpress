import { useEffect } from "react";
import { useState } from "react";
import Table from "../components/Table";

export default function Request() {
    const [data, setData] = useState();
    const [action, setAction] = useState({});
    useEffect(() => {
        fetch("http://localhost:8000/request").then((res) => {
            res.json().then((d) => {
                const cat = [["Book ID", "Book Name"]];
                const ac = [[]];
                for (let i of d) {
                    cat.push([i[0], i[1]]);
                    ac.push([
                        [
                            "Accept",
                            () => {
                                fetch(
                                    "http://localhost:8000/accept/" + i[0]
                                ).then((res) => {
                                    window.location.reload();
                                });
                            },
                        ],
                        [
                            "Deny",
                            () => {
                                fetch(
                                    "http://localhost:8000/deny/" + i[0]
                                ).then((res) => {
                                    window.location.reload();
                                });
                            },
                        ],
                    ]);
                }

                console.log(cat);
                setData(cat);
                setAction(ac);
            });
        });
    }, []);
    return (
        <div>
            {/* {data} */}
            <Table data={data} action={action} />
        </div>
    );
}
