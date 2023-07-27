import { useProfileStore } from "../../store/profile";
import { useEffect } from "react";
function Profile() {
  const getProfileData = useProfileStore((state) => state.getProfileData);
  const profile = useProfileStore((state) => state.profile);

  useEffect(() => {
    getProfileData();
  }, [getProfileData]);

  return (
    <div className="flex items-center h-screen w-full justify-center">
      <div className="max-w-xl">
        <div className="bg-white shadow-xl rounded-lg py-[1rem] px-[1rem]">
          <div className="photo-wrapper p-2">
            <img
              className="w-[70%] h-[70%] rounded-full mx-auto"
              src={profile.image}
              alt={profile.name}
            />
          </div>
          <div className="p-2 ">
            <h3 className="text-center text-3xl text-gray-900 font-bold leading-8">
              Informacion Personal
            </h3>
            <div className="text-center text-gray-400  font-semibold">
              <p>Veterinario</p>
            </div>
            <table className="text-lg my-4 flex justify-center">
              <tbody>
                <tr>
                  <td className=" text-[#5f6c7b] font-bold">Nombre:</td>
                  <td className="px-2 py-2 text-gray-900 font-mono">
                    {profile.name}
                  </td>
                </tr>
                <tr>
                  <td className="px-2 py-2 text-[#5f6c7b] font-bold">
                    Apellido:
                  </td>
                  <td className="px-2 py-2 text-gray-900 font-mono ">
                    {profile.lastName}
                  </td>
                </tr>
                <tr>
                  <td className="px-2 py-2 text-[#5f6c7b] font-bold">
                    Usuario:
                  </td>
                  <td className="px-2 py-2 text-gray-900 font-mono">
                    {profile.username}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="text-center mt-10">
              <a
                className="text-lg text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium"
                href="#"
              >
                Volver Atras
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
