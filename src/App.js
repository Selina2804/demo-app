import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import "./style.css";
import Profile from "./Profile";
import Detail from "./Detail";
import Login from "./Login";

function App() {
  return (
    <>
      <Header />

      <main className="app-body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/danh-sach" element={<Profile />} />
          <Route path="/thong-tin/:id" element={<Detail />} />
          <Route path="/dang-nhap" element={<Login />} />
        </Routes>
       
      </main>
    </>
  );
}

export default App;
