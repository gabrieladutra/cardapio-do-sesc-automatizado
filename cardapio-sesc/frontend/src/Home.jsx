import { CircleChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export default function Home() {
  const [menuRestaurante, setMenuRestaurante] = useState("")
  const [menuLanchonete, setMenuLanchonete] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
  async function fetchMenu() {
      const url= "https://wjvt3d5qwbxlh425nqc6pgnd3a0ybfyi.lambda-url.sa-east-1.on.aws/"
      const response = await fetch(url)
      const dados = await response.json()

      setMenuRestaurante(dados.restaurante)
      setMenuLanchonete(dados.lanchonete)
  }
  fetchMenu()
}, [])

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center">
      <h1 className="text-yellow-600 text-2xl mt-2 md:text-4xl md:mt-4">MENU DIÁRIO</h1>
      <h1 className="text-yellow-800 text-lg semibold mt- md:text-2xl mt-2 md:mt-4">{menuRestaurante.substring(0,10)}</h1>

      <div className="flex flex-col md:flex-row gap-3 md:gap-8 mt-2 md:mt-10 "> 
        <div className="flex flex-col items-center">
          <h2 className="text-blue-950 font-semibold text-center pt-0 md:text-2xl">Restaurante</h2>
          <div className="border-2 border-blue-950 rounded-md w-40 md:w-70 md:h-67 whitespace-pre-line text-center md:text-lg">
            {menuRestaurante.substring(10)}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-blue-950 font-semibold text-center md:text-2xl">Lanchonete</h2>
          <div className="border-2 border-blue-950 rounded-md w-40 h-40 md:w-70 md:h-67 whitespace-pre-line text-center md:text-lg">
            {menuLanchonete.substring(10)}
          </div>
        </div>

        
      </div>
      <button
          onClick={() => navigate("/menu-semanal")}
          className="rounded-md bg-green-700 text-white h-11 px-4 flex items-center gap-2 cursor-pointer mt-5 md:mb-8 md:mt-10"
        >
          <CircleChevronRight />
          Menu Semanal
        </button>
    </div>
  )
}