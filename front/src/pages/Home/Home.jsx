import AnimalCards from "./AnimalCards";
import AnimalForm from "./AnimalForm";

const Home = () => {
  return (
    <section className="container m-auto grid-flow-row md:grid  md:grid-cols-2 md:gap-4 lg:grid-cols-2 h-100 gap-1">
      <AnimalForm />
      <AnimalCards />
    </section>
  );
};
export default Home;
