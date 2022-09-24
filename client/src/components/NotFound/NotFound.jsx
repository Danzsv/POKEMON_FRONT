import React from "react";
import { Link } from "react-router-dom";
import styles from './NotFound.module.css'

export default function NotFound(){
        return(
            <div className={styles.notFound} >
                <Link to='/home'>
                    <p>BACK TO HOME</p>
                </Link>

            </div>
        )
}