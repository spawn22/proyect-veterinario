import AnimalCards from "./AnimalCards";
import AnimalForm from "./AnimalForm";

const Home = () => {
  return (
    // <main className="flex justify-center items-center h-screen max-h-[55rem]">
    <main className="container m-auto md:grid md:grid-cols-2 justify-center h-screen max-h-[55rem] gap-1">
      <AnimalForm />
      <AnimalCards />
    </main>
  );
};
export default Home;
