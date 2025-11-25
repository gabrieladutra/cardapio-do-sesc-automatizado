import { CircleChevronRight } from 'lucide-react';
import './App.css'
function App() {

  let cardápio = "Strogonoff de Frango \n Batata Bolinha \n Arroz e Feijão \n Saladas \n Frutas"
  return (
    <>
      <div className="w-full min-h-screen bg-white flex flex-col items-center">

        <h1 className="text-yellow-600 text-center text-2xl mt-4">MENU</h1>

        <div className="flex flex-col gap-8 mt-8 text-center">

          <h2 className="text-blue-950 font-semibold text-center">Restaurante</h2>
          <div className="border-2 border-blue-950 rounded-md p-4 ml-4 w-40 whitespace-pre-line">
            {cardápio}
          </div>

          <h2 className="text-blue-950 font-semibold text-center">Lanchonete</h2>
          <div className="border-2 border-blue-950 rounded-md p-4 ml-4 w-40 whitespace-pre-line">
            {cardápio}
          </div>


          <button className='rounded-md border-2 bg-green-700 text-white h-10 w-50 mt-0 flex text-center p-2'>
            <CircleChevronRight />
            <h3 className='w-full'>Menu Semanal</h3>
          </button>
        </div>

      </div>
    </>
  )
}

export default App
