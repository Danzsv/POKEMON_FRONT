import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

const uppInitial = (str) => str[0].toUpperCase() + str.slice(1);
export default function PokeCard({
  name,
  image,
  types,
  id,
  custom,
  pokedexId,
}) {
  return (
    <div key={id} className={styles.card}>
      {
        <div className={styles.containerTypes}>
          {" "}
          {types?.map((element) => (
            <div value={element.name} className={styles.typeImg}>
              {" "}
            </div>
          ))}
        </div>
      }
      <h1 className={styles.pokename}>{name.toUpperCase()}</h1>
      {custom === true ? (
        <Link to={`/pokemons/${id}`}>
          <img src={image} alt={name} width="200px" height="250px" />
        </Link>
      ) : (
        <Link to={`/pokemons/${pokedexId}`}>
          <img src={image} alt={name} width="200px" height="250px" />
        </Link>
      )}

      <div key={id}>
        {types?.map((element) => (
          <p key={element.id} value={element.name} className={styles.type}>
            {uppInitial(element.name)}
          </p>
        ))}
      </div>
    </div>
  );
}
