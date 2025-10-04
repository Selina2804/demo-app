import "./style.css";

function Login() {
  return (
    <section className="login">
      <div className="login-card">
        <h2>Đăng nhập</h2>
        <form>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Nhập email..."
              required
            />
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              placeholder="Nhập mật khẩu..."
              required
            />
          </div>

          <button type="submit" className="btn-login">Đăng nhập</button>
        </form>
      </div>
    </section>
  );
}

export default Login;
