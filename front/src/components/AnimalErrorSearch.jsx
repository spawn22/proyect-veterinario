import noResults from "../Assets/noResults.webp";
const AnimalErrorSearch = () => {
  return (
    <article className="my-3.5 text-zinc-50 mb-4 font-bold text-2xl md:flex flex-col justify-center align-middle mx-auto">
      <h4>No se encontraron animales, porfavor revisa los <span className="text-sky-300">FILTROS</span></h4>
      <picture className="text-center flex justify-center">
      <img src={noResults} alt="no results" className=""/>
      </picture>
    </article>
  );
};

export default AnimalErrorSearch;
