import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./style.css";

function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  // 👇 ref để trỏ tới video
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/movies.json");
        const allMovies = res.data;
        const foundMovie = allMovies.find((m) => m.id === Number(id));
        setMovie(foundMovie || null);
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết phim:", error);
        setMovie(null);
      }
      setLoading(false);
    };
    fetchMovieDetail();
  }, [id]);

  if (loading) {
    return (
      <section className="detail">
        <div className="detail-wrapper">
          <div className="detail-card loading-card">
            Đang tải chi tiết phim...
          </div>
        </div>
      </section>
    );
  }

  if (!movie) {
    return (
      <section className="detail">
        <div className="detail-wrapper">
          <div className="detail-card loading-card">
            Không tìm thấy phim!
          </div>
        </div>
      </section>
    );
  }

  // 👇 Hàm khi bấm "Xem ngay"
  const handleWatchClick = () => {
    videoRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="detail">
      <div className="detail-wrapper">
        <div className="detail-card">
          {/* Poster */}
          <img
            src={
              movie.poster
                ? movie.poster
                : "https://via.placeholder.com/300x450?text=No+Image"
            }
            alt={movie.title}
            className="detail-poster"
          />

          {/* Thông tin */}
          <div className="detail-info">
            <h1>{movie.title}</h1>
            <p>{movie.desc || "Không có mô tả"}</p>

            {/*Nút xem ngay - chỉ cuộn xuống video */}
            <button className="btn-watch" onClick={handleWatchClick}>
              Xem ngay
            </button>
            <br />

            <Link to="/danh-sach" className="btn-back">
              ← Quay lại danh sách
            </Link>
          </div>
        </div>

        {/*Video có ref để cuộn tới */}
        {movie.video && (
          <div ref={videoRef} style={{ marginTop: "16px" }}>
            <video
              src={movie.video}
              controls
              width="100%"
              style={{ borderRadius: "8px" }}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default Detail;
