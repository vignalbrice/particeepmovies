import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({
  currentPage,
  currentIndex,
  setCurrentIndex,
  setCurrentPage,
  movies,
  indexOfLastItem,
}) => {
  /** Composant flèche précédente à afficher que si la page actuel est supérieur à 1 */
  const LeftArrow = () => {
    return (
      currentPage > 1 && (
        <div className="previous-arrow arrow" onClick={onPreviousArrow}>
          <FaChevronLeft />
          Précédent
        </div>
      )
    );
  };
  /** Composant flèche suivante à afficher jusqu'a ce que l'index du dernier item est inférieur a la longueur du tableau movies */
  const RightArrow = () => {
    return (
      indexOfLastItem < movies.length && (
        <div className="next-arrow arrow" onClick={onNextArrow}>
          Suivant
          <FaChevronRight />
        </div>
      )
    );
  };
  /** Incrémente la valeur de l'index et de la page actuel de 1 */
  const onNextArrow = () => {
    setCurrentIndex(currentIndex + 1);
    setCurrentPage(currentPage + 1);
  };
  /** Décrémente la valeur de l'index et de la page actuel de 1 */
  const onPreviousArrow = () => {
    setCurrentIndex(currentIndex - 1);
    setCurrentPage(currentPage - 1);
  };
  return (
    <div
      className="pagination"
      style={{
        justifyContent: currentIndex === 1 ? "flex-end" : "space-between",
      }}
    >
      <LeftArrow />
      <RightArrow />
    </div>
  );
};

export default Pagination;
