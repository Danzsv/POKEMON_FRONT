import {
  GET_POKEMONS,
  GET_TYPES,
  FILTER_BY_TYPE,
  FILTER_BY_CREATED,
  FILTER_BY_ORDER,
  GET_NAME_POKEMON,
  POST_POKEMON,
  GET_POKEMON_ID,
  CLEAN_FILTER,
  FILTER_BY_ATTACK,
  DELETE_POKEMON,
} from "../actions";

const initialState = {
  pokemons: [],
  filterPokemon: [],
  typesPokemon: [],
  details: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        filterPokemon: action.payload,
        details: [],
      };
    case GET_TYPES: {
      return {
        ...state,
        typesPokemon: action.payload,
        details: [],
      };
    }
    case FILTER_BY_TYPE:
      let pokemon = state.pokemons;
      const typesFilter =
        action.payload === "All"
          ? pokemon
          : pokemon.filter((element) =>
              element.types.map((type) => type.name).includes(action.payload)
            );

      return {
        ...state,
        filterPokemon: typesFilter,
        details: [],
      };

    case FILTER_BY_CREATED: {
      let pokemonsCreated = state.pokemons;

      const createdFilter =
        action.payload === "created"
          ? pokemonsCreated.filter((element) => element.custom)
          : action.payload === "api"
          ? pokemonsCreated.filter((element) => !element.custom)
          : pokemonsCreated;
      return {
        ...state,
        filterPokemon: createdFilter,
      };
    }
    case FILTER_BY_ORDER: {
      let orderPokemon =
        action.payload === "asc"
          ? state.filterPokemon.sort(function (a, b) {
              if (a.name.toUpperCase() > b.name.toUpperCase()) {
                return 1;
              }
              if (b.name.toUpperCase() > a.name.toUpperCase()) {
                return -1;
              }
              return 0;
            })
          : state.filterPokemon.sort(function (a, b) {
              if (a.name.toUpperCase() > b.name.toUpperCase()) {
                return -1;
              }
              if (b.name.toUpperCase() > a.name.toUpperCase()) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        filterPokemon: orderPokemon,
      };
    }
    case FILTER_BY_ATTACK: {
      let orderPokemon =
        action.payload === "MIN"
          ? state.filterPokemon.sort(function (a, b) {
              if (a.attack > b.attack) {
                return 1;
              }
              if (b.attack > a.attack) {
                return -1;
              }
              return 0;
            })
          : state.filterPokemon.sort(function (a, b) {
              if (a.attack > b.attack) {
                return -1;
              }
              if (b.attack > a.attack) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        filterPokemon: orderPokemon,
      };
    }
    case GET_NAME_POKEMON: {
      return {
        ...state,
        filterPokemon: action.payload,
      };
    }
    case POST_POKEMON: {
      return {
        ...state,
      };
    }
    case GET_POKEMON_ID: {
      return {
        ...state,
        details: action.payload,
      };
    }
    case CLEAN_FILTER: {
      return {
        ...state,
        filterPokemon: action.payload,
      };
    }
    case DELETE_POKEMON: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
}

export default rootReducer;
