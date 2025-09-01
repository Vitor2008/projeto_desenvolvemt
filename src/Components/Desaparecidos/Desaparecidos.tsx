import { useState } from "react";
import './Desaparecidos.css'
import Button from "../Button/Button"
import { faFilter, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import CardDesaparecidos from "../CardDesaparecidos/CardDesaparecidos";

const Desaparecidos = () => {

  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };


  return (
    <div className="desaparecidos mb-5">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex gap-2">
          <div className="flex items-center justify-center p-5 w-full">

            <div className={`rounded-lg bg-gray-200 p-5 w-full ${showFilters ? "expandido" : ""}`}>

              <div className="flex">
                <div className="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white p-5">
                  <svg viewBox="0 0 20 20" aria-hidden="true" className="pointer-events-none absolute w-5 fill-gray-500 transition">
                    <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
                  </svg>
                </div>
                <input type="text" className="w-full max-w-[160px] bg-white pl-2 text-base font-semibold outline-0" placeholder="Busque pelo nome..." id="" />
                <div className="flex gap-4 btn-card">
                  <Button text="Buscar" icon={faSearch} color='bg-color-primary' />
                  <Button text="Filtros" icon={faFilter} color='bg-color-secondary' onClick={toggleFilters} />
                </div>
              </div>

              {showFilters && (
                <div className='filtros-avancados mt-4 transition-all duration-300'>
                  <div className='flex gap-4 items-center flex-wrap'>
                    <div className='flex flex-col'>
                      <label className='font-semibold'>Idade Mínima</label>
                      <input placeholder='Ex: 18' type='number' className='bg-white pl-2 text-base outline-0' />
                    </div>
                    <div className='flex flex-col'>
                      <label className='font-semibold'>Idade Máxima</label>
                      <input placeholder='Ex: 18' type='number' className='bg-white pl-2 text-base outline-0' />
                    </div>
                    <div className='flex flex-col'>
                      <label className='font-semibold'>Sexo</label>
                      <select className='bg-white pl-2 text-base outline-0'>
                        <option value="-1">Selecione o sexo</option>
                        <option value="desaparecida">Masculino</option>
                        <option value="localizada">Feminina</option>
                      </select>
                    </div>
                    <div className='flex flex-col'>
                      <label className='font-semibold'>Status</label>
                      <select className='bg-white pl-2 text-base outline-0'>
                        <option value="-1">Selecione o status</option>
                        <option value="desaparecida">Desaparecida</option>
                        <option value="localizada">Localizada</option>
                      </select>
                    </div>
                    <Button text="Limpar Filtros" icon={faTrash} color='bg-color-secondary' />
                  </div>
                </div>
              )
              }
            </div>

          </div>
        </div>
      </div>

      <div className="mt-4">
        <h1 className='text-2xl font-bold text-foreground mb-5'>Pessoas Desaparecidas</h1>
        <div className="container-desaparecidos grid grid-cols-1 md:grid-cols-3">
          <CardDesaparecidos id='1' img='https://tse3.mm.bing.net/th/id/OIP.AWQeNdG34k2eI5lmqopI0gHaKe?rs=1&pid=ImgDetMain&o=7&rm=3' nome='Teste Um' status='Desaparecida' data='01/01/2001' local='Cuiabá, MT' />
          <CardDesaparecidos id='2' img='https://tse3.mm.bing.net/th/id/OIP.AWQeNdG34k2eI5lmqopI0gHaKe?rs=1&pid=ImgDetMain&o=7&rm=3' nome='Teste Um' status='Localizada' data='01/01/2001' local='Cuiabá, MT' />
          <CardDesaparecidos id='3' img='https://tse3.mm.bing.net/th/id/OIP.AWQeNdG34k2eI5lmqopI0gHaKe?rs=1&pid=ImgDetMain&o=7&rm=3' nome='Teste Um' status='Desaparecida' data='01/01/2001' local='Cuiabá, MT' />
        </div>
      </div>

    </div>
  )
}

export default Desaparecidos
