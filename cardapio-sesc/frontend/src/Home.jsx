import { CircleChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    let cardapio = "Strogonoff de Frango\nBatata Bolinha\nArroz e Feijão\nSaladas\nFrutas";

    return (
        <div className="w-full min-h-screen bg-white flex flex-col items-center">

            <h1 className="text-yellow-600 text-2xl mt-4">MENU</h1>

            <div className="flex flex-col gap-8 mt-8 text-center">

                <h2 className="text-blue-950 font-semibold">Restaurante</h2>
                <div className="border-2 border-blue-950 rounded-md p-4 w-40 whitespace-pre-line">
                    {cardapio}
                </div>

                <h2 className="text-blue-950 font-semibold">Lanchonete</h2>
                <div className="border-2 border-blue-950 rounded-md p-4 w-40 whitespace-pre-line">
                    {cardapio}
                </div>

                


                <button
                    onClick={() => navigate("/menu-semanal")}
                    className="rounded-md bg-green-700 text-white h-10 px-4 flex items-center gap-2"
                >
                    <CircleChevronRight />
                    Menu Semanal
                </button>


            </div>
        </div>
    );
}