import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/Book.scss";

export function BookView({ data }) {
    return (
        <Link to={{pathname:"/book", search:"id="+data.id}} className="bookView m10 scrollM">
            <div className="img radiusM">
                <img src={data.image} />
            </div>
            <div className="name fBig flexCenter">{data.name}</div>
        </Link>
    );
}
