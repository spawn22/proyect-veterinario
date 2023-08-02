import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Button from "./Button";
import moment from "moment";
function ShiftTable({
  shifts,
  searchTerm,
  handleDeleteShifts,
  setIsFormVisible,
  setShiftToEdit,
  setShiftData,
}) {
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
                {shifts
                  ?.filter((shift) => {
                    const searchTermLower = searchTerm.toLowerCase();
                    return shift?.animal?.name
                      ?.toLowerCase()
                      ?.includes(searchTermLower);
                  })
                  ?.map((shift) => (
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
                          <AiFillEdit
                            size={25}
                            className="hover:text-blue-500"
                          />
                        </Button>
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            if (window.confirm("¿Desea eliminar este turno?")) {
                              handleDeleteShifts(e, shift?._id);
                            }
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShiftTable;
