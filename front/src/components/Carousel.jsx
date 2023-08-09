import { useState, useEffect } from "react";

const images = [
  {
    url: "https://res.cloudinary.com/ddyk63iig/image/upload/v1690931375/gwu-pre-health-veterinary-pathway_chjlj9.jpg",
    text: "Ofrecemos servicios de calidad para sus amigos peludos",
  },
  {
    url: "https://res.cloudinary.com/ddyk63iig/image/upload/v1690931374/0bb3c07be1cd4e38ad73866a092fee39_nid5gm.jpg",
    text: "Confíe en nosotros para cuidar de sus compañeros de cuatro patas",
  },
  {
    url: "https://res.cloudinary.com/ddyk63iig/image/upload/v1690931374/veterinarian-checks-dog-s-ears-lxcgb7vsb8kmsfl8_pf0ifz.jpg",
    text: "Nos enorgullece trabajar con  una clínica amigable para mascotas",
  },
];
function Carousel() {
  // Establece el estado de la imagen actual (currentImage) en 0 usando el Hook de estado de 'useState()'.
  const [currentImage, setCurrentImage] = useState(0);

  // Establece la imagen actual a la seleccionaday establece su índice.
  const selectedImage = images[currentImage];

  // Utiliza el Hook useEffect con un array de dependencia vacío ([]) para hacer que la función retorne una función de limpieza que detendrá el intervalo.
  useEffect(() => {
    // Ejecuta una función callback que actualiza el estado de la imagen actual cada 3000ms.
    const intervalId = setInterval(() => {
      setCurrentImage((currentImage) => (currentImage + 1) % images.length);
    }, 3000);

    // Devuelve una función de limpieza que detiene el intervalo.
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      <div className="w-full h-full inset-0 bg-cover bg-center transition-opacity duration-500 opacity-70">
        <img
          src={selectedImage.url}
          alt={selectedImage.text}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 px-4 py-6 text-zinc-950">
        <h1 className="text-3xl font-extrabold font-customFont mb-2">
          {selectedImage.text}
        </h1>
      </div>
    </div>
  );
}
export default Carousel;
