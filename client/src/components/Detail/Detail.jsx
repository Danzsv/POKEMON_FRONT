import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemonById,
  deleteBy,
  cleanFilter,
} from "../../redux/actions/index.js";
import { useEffect } from "react";
import styles from "./Detail.module.css";
import pokedex from "../images/pokedex.png";
import loading from "../images/pkball.gif";

export default function Detail(props) {
  // console.log(props)
  const maxStat = 252;
  const myPokemon = useSelector((state) => state.details);
  const history = useHistory();
  const dispatch = useDispatch();

  const uppInitial = (str) => str[0].toUpperCase() + str.slice(1);
  let idPoke = myPokemon._id;

  useEffect(() => {
    dispatch(getPokemonById(idPoke));

    return () => {
      dispatch(cleanFilter());
    };
  }, [dispatch]);

  function handlerDelete(id) {
    dispatch(deleteBy(id));
    history.push("/home");
  }

  console.log(Object.keys(myPokemon).length);
  console.log(myPokemon.hp);
  //uwu

  return (
    <div className={styles.container}>
      <img src={pokedex} className={styles.image}></img>
      <div className={styles.card}>
        {Object.keys(myPokemon).length > 0 ? (
          <div>
            <img
              src={myPokemon.image}
              className={myPokemon.custom ? styles.imageDb : styles.pokemon}
            />
            <label className={styles.pokeName}>
              {" "}
              {myPokemon.name.toUpperCase()}
            </label>

            <div className={styles.types}>
              {myPokemon.types?.map((element) => (
                <span
                  key={element._id}
                  value={element.name}
                  className={styles.type}
                >
                  {uppInitial(element.name)}
                </span>
              ))}
            </div>
            <label className={myPokemon.custom ? styles.idDb : styles.id}>
              ID: {myPokemon.custom ? myPokemon._id : myPokemon.pokedexId}
            </label>

            <p>
              HP: {myPokemon.hp}
              <progress
                className={
                  myPokemon.hp < 99 ? styles.progressBar1 : styles.progressBar5
                }
                max={maxStat}
                value={myPokemon.hp}
              ></progress>
            </p>
            <p>
              ATTACK: {myPokemon.attack}
              <progress
                className={
                  myPokemon.attack < 99
                    ? styles.progressBar2
                    : styles.progressBar6
                }
                max={maxStat}
                value={myPokemon.attack}
              ></progress>
            </p>
            <p>
              DEFENSE: {myPokemon.defense}
              <progress
                className={
                  myPokemon.defense <= 99
                    ? styles.progressBar3
                    : styles.progressBar7
                }
                max={maxStat}
                value={myPokemon.defense}
              ></progress>
            </p>
            <p>
              SPEED: {myPokemon.speed}
              <progress
                className={
                  myPokemon.speed < 99
                    ? styles.progressBar4
                    : styles.progressBar8
                }
                max={maxStat}
                value={myPokemon.speed}
              ></progress>
            </p>

            <p>HEIGHT: {myPokemon.height}</p>
            <p>WEIGHT: {myPokemon.weight}</p>
            {myPokemon.custom && (
              <button
                className={styles.pokeButtonX}
                onClick={() => handlerDelete(idPoke)}
              >
                X
              </button>
            )}
            <label>
              <Link to="/home">
                <button className={styles.pokeButton}></button>{" "}
              </Link>
            </label>
            {/* onClick={() =>homeButtom() } */}
          </div>
        ) : (
          <div className={styles.loading}>
            <img
              className={styles.loading}
              width="374px"
              height="245px"
              src={loading}
            ></img>
          </div>
        )}
      </div>
    </div>
  );
}
