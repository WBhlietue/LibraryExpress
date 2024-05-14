import { useState } from "react";
import { useEffect } from "react";

export default function Table(props){
    const [data, setData] = useState("")
    useEffect(() => {
        let str = []
        for(let i in props.data){
            const line = []
            for(let j of props.data[i]){
                line.push(<td>{j}</td>)
            }
            try{
            for(let j of props.action[i]){
                    if(j){
                        console.log(j);
                       line.push(<td ><button onClick={j[1]}>{j[0]}</button></td>)
                }
            }
        }catch{}
            str.push (<tr>{line}</tr>)
        }    
        setData(str)
    }, [props.data, props.action])
    return <div>
        <table>
            {data}
        </table>
    </div>
}