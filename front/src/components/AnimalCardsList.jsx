import AnimalCard from "./AnimalCard";

const AnimalCardsList = ({ shiftedPatients }) => {
    return (
        <ul className=" grid gap-6 md:grid md:grid-cols-1 lg:grid-cols-1 lg:gap-4 xl:grid xl:grid-cols-2 2xl:grid 2xl:grid-col-3 mt-2">
        {
          shiftedPatients.map((patient) => (
            <li key={patient.id}>
              <AnimalCard patient={patient} />
            </li>
          ))
        }
      </ul>
    );
};

export default AnimalCardsList;