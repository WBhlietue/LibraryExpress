import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { Book } from "./components/Book";
import {Home} from "./pages/Home";
import {Layout} from "./pages/Layout";
import { Login, Register } from "./pages/Login";
import { Upload } from "./pages/Upload";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/book" element={<Book />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/upload" element={<Upload />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

