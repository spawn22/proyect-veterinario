import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Button from "./Button";
import moment from "moment";
import { useEffect, useState } from "react";
import PaginationTable from "./PaginationTable";
function ShiftTable({
  shifts,
  searchTerm,
  handleDeleteShifts,
  setIsFormVisible,
  setShiftToEdit,
  setShiftData,
}) {
  // Definir currentPage como 1 utilizando el Hook de estado de 'useState()'
  const [currentPage, setCurrentPage] = useState(1);

  // Definir el número de elementos por página como 5.
  const ITEMS_PER_PAGE = 5;

  // Utiliza el método 'filter' para filtrar los turnos que coinceden con la búsqueda `searchTerm` y la fecha actual.
  const filteredShifts = shifts
    ?.filter((shift) => {
      const searchTermLower = searchTerm.toLowerCase();
      // Incluye los turnos que coinciden con el término de búsqueda.
      return shift?.animal?.name?.toLowerCase()?.includes(searchTermLower);
    })
    .filter((shift) => {
      const currentDate = moment().startOf("day");
      const shiftDate = moment(shift.date, "YYYY-MM-DD").startOf("day");

      // Devuelve solo los turnos cuya fecha es igual o posterior al día actual.
      return currentDate.isSameOrBefore(shiftDate);
    });

  // Utiliza el método 'slice' para seleccionar y asignar los turnos que corresponden a la página actual.
  const shiftedShifts = filteredShifts?.slice(
    currentPage > 1 ? (currentPage - 1) * ITEMS_PER_PAGE : 0,
    currentPage > 1 ? currentPage * ITEMS_PER_PAGE : ITEMS_PER_PAGE
  );

  // Calcular el número total de páginas utilizando 'Math.ceil()' a partir de la longitud total de turnos.
  const totalPages = Math.ceil(
    (filteredShifts?.length - ITEMS_PER_PAGE) / ITEMS_PER_PAGE + 1
  );

  // Comprueba si el número de turnos en la página actual es cero; si es así, establece la página en la página anterior.
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (shiftedShifts.length === 0) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage, shiftedShifts]);

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-left text-sm font-light bg-blue-500">
              <thead className="h-10">
                <tr className="bg-[#fffffe] text-bold text-base  text-[#094067]">
                  <th scope="col" className="px-6 py-4">
                    Paciente
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Dueño
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Raza
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Fecha
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Hora
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Descripcion
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {shiftedShifts?.map((shift) => (
                  <tr
                    key={shift?._id ?? ""}
                    className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                  >
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {shift?.animal.name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {shift?.animal?.owner}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {shift?.animal?.breed}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {moment(shift?.date).utc().format("DD/MM/YYYY")}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {shift?.start_time}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {shift?.description}
                    </td>
                    <td>
                      <Button
                        onClick={() => {
                          setIsFormVisible(true);
                          setShiftToEdit(shift);
                          setShiftData({
                            date: shift?.date,
                            start_time: shift?.start_time,
                            selectPatient: shift?.animal._id,
                            description: shift?.description,
                          });
                        }}
                        className="mr-10"
                      >
                        <AiFillEdit size={25} className="hover:text-blue-500" />
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();

                          handleDeleteShifts(e, shift?._id);
                        }}
                        className="mr-2"
                      >
                        <AiFillDelete
                          size={25}
                          className="hover:text-red-500"
                        />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredShifts?.length > ITEMS_PER_PAGE && (
              <PaginationTable
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShiftTable;
