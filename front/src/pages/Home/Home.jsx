import AnimalCards from "./AnimalCards";
import AnimalForm from "./AnimalForm";

const Home = () => {
  return (
    // <main className="flex justify-center items-center h-screen max-h-[55rem]">
    <section className="container m-auto md:grid md:grid-cols-2 justify-center h-100 gap-1">
      <AnimalForm />
      <AnimalCards />
    </section>
  );
};
export default Home;
