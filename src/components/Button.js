import "../App.scss"

export function Button({className, onClick, text}){
    return (
        <div className={"btn p10 m10 radiusL " + className} onClick={onClick}>
            {text}
        </div>
    )
}