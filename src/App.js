import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { Book } from "./components/Book";
import {Home} from "./pages/Home";
import {Layout} from "./pages/Layout";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/book" element={<Book />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

