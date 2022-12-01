import Button from "../../components-app/ui/Button";
import Printer from "../../public/icons/printer";
import LoadingSpinner from "../../public/icons/loading-spinner";
import styles from "./LoadingSaveResi.module.css";

const LoadingSaveResi = () => {
  return (
    <div className={styles["container"]}>
      <LoadingSpinner />
      <LoadingSpinner />
    </div>
  );
};

export default LoadingSaveResi;
