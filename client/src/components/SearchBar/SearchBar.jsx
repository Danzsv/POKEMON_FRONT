import React from "react";
import { useState } from "react";
import { useDispatch} from "react-redux";
import { getNamePokemon,cleanFilter } from "../../redux/actions";
import styles from './SearchBar.module.css'

export default function SearchBar({setCurrentPage}){
    
    const dispatch = useDispatch()
    const [name,setName] = useState('')

    
    const handlerInputOnChange = (e) =>{
        e.preventDefault()
        setName(e.target.value)        
    }

    const handlerSubmit = (e) =>{       
        e.preventDefault()     
        dispatch(cleanFilter())  
        dispatch(getNamePokemon(name))
        setName('')
        setCurrentPage(1)
    }

    return (
        <div >
            <input className={styles.searchBox}
                type='text'
                placeholder="Search..."
                onChange={(event) =>handlerInputOnChange(event) }                
            />

            <button className={styles.pokeButton} type="submit" onClick={ (e) =>handlerSubmit(e) } ></button>




        </div>
    )

}