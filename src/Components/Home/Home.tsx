import { Carousel, initTWE } from "tw-elements";
import { useEffect } from "react";
import { Link } from 'react-scroll';
import "./Home.css"

const Home = () => {
  
  useEffect(() => {
    initTWE({ Carousel });
  }, []);

  return (
    <div className="home site-container">
      <div className="home-text">
        <h1 className="font-bold text-white-800 leading-tight">
          Proteja sua empresa com <span>consultoria especializada</span> em segurança do
          trabalho
        </h1>
        <p className="text-xl">Oferecemos treinamentos, análises de risco e consultoria completa 
        para manter sua equipe segura e sua empresa em conformidade com as normas regulamentadoras.
        </p>
        <div className="flex items-center justify-center gap-4">
          
         <Link to="contact" smooth={true} offset={-260} duration={500}>
            <button className="btn">
              Solicitar Orçamento
            </button>
          </Link>
          <Link to='services' smooth={true} offset={-360} duration={500}>
            <button className="btn-white">
              Conheça nossos serviços
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home