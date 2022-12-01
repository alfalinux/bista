import styles from "./Button.module.css";
import Search from "../../public/icons/search";

const Button = (props) => {
  return (
    <button
      type={props.type}
      onClick={props.clickHandler}
      className={`${styles["btn"]} ${styles[props.width]} ${styles[props.color]}`}
    >
      {props.icon}
      <h4>{props.label}</h4>
    </button>
  );
};

export default Button;
