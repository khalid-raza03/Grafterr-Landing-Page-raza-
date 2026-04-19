import React from "react";
import styles from "./FloatingShape.module.css";

const FloatingShape = () => {
  return (
    <div>
      <div className="blue-shape">
        <img
          className={styles.blueShape}
          src="/images/shape-blue.png"
          alt="shape-blue"
        />
        
      </div>

       <div className={styles.redShape}>
        <img
          className={styles.image}
          src="/images/shape-red.png"
          alt="shape-blue"
        />
        
      </div>
    </div>
  );
};

export default FloatingShape;
