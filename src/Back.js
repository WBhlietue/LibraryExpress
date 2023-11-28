export async function GetAllBookData() {
    let res = await fetch("http://localhost:8000/api/book");
    let data = await res.json();
    return data;
}

export async function GetBookDataWithId(id) {
    let a = await fetch(`http://localhost:8000/api/book/${id}`);
    a = await a.json()
    if (a.status == "200") {
        return a.book;
    }
    return null;
}
