import { useParams } from "react-router-dom"
import Button from "../Button/Button"
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import CardDesaparecidos from '../CardDesaparecidos/CardDesaparecidos'

const Detalhes = () => {
    const { id } = useParams();

    return (
        <div className="p-5">
            <Button text="Voltar" icon={faArrowLeft} color='bg-color-primary' />
            <h1 className="text-2xl font-bold mb-4">Detalhes da Pessoa</h1>
            <p>ID selecionado: {id}</p>
            <CardDesaparecidos id='1' img='https://tse3.mm.bing.net/th/id/OIP.AWQeNdG34k2eI5lmqopI0gHaKe?rs=1&pid=ImgDetMain&o=7&rm=3' nome='Teste Um' status='Desaparecida' data='01/01/2001' local='Cuiabá, MT' />
        </div>
    )
}

export default Detalhes