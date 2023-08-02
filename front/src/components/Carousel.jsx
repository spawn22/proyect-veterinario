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
  const [currentImage, setCurrentImage] = useState(0);
  const selectedImage = images[currentImage];
  console.log(selectedImage);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((currentImage) => (currentImage + 1) % images.length);
    }, 3000);

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
        <div className="absolute bottom-0 left-0 right-0 px-4 py-6 text-zinc-950">
          <h1 className="text-3xl font-extrabold font-customFont mb-2">{selectedImage.text}</h1>
        </div>
      </div>
    </div>
  );
}
export default Carousel;
