import { useEffect, useState } from 'react'
import { Link } from 'react-scroll';
import './Navbar.css'
import logo from '../../assets/Img/icon.jpeg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPhone, faClock } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import Button from '../Button/Button'



const Navbar = () => {

  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setSticky(window.scrollY > 50);
    })
  }, []);

  const [mobileMenu, setMobileMenu] = useState(false);
  const toggleMenu = () => {
    setMobileMenu(!mobileMenu);
  }

  return (
    <>
      <nav className={`${sticky ? 'dark-nav' : ''} w-full`}>
        <div className='nav-header bg-color-primary p-2 flex justify-center gap-4 container-nav text-white md:text-base'>
          <span><FontAwesomeIcon icon={faPhone} /> (65) 3336-0000</span>
          <span ><FontAwesomeIcon icon={faClock} /> 7h às 17h</span>
          <span><FontAwesomeIcon icon={faInstagram} /> PortalDesaparecidosOficial</span>
        </div>
        <div className='nav-body bg-white'>
          <div className='container-nav py-2 flex justify-between items-center'>
            <div className='container-logo'>
              <div className='flex items-center justify-center gap-1'>
                <img src={logo} alt="Logo" width={40} loading='lazy' />
                <span>Desenvolve MT</span>
              </div>
              <h2>Projeto Portal Desaparecidos</h2>
            </div>
            <ul className={mobileMenu ? '' : 'hide-mobile-menu flex'}>
              <li className='flex items-center list-none text-[20px] font-bold'><Link to='home' smooth={true} offset={0} duration={500}>Home</Link></li>
              <li className='flex items-center list-none text-[20px] font-bold'><Link to='services' smooth={true} offset={-360} duration={500}>Sobre</Link></li>
              <li className='flex items-center list-none text-[20px] font-bold'><Link to='about' smooth={true} offset={-160} duration={500}>Institucional</Link></li>
              <li className='flex items-center list-none text-[20px] font-bold'><Link to='contact' smooth={true} offset={-260} duration={500}>Ouvidoria</Link></li>
              <li className='flex items-center list-none text-[20px] font-bold'><Link to='contact' smooth={true} offset={-260} duration={500}>
                <Button text='Buscar Desaparecido'></Button>
              </Link></li>
            </ul>
            <FontAwesomeIcon icon={faBars} className='menu-icon' onClick={toggleMenu} />
          </div>

        </div>
      </nav>
    </>
  )
}

export default Navbar