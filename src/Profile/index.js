import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMovies, addMovie, updateMovie, deleteMovie } from "../api/moviesapi";
import "./style.css";

function Profile() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    poster: "",
    desc: "",
    video: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMovies();
        setMovies(data);
      } catch (err) {
        console.error("Lỗi khi lấy phim:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    if (!formData.title || !formData.poster || !formData.desc || !formData.video) {
      alert("Hãy điền đầy đủ thông tin, bao gồm link phim!");
      return;
    }
    const updated = addMovie(movies, formData);
    setMovies(updated);
    setFormData({ id: null, title: "", poster: "", desc: "", video: "" });
  };

  const handleEdit = (movie) => {
    setIsEditing(true);
    setFormData(movie);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdate = () => {
    const updated = updateMovie(movies, formData);
    setMovies(updated);
    setIsEditing(false);
    setFormData({ id: null, title: "", poster: "", desc: "", video: "" });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa phim này không?")) return;
    const updated = deleteMovie(movies, id);
    setMovies(updated);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({ id: null, title: "", poster: "", desc: "", video: "" });
  };

  const filteredMovies = movies.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="profile">
      <div className="card movie-container">
        <div className="movie-form">
          <h2>{isEditing ? "Chỉnh sửa phim" : "Thêm phim mới"}</h2>

          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Tiêu đề phim"
          />
          <input
            name="poster"
            value={formData.poster}
            onChange={handleChange}
            placeholder="URL ảnh poster"
          />
          <input
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            placeholder="Mô tả phim"
          />
          {/* Thêm ô nhập link video */}
          <input
            name="video"
            value={formData.video}
            onChange={handleChange}
            placeholder="Link video phim (Cloudinary, Drive, ...)"
          />

          {isEditing ? (
            <>
              <button onClick={handleUpdate}>Cập nhật</button>
              <button onClick={handleCancel}>Hủy</button>
            </>
          ) : (
            <button onClick={handleAdd}>Thêm phim</button>
          )}
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Tìm phim..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <h2>Danh sách phim</h2>
        <div className="movie-list">
          {loading ? (
            <div>Đang tải...</div>
          ) : (
            filteredMovies.map((movie) => (
              <div key={movie.id} className="movie-card-wrapper">
                <Link to={`/thong-tin/${movie.id}`} className="movie-link">
                  <div className="movie-card">
                    <img
                      src={
                        movie.poster ||
                        "https://via.placeholder.com/200x270?text=No+Image"
                      }
                      alt={movie.title}
                    />
                    <h3>{movie.title}</h3>
                  </div>
                </Link>

                <div className="movie-actions">
                  <button onClick={() => handleEdit(movie)}>Sửa</button>
                  <button onClick={() => handleDelete(movie.id)}>Xóa</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Profile;
