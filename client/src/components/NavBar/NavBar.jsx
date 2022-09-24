import React from "react";
import {useDispatch,useSelector} from 'react-redux'
import {cleanFilter, getPokemons,filterByType,
    filterByCreated, filterByOrder,filterByAttack } from '../../redux/actions';
import styles from './NavBar.module.css'
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import logoPokemon from '../images/pokemon_logo.png'

export default function NavBar({setCurrentPage,setOrder}){

    const dispatch = useDispatch()
    const allTypes = useSelector( state => state.typesPokemon)

    const uppInitial = (str) => str[0].toUpperCase()+str.slice(1)

    function handlerFilterByOrder(e){
        if(e.target.value !== 'all'){
            e.preventDefault();
            dispatch(filterByOrder(e.target.value))
            setCurrentPage(1)
            setOrder(`Ordenado ${e.target.value}`)
        }
    }

    function handleFilterByAttack(e){
        if(e.target.value !== 'CHOOSE'){
            e.preventDefault();
            dispatch(filterByAttack(e.target.value))
            setCurrentPage(1)
            setOrder(`Ordenado ${e.target.value}`)
        }
    }

    function handleFilterByType(e){
        e.preventDefault();
        dispatch(filterByType(e.target.value))
        setCurrentPage(1)
    }

    function handlerFilterByCreated(e){
        e.preventDefault();
        dispatch(filterByCreated(e.target.value))
        setCurrentPage(1)
    }

    function handleClick(e){
        e.preventDefault();
        dispatch(cleanFilter())
        dispatch(getPokemons());
    }
        return (

                <div className={styles.left}>
                        <Link to={`/`}> 
                        <img src={logoPokemon} className={styles.image}></img>
                        </Link>
                        <SearchBar  setCurrentPage={setCurrentPage}/>
                        

                            <select className={styles.filterOrder} onChange={(e) => handlerFilterByOrder(e)}>
                                <option value='all' >ORDER... </option>
                                <option value='asc'>A to Z</option>
                                <option value ='desc'>Z to A</option>
                            </select>

                            <select className={styles.filterAttack} onChange={(e) => handleFilterByAttack(e)}>
                                <option value='CHOOSE'>BY ATTACK... </option>
                                <option value='MAX'>MAYOR ATTACK</option>
                                <option value ='MIN'>MINOR ATTACK</option>
                            </select>

                            <select className={styles.filterType} onChange={(e) => handleFilterByType(e)}>
                                <option value= 'All'>All TYPES</option>
                                {
                                    allTypes?.map(type =>{
                                        
                                        return(
                                            <option value={type.name} key={type.id} >{uppInitial(type.name)}</option>
                                        )
                                    })}                   
                            </select>
                            

                            <select className={styles.filterApi} onChange={e => handlerFilterByCreated(e)}>
                                <option value='All'>ALL</option>
                                <option value='created'>CREATED</option>
                                <option value='api'>EXISTENT</option>
                            </select>

                
                            <div className={styles.refresh} onClick={e => {handleClick(e)}}>
                            REFRESH
                            <button className={styles.pokeButton2} onClick={e => {handleClick(e)}}>
                                
                            </button>

                            </div>
                        
                            <div className={styles.create}> 
                                 <p>CREATE POKEMON</p>   
                                <Link to='/pokemons'>    
                                    <button className={styles.pokeButton}/>
                                </Link>
                            </div>
                        
                </div>  
        )
}