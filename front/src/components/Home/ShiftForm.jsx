import { useState } from 'react';


const ShiftForm = () => {
  const [shift, setShift] = useState({
    name: '',
    owner: '',
    date: '',
    hour: '',
    description: '',
  });
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    setShift({
      ...shift,
      [e.target.name]: e.target.value,
    });
  };

  const { name, owner, date, hour, description } = shift;

  const handleSubmit = (e) => {
    e.preventDefault();
    //Validar
    if (
      !name.trim() ||
      !owner.trim() ||
      !date.trim() ||
      !hour.trim() ||
      !description.trim()
    ) {
      setError(true);
      return;
    }

    setError(false);

    //Reinciar el form
    setShift({
      name: '',
      owner: '',
      date: '',
      hour: '',
      description: '',
    });
  };
  return (
    <div className="flex justify-center items-center h-screen max-h-[55rem]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md px-8 py-6 bg-white rounded-lg shadow-md"
        >
        {error ? <p className='w-full bg-black'>Todos los campos son obligatorios</p> : null}
        <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">
          Crear Cita
        </h2>
        <label className='text-black'>
          Nombre Mascota
          <input
            type="text"
            name="name"
            className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nombre Mascota"
            onChange={handleChange}
            value={name}
          />
        </label>
        <label className='text-black'>
          Nombre Dueño
          <input
            type="text"
            name="owner"
            className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nombre Dueño de la Mascota"
            onChange={handleChange}
            value={owner}
          />
        </label>
        <label className='text-black'>
          Fecha{' '}
          <input
            type="date"
            name="date"
            className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            value={date}
          />
        </label>

        <label className='text-black'>
          Hora
          <input
            type="time"
            name="hour"
            className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            value={hour}
          />
        </label>
        <label className='text-black'>
          Síntomas
          <textarea
            name="description"
            className="w-full px-4 py-2 bg-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            value={description}
          ></textarea>
        </label>
        <button
          type="submit"
          className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Agregar Cita
        </button>
      </form>
    </div>
  );
};
export default ShiftForm;
