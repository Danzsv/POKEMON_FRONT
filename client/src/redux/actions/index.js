import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const GET_TYPES = "GET_TYPES";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const FILTER_BY_NAME = "FILTER_BY_NAME";
export const FILTER_BY_CREATED = "FILTER_BY_CREATED";
export const FILTER_BY_ORDER = "FILTER_BY_ORDER";
export const GET_NAME_POKEMON = "GET_NAME_POKEMON";
export const POST_POKEMON = "POST_POKEMON";
export const GET_POKEMON_ID = "GET_POKEMON_ID";
export const CLEAN_FILTER = "CLEAN_FILTER";
export const FILTER_BY_ATTACK = "FILTER_BY_ATTACK";
export const DELETE_POKEMON = "DELETE_POKEMON";
export const UPDATE_POKE = "UPDATE_POKE";

// ================================GET POKEMONS===================================
export function getPokemons() {
  return function (dispatch) {
    return fetch("https://pokemonapi-liodandev.up.railway.app/api/pokemons")
      .then((data) => data.json())
      .then((data) => {
        dispatch({
          type: GET_POKEMONS,
          payload: data,
        });
      });
  };
}
// =========================== GET TYPES ============================
export function getTypes() {
  return function (dispatch) {
    return fetch("https://pokemonapi-liodandev.up.railway.app/api/types")
      .then((data) => data.json())
      .then((data) => {
        dispatch({
          type: GET_TYPES,
          payload: data,
        });
      });
  };
}
//============================SEARCH NAME POKEMON================================

export function getNamePokemon(name) {
  return function (dispatch) {
    fetch(
      `https://pokemonapi-liodandev.up.railway.app/api/pokemons?name=${name}`
    )
      .then((data) => data.json())
      .then((data) => {
        dispatch({
          type: GET_NAME_POKEMON,
          payload: data,
        });
      });
  };
}

//===============================DETAIL POKEMON==========================

export function getPokemonById(id) {
  return function (dispatch) {
    fetch(`https://pokemonapi-liodandev.up.railway.app/api/pokemons/${id}`)
      .then((data) => data.json())
      .then((data) => {
        dispatch({
          type: GET_POKEMON_ID,
          payload: data,
        });
      });
  };
}

// ==========================CREATE POKEMON ============================
export function postPokemon(payload) {
  return async function (dispatch) {
    const response = await axios.post(
      `https://pokemonapi-liodandev.up.railway.app/api/pokemons`,
      payload
    );
    // const response = await axios.post(
    // `http://localhost:3002/api/pokemons`,
    // payload
    // );
    // console.log(response)
    dispatch({
      type: POST_POKEMON,
    });
    return response;
  };
}
// ==========================FYLTER BY TYPE ============================

export function filterByType(payload) {
  return {
    type: FILTER_BY_TYPE,
    payload,
  };
}

// ===========================FILTER BY ATTACK =============================
export function filterByAttack(payload) {
  return {
    type: FILTER_BY_ATTACK,
    payload,
  };
}

// ==========================FYLTER BY CREATED ============================
export function filterByCreated(payload) {
  return {
    type: FILTER_BY_CREATED,
    payload,
  };
}
// ==========================FYLTER BY ORDER ============================
export function filterByOrder(payload) {
  return {
    type: FILTER_BY_ORDER,
    payload,
  };
}

// ==========================CLEAN FILTER==================================
export function cleanFilter() {
  return {
    type: CLEAN_FILTER,
    payload: [],
  };
}

// ==========================DELETED BY============================

export function deleteBy(id) {
  return async function (dispatch) {
    await axios
      .delete(`https://pokemonapi-liodandev.up.railway.app/api/pokemons/${id}`)
      .then(() => {
        alert("Pokemon deleted succesfully");
        return dispatch({
          type: DELETE_POKEMON,
        });
      })
      .catch((e) => {
        return alert("Something went wrong");
      });
  };
}
