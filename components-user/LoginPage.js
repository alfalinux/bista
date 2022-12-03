import styles from "./LoginPage.module.css";
import LoginIcon from "../public/icons/login-icon";

const LoginPage = () => {
  const loginHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className={styles["wrapper"]}>
      <form onSubmit={loginHandler} className={styles["container"]}>
        <div className={styles["field"]}>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" placeholder="masukkan username..." autoComplete="off" />
        </div>
        <div className={styles["field"]}>
          <label htmlFor="password">Password:</label>
          <input type="text" id="password" name="password" placeholder="masukkan password..." autoComplete="off" />
        </div>
        <button className={styles["btn"]}>
          <p>Login</p>
          <LoginIcon />
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
