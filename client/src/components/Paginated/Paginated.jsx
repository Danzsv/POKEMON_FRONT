import React from "react";
import styles from './Paginated.module.css'


export default function Paginated({pokemonPerPage,allPokemon,paginated,currentPage}){

    const pageNumbers = []

    for (let i = 1; i <=Math.ceil(allPokemon/pokemonPerPage);i++){
        pageNumbers.push(i)
    }

    const prevHandler = () => {
		if (currentPage <= 1) return;
		paginated(currentPage - 1);
	};
	const nextHandler = () => {
		if (currentPage >= pageNumbers.length) return;
		paginated(currentPage + 1);
	};
    
    return(
        <div>
            <span className={styles.paginated} >
                <button className={styles.arrow1} onClick={() => prevHandler()}>
                   
                </button>
                {pageNumbers?.map(number =>(

                    <li className={currentPage === number ? styles.active : ""} 
                        onClick = { () => paginated(number)} 
                        key={number}>
                        {' '}
                        <a className={styles.current}>{number} </a>
                    </li>
                ))}
                <button className={styles.arrow2}  onClick={() => nextHandler()}>
                
                </button>
            </span>
        </div>       
    )}