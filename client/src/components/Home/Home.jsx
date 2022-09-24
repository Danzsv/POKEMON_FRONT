/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getTypes } from "../../redux/actions";
import { Link } from "react-router-dom";
import PokeCard from "../Card/Card.jsx";
import Paginated from "../Paginated/Paginated.jsx";

import styles from "./Home.module.css";

import loading from "../images/charizard_loading.gif";
import NavBar from "../NavBar/NavBar.jsx";

export default function Home() {
  const dispatch = useDispatch();
  const allPokemon = useSelector((state) => state.filterPokemon);

  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonPerPage, setPokemonPerPage] = useState(12);
  const [order, setOrder] = useState("");
  const indexOfLast = currentPage * pokemonPerPage;
  const indexOfFirst = indexOfLast - pokemonPerPage;
  const currentPokemons = allPokemon.slice(indexOfFirst, indexOfLast);

  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);

  // console.log(allTypes)

  return (
    <div className={styles.mainContainer}>
      <div>
        <NavBar setCurrentPage={setCurrentPage} setOrder={setOrder} />
      </div>

      <div className={styles.cards}>
        {allPokemon[0] === "No existe el pokemon" ? (
          <div className={styles.notFound}>
            <h1>Pokemon not found</h1>
          </div>
        ) : allPokemon.length > 0 ? (
          <div>
            <Paginated
              pokemonPerPage={pokemonPerPage}
              allPokemon={allPokemon.length}
              paginated={paginated}
              currentPage={currentPage}
            />

            <div className={styles.cardsOrder}>
              {currentPokemons?.map((e) => {
                return (
                  <div>
                    {e.custom !== true ? (
                      <PokeCard
                        id={e._id}
                        name={e.name}
                        image={e.image}
                        types={e.types}
                        custom={e.custom}
                        pokedexId={e.pokedexId}
                      />
                    ) : (
                      <PokeCard
                        id={e._id}
                        name={e.name}
                        image={e.image}
                        types={e.types}
                        custom={e.custom}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <Paginated
              pokemonPerPage={pokemonPerPage}
              allPokemon={allPokemon.length}
              paginated={paginated}
              currentPage={currentPage}
            />
          </div>
        ) : (
          <div className={styles.loader}>
            <img src={loading} width="800px" height="360px"></img>
            <h1> LOADING ...</h1>
          </div>
        )}
      </div>
    </div>
  );
}
