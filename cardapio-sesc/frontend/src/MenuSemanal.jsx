import { CircleArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
    import { useEffect, useState } from "react";

function capitalized(word) {
    if (!word) return "";
    return word.charAt(0).toUpperCase() + word.slice(1);
}


export default function MenuSemanal() {
    const [menuRestauranteSeg, setMenuRestauranteSeg] = useState("");
     const [menuRestauranteTer, setMenuRestauranteTer] = useState("");
     const [menuRestauranteQua, setMenuRestauranteQua] = useState("");
     const [menuRestauranteQui, setMenuRestauranteQui] = useState("");
     const [menuRestauranteSext, setMenuRestauranteSext] = useState("");

    
    const [menuLanchoneteSeg, setMenuLanchoneteSeg] = useState("");
     const [menuLanchoneteTer, setMenuLanchoneteTer] = useState("");
     const [menuLanchoneteQua, setMenuLanchoneteQua] = useState("");
     const [menuLanchoneteQui, setMenuLanchoneteQui] = useState("");
     const [menuLanchoneteSext, setMenuLanchoneteSext] = useState("");


    const navigate = useNavigate()
    
    useEffect(() => {
    async function fetchMenu() {
        const url= "https://nzn6ek54m6mq2asfgmogtrn3uy0eynrj.lambda-url.sa-east-1.on.aws/"
        const response = await fetch(url);
        const dados = await response.json();
    
        setMenuRestauranteSeg(dados.restaurante[0][0].texto.S);
        setMenuRestauranteTer(dados.restaurante[1][0].texto.S);
        setMenuRestauranteQua(dados.restaurante[2][0].texto.S);
        setMenuRestauranteQui(dados.restaurante[3][0].texto.S);
        setMenuRestauranteSext(dados.restaurante[4][0].texto.S)

        setMenuLanchoneteSeg(dados.lanchonete[0][0].texto.S);
        setMenuLanchoneteTer(dados.lanchonete[1][0].texto.S);
        setMenuLanchoneteQua(dados.lanchonete[2][0].texto.S);
        setMenuLanchoneteQui(dados.lanchonete[3][0].texto.S);
        setMenuLanchoneteSext(dados.lanchonete[4][0].texto.S)
}
    fetchMenu();
}, []);
    
   let cardapio = "Bibles"

    return (
        <div className="w-full min-h-screen bg-white flex flex-col items-center">

            <h1 className="text-yellow-600 text-2xl mt-4 md:text-4xl">MENU SEMANAL</h1>
            <h1 className="text-yellow-600 text-2xl mt-8 md:text-2x1">Restaurante</h1>

            <div className="flex flex-col md:flex-row gap-8 mt-8 items-center">

                <div className="flex flex-col items-center">
                    <h2 className="text-blue-950 font-semibold mb-2 text-center md:text-lg">Segunda-feira</h2>
                    <div className="border-2 border-blue-950 rounded-md pt-2 px-2 w-40 whitespace-pre-line text-center md:h-60 md:w-80 md:text-lg">
                        {menuRestauranteSeg}
                    </div>
                    <div className="border-2 border-blue-950 rounded-md pt-2 px-2 mt-20 w-40 whitespace-pre-line text-center md:h-60 md:w-80 md:text-lg">
                        {menuLanchoneteSeg}
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <h2 className="text-blue-950 font-semibold mb-2 text-center md:text-lg">Terça-feira</h2>
                    <div className="border-2 border-blue-950 rounded-md pt-2 px-2 w-40 whitespace-pre-line text-center md:h-60 md:w-80 md:text-lg">
                        {menuRestauranteTer}
                    </div>
                    <div className="border-2 border-blue-950 rounded-md pt-2 px-2 mt-20 w-40 whitespace-pre-line text-center md:h-60 md:w-80 md:text-lg">
                        {menuLanchoneteTer}
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <h2 className="text-blue-950 font-semibold mb-2 text-center md:text-lg">Quarta-feira</h2>
                    <div className="border-2 border-blue-950 rounded-md pt-2 px-2 w-40 whitespace-pre-line text-center md:h-60 md:w-80 md:text-lg">
                    {menuRestauranteQua}
                    </div>
                    <div className="border-2 border-blue-950 rounded-md pt-2 px-2 mt-20 w-40 whitespace-pre-line text-center md:h-60 md:w-80 md:text-lg">
                        {menuLanchoneteQua}
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <h2 className="text-blue-950 font-semibold mb-2 text-center md:text-lg">Quarta-feira</h2>
                    <div className="border-2 border-blue-950 rounded-md pt-2 px-2 w-40 whitespace-pre-line text-center md:h-60 md:w-80 md:text-lg">
                    {menuRestauranteQui}
                    </div>
                    <div className="border-2 border-blue-950 rounded-md pt-2 px-2 mt-20 w-40 whitespace-pre-line text-center md:h-60 md:w-80 md:text-lg">
                        {menuLanchoneteQui}
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <h2 className="text-blue-950 font-semibold mb-2 text-center md:text-lg">Quarta-feira</h2>
                    <div className="border-2 border-blue-950 rounded-md pt-2 px-2 w-40 whitespace-pre-line text-center md:h-60 md:w-80 md:text-lg">
                    {menuRestauranteSext}
                    </div>
                    <div className="border-2 border-blue-950 rounded-md pt-2 px-2 mt-20 w-40 whitespace-pre-line text-center md:h-60 md:w-80 md:text-lg">
                        {menuLanchoneteSext}
                    </div>
                </div>

            </div>
            
            <button
                    onClick={() => navigate("/")}
                    className="rounded-md bg-green-700 text-white h-11 px-4 flex items-center gap-3 cursor-pointer mt-10 mb-4"
                >
                    <CircleArrowLeft />
                    Voltar ao Menu Diário
                </button>
        </div>
    );
}