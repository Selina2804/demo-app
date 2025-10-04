import axios from "axios";

// Lấy danh sách phim từ file JSON
export const getMovies = async () => {
  const res = await axios.get("/movies.json");
  return res.data;
};

// Giả lập thêm phim mới
export const addMovie = (movies, newMovie) => {
  const id = movies.length > 0 ? movies[movies.length - 1].id + 1 : 1;
  return [...movies, { id, ...newMovie }];
};

// Giả lập cập nhật phim
export const updateMovie = (movies, updatedMovie) => {
  return movies.map((m) => (m.id === updatedMovie.id ? updatedMovie : m));
};

// Giả lập xóa phim
export const deleteMovie = (movies, id) => {
  return movies.filter((m) => m.id !== id);
};
