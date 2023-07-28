const AnimalCard = ({patient}) => {
  const { name, owner, type, age, gender, breed, weight } = patient;

  return (
    <div className="bg-zinc-500 p-2">
    <p>
      Mascota: <span>{name}</span>
    </p>
    <p>
      Propietario: <span>{owner}</span>
    </p>
    <p>
      Tipo: <span>{type}</span>
    </p>
    <p>
      Edad: <span>{age}</span>
    </p>
    <p>
      Género: <span>{gender}</span>
    </p>
    <p>
      Raza: <span>{breed}</span>
    </p>
    <p>
      Peso: <span>{weight}</span>
    </p>
    <button
      className="bg-red-600 text-zinc-50 p-2 "
      onClick={() => deletePatient(patient.id)}
    >
      Eliminar &times;
    </button>
  </div>
  )
}
export default AnimalCard