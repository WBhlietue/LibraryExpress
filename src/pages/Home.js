import { useEffect, useState } from "react";
import { GetAllBookData } from "../Back";
import { BookLibrary } from "../components/BookLibrary";
import { Loader } from "../components/Loader";

function CategoryClick({ name, num, click }) {
    return (
        <div>
            <hr />
            <div onClick={()=>{click(name)}} className="categoryItem flexCenter fBig">{`${name} (${num})`}</div>
        </div>
    );
}

export function Home() {
    const [pageState, setPageState] = useState(0);
    const [bookData, setBookData] = useState(null);
    const [currentData, setCurrentData] = useState([]);
    const [category, setCategory] = useState([]);
    const [categoryNum, setCategoryNum] = useState([]);
    const [filter, setFilter] = useState("All")
    useEffect(() => {
        GetAllBookData().then((res) => {
            let cateList = ["All"];
            let cateNumList = [0];
            res.map((i) => {
                let cate = i.category;
                let num = cateList.indexOf(cate);
                if (num == -1) {
                    cateList.push(cate);
                    cateNumList.push(1);
                } else {
                    cateNumList[num]++;
                }
                cateNumList[0]++;
            });
            setCategory(cateList);
            setCategoryNum(cateNumList);
            setBookData(res);
            setPageState(1);
            setCurrentData(res);
        });
    }, []);
    function Click(name){
        setFilter(name)
    }
    return (
        <div>
            {pageState == 0 ? (
                <Loader />
            ) : (
                <div className="row">
                    <div className="category">
                        <div className="category-text fBig flexCenter">

                        Categories
                        </div>
                        {category.map((item, i) => {
                            return (
                                <CategoryClick
                                    key={i}
                                    name={category[i]}
                                    num={categoryNum[i]}
                                    click={Click}
                                ></CategoryClick>
                            );
                        })}
                        <hr></hr>
                    </div>
                    <div className="fullFlex">
                        <BookLibrary filter={filter} data={currentData} />
                    </div>
                </div>
            )}
        </div>
    );
}
