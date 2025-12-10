import { CircleChevronRight } from "lucide-react";
import { data, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
  
  const [menuRestaurante, setMenuRestaurante] = useState("");
  const [menuLanchonete, setMenuLanchonete] = useState("");

  useEffect(() => {
  async function fetchMenu() {
      const cors = require('cors');
      app.use(cors())
      const urlRes = "https://wjvt3d5qwbxlh425nqc6pgnd3a0ybfyi.lambda-url.sa-east-1.on.aws/"
      const responseRes = await fetch(urlRes);
      const dataRes = await responseRes.json();

      setMenuRestaurante(dataRes.restaurante)
      setMenuLanchonete(dataRes.lanchonete)
  }
  fetchMenu();
}, []);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center">
      <h1 className="text-yellow-600 text-3xl md:text-4xl mt-4">MENU DIÁRIO</h1>

      <div className="flex flex-col md:flex-row  gap-8 mt-8 items-center"> 
        <div className="flex flex-col items-center">
          <h2 className="text-blue-950 font-semibold text-center mb-2 md:text-2xl">Restaurante</h2>
          <div className="border-2 border-blue-950 rounded-md p-4 w-40 md:p-2 md:pt-10 md:w-80 md:h-80  whitespace-pre-line text-center md:text-2xl">
            {menuRestaurante}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-blue-950 font-semibold text-center mb-2 md:text-2xl">Lanchonete</h2>
          <div className="border-2 border-blue-950 rounded-md p-4 md:p-2 md:pt-10 w-40 md:w-80 md:h-80 whitespace-pre-line text-center md:text-2xl">
            {menuLanchonete}
          </div>
        </div>

        
      </div>
      <button
          onClick={() => navigate("/menu-semanal")}
          className="rounded-md bg-green-700 text-white h-11 px-4 flex items-center gap-2 cursor-pointer md:mb-8 mt-10"
        >
          <CircleChevronRight />
          Menu Semanal
        </button>
    </div>
  );
}