import React from "react";
import styles from "./FloatingShape.module.css";

const FloatingShape = ({ color, url }) => {
  return (
    <div>
      {color === "blue" && (
        <div className={styles.blueShape}>
          <img
            className={styles.image}
            src={url}
            alt="shape-blue"
          />
        </div>
      )}

      {color === "red" && (
        <div className={styles.redShape}>
          <img
            className={styles.image}
            src={url}
            alt="shape-blue"
          />
        </div>
      )}
    </div>
  );
};

export default FloatingShape;
