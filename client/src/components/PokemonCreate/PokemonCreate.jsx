import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanFilter,
  getPokemons,
  getTypes,
  postPokemon,
} from "../../redux/actions";
import styles from "./PokemonCreate.module.css";
import Swal from "sweetalert2";

export default function PokemonCreate() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.typesPokemon);
  const allPokemon = useSelector((state) => state.pokemons);
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    image: "",
    firstType: [],
    secondType: [],
    custom: true,
  });

  function handleSlider(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      isValidated({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleType1(e) {
    if (e.target.value !== "All") {
      setInput({
        ...input,
        firstType: [e.target.value],
      });
      setErrors(
        isValidated({
          ...input,
          [e.target.name]: [e.target.value],
        })
      );
    }
  }

  function handleType2(e) {
    if (e.target.value !== "All") {
      setInput({
        ...input,
        secondType: [e.target.value],
      });
      setErrors(
        isValidated({
          ...input,
          [e.target.name]: [e.target.value],
        })
      );
    }
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      isValidated({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  function handleSubmit(e) {
    e.preventDefault();
    Swal.fire({
      text: "Create Pokemon Successfully",
      icon: "success",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(postPokemon(input));
        setInput({
          name: "",
          hp: 0,
          attack: 0,
          defense: 0,
          speed: 0,
          height: 0,
          weight: 0,
          image: "",
          firstType: [],
          secondType: [],
          custom: true,
        });
        history.push("/home");
      }
    });
  }

  const uppInitial = (str) => str[0].toUpperCase() + str.slice(1);

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getPokemons());
    // console.log(isValidated(input))
    if (isValidated(input)) {
      setErrors(isValidated(input));
    }
    return () => {
      dispatch(cleanFilter());
    };
  }, []);

  let pattern =
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  let reg_exUrl =
    /(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/;
  let reg_exImg = /.*(png|jpg|jpeg|gif)$/;

  function isValidated(input) {
    let someErrors = {};

    if (!input.name) {
      someErrors.name = "Name is required";
    } else if (allPokemon.find((element) => element.name === input.name)) {
      someErrors.name = "Name already exist";
    } else if (input.firstType.length === 0) {
      someErrors.firstType = "Min 1 type is required";
    } else if (input.firstType[0] === input.secondType[0]) {
      someErrors.firstType = "Not same Type";
    } else if (!input.hp) {
      someErrors.hp = "Health Points is required";
    } else if (!input.attack) {
      someErrors.attack = "ATTACK is required";
    } else if (!input.defense) {
      someErrors.defense = "DEFENSE is required";
    } else if (!input.speed) {
      someErrors.speed = "SPEED is required";
    } else if (!input.height) {
      someErrors.height = "HEIGHT is required";
    } else if (!input.weight) {
      someErrors.weight = "WEIGHT is required";
    } else if (!input.image) {
      someErrors.image = "IMAGE is required";
    } else if (!pattern.test(input.image)) {
      someErrors.image = "Url is not valid";
    } else if (reg_exUrl.test(input.image)) {
      if (!reg_exImg.test(input.image)) {
        someErrors.image = "Not url image detected";
      }
    }
    return someErrors;
  }

  return (
    <div className={styles.container}>
      <div>
        <p className={styles.title}>Create your own Pokemon</p>
      </div>

      <form className={styles.createForm}>
        <div className={styles.inputStats}>
          <label>
            <input
              className={styles.input}
              type="text"
              value={input.name}
              name="name"
              placeholder="Name..."
              onChange={(e) => handleChange(e)}
            />
          </label>
          <h2>STATS</h2>
          {/* {HP} */}
          <label>
            HP:
            <input
              className={styles.input}
              min={0}
              max={252}
              type="number"
              value={input.hp}
              name="hp"
              onChange={(e) => handleChange(e)}
            />
          </label>
          <div>
            <input
              type="range"
              class={styles.slider}
              min={0}
              max={252}
              value={input.hp}
              name="hp"
              onChange={handleSlider}
            />
          </div>

          {/* {ATTACK} */}
          <label>
            ATTACK:
            <input
              className={styles.input}
              min={0}
              max={252}
              type="number"
              value={input.attack}
              name="attack"
              onChange={(e) => handleChange(e)}
            />
          </label>
          <div>
            <input
              type="range"
              class={styles.slider}
              min={0}
              max={252}
              value={input.attack}
              name="attack"
              onChange={handleSlider}
            />
          </div>

          {/* {DEFENSE} */}
          <label>
            DEFENSE:
            <input
              className={styles.input}
              min={0}
              max={252}
              type="number"
              value={input.defense}
              name="defense"
              onChange={(e) => handleChange(e)}
            />
          </label>
          <div>
            <input
              type="range"
              class={styles.slider}
              min={0}
              max={252}
              value={input.defense}
              name="defense"
              onChange={handleSlider}
            />
          </div>

          {/* {SPEED} */}
          <label>
            SPEED:
            <input
              className={styles.input}
              min={0}
              max={252}
              type="number"
              value={input.speed}
              name="speed"
              onChange={(e) => handleChange(e)}
            />
          </label>
          <div>
            <input
              type="range"
              class={styles.slider}
              min={0}
              max={252}
              value={input.speed}
              name="speed"
              onChange={handleSlider}
            />
          </div>

          {/* {HEIGHT} */}
          <label>
            HEIGHT:
            <input
              className={styles.input}
              min={0}
              max={252}
              type="number"
              value={input.height}
              name="height"
              onChange={(e) => handleChange(e)}
            />
          </label>
          <div>
            <input
              type="range"
              class={styles.slider}
              min={0}
              max={300}
              value={input.height}
              name="height"
              onChange={handleSlider}
            />
          </div>

          {/* {WEIGHT} */}
          <label>
            WEIGHT:
            <input
              className={styles.input}
              min={0}
              max={252}
              type="number"
              value={input.weight}
              name="weight"
              onChange={(e) => handleChange(e)}
            />
          </label>
          <div>
            <input
              type="range"
              class={styles.slider}
              min={0}
              max={300}
              value={input.weight}
              name="weight"
              onChange={handleSlider}
            />
          </div>

          <label>
            IMAGE:
            <input
              className={styles.url}
              type="text"
              value={input.image}
              name="image"
              onChange={(e) => handleChange(e)}
            />
          </label>
        </div>

        <div className={styles.optionTypes}>
          <select
            className={styles.optionTypes2}
            name="firstType"
            onChange={(e) => handleType1(e)}
          >
            <option value="All">Choose type</option>
            {types?.map((type) => (
              <option value={type.name}> {uppInitial(type.name)} </option>
            ))}
          </select>
          <select
            className={styles.optionTypes2}
            name="secondType"
            onChange={(e) => handleType2(e)}
          >
            <option value="All">Choose type</option>
            {types?.map((type) => (
              <option value={type.name}> {uppInitial(type.name)} </option>
            ))}
          </select>
          <span className={styles.type} name="types">
            {input.firstType.length > 0 &&
              input.firstType.map((element) => {
                return (
                  <div value={element} className={styles.type}>
                    {uppInitial(element)}
                    {/* <button value={element} name={"types"} onClick={ e => handleDelete(e)} >X</button> */}
                  </div>
                );
              })}
            {input.secondType.length > 0 &&
              input.secondType.map((element) => {
                return (
                  <div value={element} className={styles.type}>
                    {uppInitial(element)}
                    {/* <button value={element} name={"types"} onClick={ e => handleDelete(e)} >X</button> */}
                  </div>
                );
              })}
          </span>

          <div className={styles.error}>
            {errors.firstType && <div>{errors.firstType}</div>}
            {errors.name && <label>{errors.name}</label>}
            {errors.hp && <label>{errors.hp}</label>}
            {errors.attack && <label>{errors.attack}</label>}
            {errors.defense && <label>{errors.defense}</label>}

            {errors.speed && <label>{errors.speed}</label>}
            {errors.height && <label>{errors.height}</label>}
            {errors.weight && <label>{errors.weight}</label>}
            {errors.image && <label>{errors.image}</label>}
          </div>
          {pattern.test(input.image) && reg_exImg.test(input.image) && (
            <div>
              <img className={styles.preview} src={input.image}></img>
            </div>
          )}
        </div>

        <button
          onClick={(e) => handleSubmit(e)}
          className={
            Object.entries(errors).length === 0
              ? styles.submitButtonX
              : styles.submitButton
          }
          disabled={Object.entries(errors).length === 0 ? "" : true}
          type="submit"
        >
          <p className={styles.creates}>CREATE POKEMON</p>
        </button>
      </form>

      <Link to="/home">
        <button className={styles.homeButton}></button>
      </Link>
    </div>
  );
}
