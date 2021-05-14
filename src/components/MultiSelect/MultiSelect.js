import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setMovies } from "../../store/actions/app";

const MultiSelect = ({
  categories,
  initMovies,
  moviesFiltered,
  setCurrentIndex,
  setCurrentPage,
}) => {
  /** hooks useDispatch pour envoyer les actions */
  const dispatch = useDispatch();
  /** Création du tableau pour stocker les catégories choisies */
  const [checkedCategories, setCheckedCategories] = useState([]);
  /**
   * onChangeCategories - au changement du state récupération de la valeur et attribution de celle-ci au tableau checkedCategories
   *  @param {Object} event
   *  @param {string} event.target.value
   *
   */
  const onChangeCategories = (event) => {
    const value = event.target.value;
    // Création du tableau pour stocker les catégories
    let newArr = [];
    // Si la valeur n'est pas dans le tableau "checkedCategories" alors l'ajouter via le spread operator
    if (!checkedCategories.includes(value)) {
      newArr = [...checkedCategories, value];
    } else {
      // sinon retirer la valeur si elle existe déjà
      newArr = checkedCategories.filter((item) => item !== value);
    }
    // Puis set la valeur du tableau "newArr" dans le state checkedCategories via le setter "setCheckedCategories"
    setCheckedCategories(newArr);
    // Si la valeur "Tous" se trouve dans le tableau "newArr" vider le tableau et dispatch l'action des films initiales dans movies
    if (newArr.includes("Tous")) {
      setCheckedCategories([]);
      dispatch(setMovies(initMovies));
    } else {
      // sinon filtrer le tableau en fonction des valeurs qui se trouvent dans "newArr"
      dispatch(
        setMovies(moviesFiltered.filter((m) => newArr.indexOf(m.category) > -1))
      );
      // Puis mettre a jour la valeur de la page actuel et de l'index actuel via leur setters
      setCurrentPage(1);
      setCurrentIndex(1);
    }
  };

  if (categories.length) {
    return (
      <div className="multi-select">
        <p className="multi-select-title">Filtres</p>
        <div className="multi-select-form">
          <label
            htmlFor="Tous"
            style={{
              textDecoration: !checkedCategories.length ? "underline" : "",
              color: "#FFF",
            }}
          >
            <input
              type="checkbox"
              value="Tous"
              id="Tous"
              onChange={onChangeCategories}
            />
            <p
              style={{
                fontWeight: 600,
              }}
            >
              Tous
            </p>
          </label>
          {categories.map((cat, i) => (
            <label
              htmlFor={cat}
              key={i}
              style={{
                textDecoration:
                  checkedCategories.indexOf(cat) > -1 ? "underline" : "",
                color: "#FFF",
              }}
            >
              <input
                type="checkbox"
                name={cat}
                value={cat}
                id={cat}
                onChange={onChangeCategories}
              />
              <p
                style={{
                  fontWeight: 600,
                }}
              >
                {cat}
              </p>
            </label>
          ))}
        </div>
      </div>
    );
  } else return null;
};

export default MultiSelect;
