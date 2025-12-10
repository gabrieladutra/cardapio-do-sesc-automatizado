import { CircleArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
    import { useEffect, useState } from "react";

export default function MenuSemanal() {
    const [menuRestaurante, setMenuRestaurante] = useState("");
    const [menuLanchonete, setMenuLanchonete] = useState("");
    const navigate = useNavigate()
    
    useEffect(() => {
    async function fetchMenu() {
        const url= "https://nzn6ek54m6mq2asfgmogtrn3uy0eynrj.lambda-url.sa-east-1.on.aws/"
        const response = await fetch(url);
        const dados = await response.json();
    
        setMenuRestaurante(dados.restaurante[0][0].texto.S);
        setMenuLanchonete(dados.lanchonete[0][0].texto.S);
}
    fetchMenu();
}, []);
    
   let cardapio = "Bibles"

    return (
        <div className="w-full min-h-screen bg-white flex flex-col items-center">

            <h1 className="text-yellow-600 text-2xl mt-4 md:text-3xl">MENU SEMANAL</h1>

            <div className="flex flex-col md:flex-row gap-8 mt-8 items-center">

                <div className="flex flex-col items-center">
                    <h2 className="text-blue-950 font-semibold mb-2 text-center md:text-lg">Segunda-feira</h2>
                    <div className="border-2 border-blue-950 rounded-md p-2 w-40 whitespace-pre-line text-center md:h-70 md:w-40 md:text-md">
                        {menuRestaurante}
                    </div>
                    <div className="border-2 border-blue-950 rounded-md p-2 mt-8 w-40 whitespace-pre-line text-center md:h-70 md:w-40 md:text-md">
                        {menuRestaurante}
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <h2 className="text-blue-950 font-semibold mb-2 text-center md:text-lg">Terça-feira</h2>
                    <div className="border-2 border-blue-950 rounded-md p-4 w-40 whitespace-pre-line text-center md:h-60 md:w-40 md:text-lg">
                        {cardapio}
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <h2 className="text-blue-950 font-semibold mb-2 text-center md:text-lg">Quarta-feira</h2>
                    <div className="border-2 border-blue-950 rounded-md p-4 w-40 whitespace-pre-line text-center md:h-60 md:w-40 md:text-lg">
                        {cardapio}
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <h2 className="text-blue-950 font-semibold mb-2 text-center md:text-lg">Quinta-feira</h2>
                    <div className="border-2 border-blue-950 rounded-md p-4 w-40 whitespace-pre-line text-center md:h-60 md:w-40 md:text-lg">
                        {cardapio}
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <h2 className="text-blue-950 font-semibold mb-2 text-center md:text-lg">Sexta-feira</h2>
                    <div className="border-2 border-blue-950 rounded-md p-4 w-40 whitespace-pre-line text-center md:h-60 md:w-40 md:text-lg">
                        {cardapio}
                    </div>
                </div>
            </div>
            <button
                    onClick={() => navigate("/")}
                    className="rounded-md bg-green-700 text-white h-11 px-4 flex items-center gap-2 cursor-pointer mt-10 mb-4"
                >
                    <CircleArrowLeft />
                    Voltar ao Menu Diário
                </button>
        </div>
    );
}