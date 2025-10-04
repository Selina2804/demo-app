import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "./style.css";

function Header() {
  return (
    <header className="header">
      <div className="body-header">
        <div className="lego"> 
         <Link to="/"><img src={logo} alt="Logo" className="logo" /></Link>
          <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/danh-sach">Danh sách</Link>
            <Link to="/thong-tin/:id">Thông tin video</Link>
          </nav>

          <button className="btn-header">
            <Link to="/dang-nhap">Đăng nhập</Link>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
