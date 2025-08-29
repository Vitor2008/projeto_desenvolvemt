import Home from './Components/Home/Home'
import Navbar from './Components/NavBar/NavBar'
import About from './Components/About/About'
import Desaparecidos from './Components/Desaparecidos/Desaparecidos'
import Title from './Components/Title/Title'

function App() {
  return (
    <div>
      <Navbar />
      <Home />
      <div className='site-container'>
        <Title subTitle="Sobre o Portal" title="O Portal de Pessoas Desaparecidas 
        é uma plataforma dedicada a auxiliar famílias e autoridades na 
        busca e localização de pessoas desaparecidas em todo o Brasil." classColor=""></Title>
        <About />
        <Desaparecidos />
      </div>
    </div>
  )
}

export default App