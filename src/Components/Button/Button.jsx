import React from "react";
import styles from './Button.module.css';

function Button({children}){
    return(
        <div className={styles.btndiv}>
            <button className={styles.button}>{children}</button>
        </div>
    );
}

export default Button;