import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { Book } from "./components/Book";
import BookView from "./pages/BookView";
import CategoryManager from "./pages/CategoryManager";
import { History } from "./pages/History";
import {Home} from "./pages/Home";
import {Layout} from "./pages/Layout";
import { Login, Register } from "./pages/Login";
import Request from "./pages/Request";
import { Upload } from "./pages/Upload";
import UserView from "./pages/UserView";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/book" element={<Book />} />
                    <Route path="/userView" element={<UserView />} />
                    <Route path="/bookView" element={<BookView />} />
                    <Route path="/category" element={<CategoryManager />} />
                    <Route path="/request" element={<Request />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/upload" element={<Upload />} />
                    <Route path="/history" element={<History />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

