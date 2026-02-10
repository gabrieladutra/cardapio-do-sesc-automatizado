import { CircleChevronRight, Loader, CircleX } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

async function fetchMenu() {
  const response = await fetch(
    "https://wjvt3d5qwbxlh425nqc6pgnd3a0ybfyi.lambda-url.sa-east-1.on.aws/"
  )

  if (!response.ok) {
    throw new Error("Erro ao buscar menu")
  }

  return response.json()
}

export default function Home() {
  const navigate = useNavigate()

  const { data, isLoading, isError } = useQuery({
    queryKey: ["menu-diario"],
    queryFn: fetchMenu,
  })

  let dataTexto = ""
  let menuRestaurante = ""
  let menuLanchonete = ""

  if (data && data.restaurante) {
    dataTexto = data.restaurante.substring(0, 10)
    menuRestaurante = data.restaurante.substring(10).replace(/\n\s*\n+/g, "\n").trim() 
  }

  if (data && data.lanchonete) {
    menuLanchonete = data.lanchonete.substring(10).replace(/\n\s*\n+/g, "\n").trim()
  }

  if (isError) {
    return (
      <div className="border-2 rounded-md border-gray-400 text-gray-800 pt-6 mt-20 h-60 w-60 flex gap-4 flex-col text-center items-center">
        <div className="text-xl">Site em manutenção</div>
        <div className="text-lg">Por favor, volte mais tarde!</div>
        <CircleX color="#ff2929" size={50} strokeWidth={0.75} />
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center">
      <h1 className="text-yellow-600 text-2xl mt-2 md:text-4xl md:mt-4">
        MENU DIÁRIO
      </h1>

      {!isLoading && dataTexto && (
        <h1 className="text-yellow-800 text-lg md:text-2xl mt-2 md:mt-4">
          {dataTexto}
        </h1>
      )}

      <div className="flex flex-col md:flex-row gap-3 md:gap-8 mt-2 md:mt-10">
        <div className="flex flex-col items-center">
          <h2 className="text-blue-950 font-semibold md:text-2xl md:pb-3">
            Restaurante
          </h2>
          <div className="border-2 border-blue-950 rounded-md w-50 h-70 md:w-70 md:h-70 md:pt-3 whitespace-pre-line text-center md:text-lg">
            {isLoading ? (
              <Loader
                size={32}
                strokeWidth={0.75}
                className="animate-spin mt-20 ml-20 md:ml-28 text-gray-400"
              />
            ) : (
              menuRestaurante
            )}
          </div>
        </div>

    
        <div className="flex flex-col items-center">
          <h2 className="text-blue-950 font-semibold md:text-2xl md:pb-3">
            Lanchonete
          </h2>
          <div className="border-2 border-blue-950 rounded-md w-50 h-70 md:w-70 md:h-70 md:pt-3 whitespace-pre-line text-center md:text-lg">
            {isLoading ? (
              <Loader
                size={32}
                strokeWidth={0.75}
                className="animate-spin mt-20 ml-20 md:ml-28 text-gray-400"
              />
            ) : (
              menuLanchonete
            )}
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate("/menu-semanal/")}
        className="rounded-md bg-green-700 text-white h-11 px-4 flex items-center gap-2 cursor-pointer mt-5 md:mb-8 md:mt-10 md:w-60 md:justify-center md:text-lg"
      >
        <CircleChevronRight/>
        Menu Semanal
      </button>
    </div>
  )
}
