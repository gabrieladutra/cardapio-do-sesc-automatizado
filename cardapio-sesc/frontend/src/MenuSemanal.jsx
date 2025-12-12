import { CircleArrowLeft, LucideClockFading } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

export default function MenuSemanal() {
    const [loading,setLoading] = useState(true)
    const [menuRestauranteSeg, setMenuRestauranteSeg] = useState("")
    const [menuRestauranteTer, setMenuRestauranteTer] = useState("")
    const [menuRestauranteQua, setMenuRestauranteQua] = useState("")
    const [menuRestauranteQui, setMenuRestauranteQui] = useState("")
    const [menuRestauranteSext, setMenuRestauranteSext] = useState("")

    const [menuLanchoneteSeg, setMenuLanchoneteSeg] = useState("")
    const [menuLanchoneteTer, setMenuLanchoneteTer] = useState("")
    const [menuLanchoneteQua, setMenuLanchoneteQua] = useState("")
    const [menuLanchoneteQui, setMenuLanchoneteQui] = useState("")
    const [menuLanchoneteSext, setMenuLanchoneteSext] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        async function fetchMenu() {
            const url = "https://nzn6ek54m6mq2asfgmogtrn3uy0eynrj.lambda-url.sa-east-1.on.aws/"
            const response = await fetch(url)
            setLoading(false)
            const dados = await response.json()

            setMenuRestauranteSeg(dados.restaurante[0][0].texto.S)
            setMenuRestauranteTer(dados.restaurante[1][0].texto.S)
            setMenuRestauranteQua(dados.restaurante[2][0].texto.S)
            setMenuRestauranteQui(dados.restaurante[3][0].texto.S)
            setMenuRestauranteSext(dados.restaurante[4][0].texto.S)

            setMenuLanchoneteSeg(dados.lanchonete[0][0].texto.S)
            setMenuLanchoneteTer(dados.lanchonete[1][0].texto.S)
            setMenuLanchoneteQua(dados.lanchonete[2][0].texto.S)
            setMenuLanchoneteQui(dados.lanchonete[3][0].texto.S)
            setMenuLanchoneteSext(dados.lanchonete[4][0].texto.S)
        }
        fetchMenu()
    }, [])

    return (
        <div className="w-full min-h-screen bg-white flex flex-col items-center">
            
            <h1 className="text-yellow-600 text-4xl mt-3 mb-0 p-0">MENU SEMANAL</h1>

            <h2 className="text-yellow-600 text-2xl mt-3">Restaurante</h2>

            <div className="flex flex-col md:flex-row gap-4 mt-2">
                <div className="text-center">
                    <p className="font-semibold text-blue-950">Segunda</p>
                    <div className="border-2 border-blue-950 pt-3 px-2 w-48 h-65 whitespace-pre-line rounded-md">
                        {loading ? "Carregando": menuRestauranteSeg}
                    </div>
                </div>

                <div className="text-center">
                    <p className="font-semibold text-blue-950">Terça</p>
                    <div className="border-2 border-blue-950 pt-3 px-2 w-48 h-65 whitespace-pre-line rounded-md">
                        {menuRestauranteTer}
                    </div>
                </div>

                <div className="text-center">
                    <p className="font-semibold text-blue-950">Quarta</p>
                    <div className="border-2 border-blue-950 pt-3 px-2 w-48 h-65 whitespace-pre-line rounded-md">
                        {menuRestauranteQua}
                    </div>
                </div>

                <div className="text-center">
                    <p className="font-semibold text-blue-950">Quinta</p>
                    <div className="border-2 border-blue-950 pt-3 px-2 w-48 h-65 whitespace-pre-line rounded-md">
                        {menuRestauranteQui}
                    </div>
                </div>

                <div className="text-center">
                    <p className="font-semibold text-blue-950">Sexta</p>
                    <div className="border-2 border-blue-950 pt-3 px-2 w-48 h-65 whitespace-pre-line rounded-md">
                        {menuRestauranteSext}
                    </div>
                </div>
            </div>

            <h2 className="text-yellow-600 text-2xl mt-6">Lanchonete</h2>

            <div className="flex flex-col md:flex-row gap-4 mt-2">
                <div className="text-center">
                    <p className="font-semibold text-blue-950">Segunda</p>
                    <div className="border-2 border-blue-950 pt-3 px-2 w-48 h-65 whitespace-pre-line rounded-md">
                        {menuLanchoneteSeg}
                    </div>
                </div>

                <div className="text-center">
                    <p className="font-semibold text-blue-950">Terça</p>
                    <div className="border-2 border-blue-950 pt-3 px-2 w-48 h-65 whitespace-pre-line rounded-md">
                        {menuLanchoneteTer}
                    </div>
                </div>

                <div className="text-center">
                    <p className="font-semibold text-blue-950">Quarta</p>
                    <div className="border-2 border-blue-950 pt-3 px-2 w-48 h-65 whitespace-pre-line rounded-md">
                        {menuLanchoneteQua}
                    </div>
                </div>

                <div className="text-center">
                    <p className="font-semibold text-blue-950">Quinta</p>
                    <div className="border-2 border-blue-950 pt-3 px-2 w-48 h-65 whitespace-pre-line rounded-md">
                        {menuLanchoneteQui}
                    </div>
                </div>

                <div className="text-center">
                    <p className="font-semibold text-blue-950">Sexta</p>
                    <div className="border-2 border-blue-950 pt-3 px-2 w-48 h-65 whitespace-pre-line rounded-md">
                        {menuLanchoneteSext}
                    </div>
                </div>
            </div>

            <button
                onClick={() => navigate("/")}
                className="rounded-md bg-green-700 text-white h-11 px-4 flex items-center gap-3 cursor-pointer mt-8 mb-5"
            >
                <CircleArrowLeft />
                Voltar ao Menu Diário
            </button>

        </div>
    )
}
