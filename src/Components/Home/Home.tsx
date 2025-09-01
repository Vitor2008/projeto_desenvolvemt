import { Carousel, initTWE } from "tw-elements";
import { useEffect } from "react";
import { Link } from 'react-scroll';
import "./Home.css"
import Button from "../Button/Button";
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Home = () => {

  useEffect(() => {
    initTWE({ Carousel });
  }, []);

  return (
    <div className="home site-container">
      <div className="home-text">
        <h1 className="font-bold text-white-800 leading-tight">
          Conectamos pessoas e informações para <span>localizar desaparecidos</span> e reunir famílias.
        </h1>
        <p className="text-xl">Cada compartilhamento aumenta as
          chances de reencontro. Junte-se a essa missão e contribua para trazer esperança.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link to='desaparecidos' smooth={true} offset={-60} duration={500}>
            <Button text='Buscar Desaparecido' icon={faSearch} color='bg-color-primary' />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home