import "./style.css";
import banner from "../assets/banner.png";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <section className="hero">
        <img src={banner} alt="Horizon" className="hero-banner" />

        <div className="hero-content">
          <h1>Chào mừng đến với HorizonFilm</h1>
          <p>Xem phim trực tuyến mọi lúc, mọi nơi</p>
         <Link to="/danh-sach">
        <button className="btn-watch">Xem ngay</button>
        </Link>
        </div>
      </section>
    </>
  );
}

export default Home;
