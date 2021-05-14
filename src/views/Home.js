import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "../components/Movie/List/List";
import MultiSelect from "../components/MultiSelect/MultiSelect";
import Pagination from "../components/Pagination/Pagination";
import {
  setCategories,
  setFilteredMovies,
  setInitMovies,
  setMovies,
} from "../store/actions/app";
import { movies$ } from "../constants/movies";

const Home = () => {
  /** Page actuelle */
  const [currentPage, setCurrentPage] = useState(1);
  /** Index actuel de la page */
  const [currentIndex, setCurrentIndex] = useState(1);
  const { movies, initMovies, moviesFiltered, categories } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  /** Initialisation de la récupération des films */
  useEffect(() => {
    getMovies();
  }, []);

  /** Récupération des films via le mock json "movies" */
  function getMovies() {
    movies$
      .then((moviesList) => {
        const categories = [];
        dispatch(setMovies(moviesList));
        dispatch(setInitMovies(moviesList));
        dispatch(setFilteredMovies(moviesList));
        // Récupération des categories depuis le mock des films
        movies.map((el, i) => {
          categories.push(el.category);
        });
        // Filtrer les catégories distinctes depuis l'index de la valeur actuelle
        dispatch(
          setCategories(categories.filter((v, i, a) => a.indexOf(v) === i))
        );
      })
      .catch((err) => console.log(err));
  }

  // Nombre d'item par pages
  const itemPerPage = 4;

  // Récupère le dernier index de la liste et le mutiplie par le nombre d'item par page
  const indexOfLastItem = currentPage * itemPerPage;
  // Récupère le premier index de la liste et le soustrait par le nombre d'item par page
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  // Récupère les films de la page courante et les regroupe par le premier index et le dernier index de la liste
  const currentMovies = movies.slice(indexOfFirstItem, indexOfLastItem);
  //Création de la pagination
  const pageNumbers = [];
  // Récupère toute les pages par la longueur du tableau des films / le nombre d'item par pages
  for (let i = 1; i <= Math.ceil(movies.length / itemPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="home">
      <MultiSelect
        categories={categories}
        initMovies={initMovies}
        setCurrentIndex={setCurrentIndex}
        setCurrentPage={setCurrentPage}
        moviesFiltered={moviesFiltered}
        setMovies={setMovies}
      />
      <List movies={currentMovies} />
      <Pagination
        currentIndex={currentIndex}
        currentPage={currentPage}
        indexOfLastItem={indexOfLastItem}
        movies={movies}
        setCurrentIndex={setCurrentIndex}
        setCurrentPage={setCurrentPage}
      />
      <p className="results">Résultat total - {movies.length} films</p>
    </div>
  );
};

export default Home;
