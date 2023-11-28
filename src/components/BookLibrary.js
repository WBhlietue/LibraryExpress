import { BookView } from "./BookView"

export function BookLibrary(props){
    return (
        <div className="flexCenter row bookList">
            {
                props.data.map((data, i) => {
                    return <BookView data={data} key={i} />
                })
            }
        </div>
    )
}