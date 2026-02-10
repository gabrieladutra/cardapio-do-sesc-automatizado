import { CircleArrowLeft, Loader } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

async function fetchMenu() {
  const response = await fetch(
    "https://nzn6ek54m6mq2asfgmogtrn3uy0eynrj.lambda-url.sa-east-1.on.aws/"
  )
  if (!response.ok) {
    throw new Error("Erro ao buscar menu")
  }
  return response.json()
}

function getTexto(data, tipo, dia) {
  const texto = data?.[tipo]?.[dia]?.[0]?.texto?.S ?? ""

  return texto
    .replace(/\n\s*\n+/g, "\n") 
    .trim()
}
export default function MenuSemanal() {
  const navigate = useNavigate()

  const { data, isLoading, isError } = useQuery(
    {
      queryKey: ["menu-semanal"],
      queryFn: fetchMenu,
    })

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center">
      <h1 className="text-yellow-600 text-4xl mt-3 mb-0 p-0">
        MENU SEMANAL
      </h1>

      <h1 className="text-red-600 text-4xl">
        {isError ? "Sistema em manutenção, volte mais tarde." : ""}
      </h1>

      <h2 className="text-yellow-600 text-2xl mt-3">
        Restaurante
      </h2>

      <div className="flex flex-col md:flex-row gap-4 mt-2">
        <div className="text-center">
          <p className="font-semibold text-blue-950">Segunda</p>
          <div className="border-2 border-blue-950 pt-3 px-2 w-48 h-70 whitespace-pre-line rounded-md">
            {isLoading ? (
              <Loader
                strokeWidth={0.75}
                size="32"
                className="md:w-15 md:h-15 mt-20 ml-15 md:mt-16 md:ml-16 md:mr-30 animate-spin [animation-duration:5s] text-gray-400"
              />
            ) : (
              getTexto(data, "restaurante", 0)
            )}
          </div>
        </div>
        <div className="text-center">
          <p className="font-semibold text-blue-950">Terça</p>
          <div className="border-2 border-blue-950 pt-3 px-2 w-48 h-70 whitespace-pre-line rounded-md">
            {isLoading ? (
              <Loader
                strokeWidth={0.75}
                size="32"
                className="md:w-15 md:h-15 mt-20 md:mt-16 ml-15 md:ml-16 md:mr-30 animate-spin [animation-duration:5s] text-gray-400"
              />
            ) : (
              getTexto(data, "restaurante", 1)
            )}
          </div>
        </div>

        <div className="text-center">
          <p className="font-semibold text-blue-950">Quarta</p>
          <div className="border-2 border-blue-950 pt-3 px-2 w-48 h-70 whitespace-pre-line rounded-md">
            {isLoading ? (
              <Loader
                strokeWidth={0.75}
                size="32"
                className="md:w-15 md:h-15 mt-20 md:mt-16 ml-15 md:ml-16 md:mr-30 animate-spin [animation-duration:5s] text-gray-400"
              />
            ) : (
              getTexto(data, "restaurante", 2)
            )}
          </div>
        </div>

        <div className="text-center">
          <p className="font-semibold text-blue-950">Quinta</p>
          <div className="border-2 border-blue-950 pt-3 px-2 w-48 h-70 whitespace-pre-line rounded-md">
            {isLoading ? (
              <Loader
                strokeWidth={0.75}
                size="32"
                className="md:w-15 md:h-15 mt-20 md:mt-16 ml-15 md:ml-16 md:mr-30 animate-spin [animation-duration:5s] text-gray-400"
              />
            ) : (
              getTexto(data, "restaurante", 3)
            )}
          </div>
        </div>

        <div className="text-center">
          <p className="font-semibold text-blue-950">Sexta</p>
          <div className="border-2 border-blue-950 pt-3 px-2 w-48 h-70 whitespace-pre-line rounded-md">
            {isLoading ? (
              <Loader
                strokeWidth={0.75}
                size="32"
                className="md:w-15 md:h-15 mt-20 md:mt-16 ml-15 md:ml-16 md:mr-30 animate-spin [animation-duration:5s] text-gray-400"
              />
            ) : (
              getTexto(data, "restaurante", 4)
            )}
          </div>
        </div>
      </div>

      <h2 className="text-yellow-600 text-2xl mt-6">
        Lanchonete
      </h2>

      <div className="flex flex-col md:flex-row gap-4 mt-2">
        <div className="text-center">
          <p className="font-semibold text-blue-950">Segunda</p>
          <div className="border-2 border-blue-950 pt-3 px-2 w-48 h-70 whitespace-pre-line rounded-md">
            {isLoading ? (
              <Loader
                strokeWidth={0.75}
                size="32"
                className="md:w-15 md:h-15 mt-20 md:mt-16 ml-15 md:ml-16 md:mr-30 animate-spin [animation-duration:5s] text-gray-400"
              />
            ) : (
              getTexto(data, "lanchonete", 0)
            )}
          </div>
        </div>

        <div className="text-center">
          <p className="font-semibold text-blue-950">Terça</p>
          <div className="border-2 border-blue-950 pt-3 px-2 w-48 h-70 whitespace-pre-line rounded-md">
            {isLoading ? (
              <Loader
                strokeWidth={0.75}
                size="32"
                className="md:w-15 md:h-15 mt-20 md:mt-16 ml-15 md:ml-16 md:mr-30 animate-spin [animation-duration:5s] text-gray-400"
              />
            ) : (
              getTexto(data, "lanchonete", 1)
            )}
          </div>
        </div>

        <div className="text-center">
          <p className="font-semibold text-blue-950">Quarta</p>
          <div className="border-2 border-blue-950 pt-3 px-2 w-48 h-70 whitespace-pre-line rounded-md">
            {isLoading ? (
              <Loader
                strokeWidth={0.75}
                size="32"
                className="md:w-15 md:h-15 mt-20 md:mt-16 ml-15 md:ml-16 md:mr-30 animate-spin [animation-duration:5s] text-gray-400"
              />
            ) : (
              getTexto(data, "lanchonete", 2)
            )}
          </div>
        </div>

        <div className="text-center">
          <p className="font-semibold text-blue-950">Quinta</p>
          <div className="border-2 border-blue-950 pt-3 px-2 w-48 h-70 whitespace-pre-line rounded-md">
            {isLoading ? (
              <Loader
                strokeWidth={0.75}
                size="32"
                className="md:w-15 md:h-15 mt-20 md:mt-16 ml-15 md:ml-16 md:mr-30 animate-spin [animation-duration:5s] text-gray-400"
              />
            ) : (
              getTexto(data, "lanchonete", 3)
            )}
          </div>
        </div>

        <div className="text-center">
          <p className="font-semibold text-blue-950">Sexta</p>
          <div className="border-2 border-blue-950 pt-3 px-2 w-48 h-70 whitespace-pre-line rounded-md">
            {isLoading ? (
              <Loader
                strokeWidth={0.75}
                size="32"
                className="md:w-15 md:h-15 mt-20 md:mt-16 ml-15 md:ml-16 md:mr-30 animate-spin [animation-duration:5s] text-gray-400"
              />
            ) : (
              getTexto(data, "lanchonete", 4)
            )}
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
