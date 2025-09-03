import './About.css'
import Card from "../Card/Card"
import { faSearch, faEye, faPhone } from '@fortawesome/free-solid-svg-icons'

const About = () => {
    return (
        <section className="about bg-muted/30 border-b border-border">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:grid-cols-3 mt-8">
                        <Card
                            title="Busca Eficiente"
                            text="Sistema de busca avançado com filtros por idade, localização e outras características."
                            icon={faSearch} />

                        <Card
                            title="Informações Detalhadas"
                            text="Perfis completos com fotos, descrições e informações relevantes para identificação."
                            icon={faEye} />

                        <Card
                            title="Colaboração"
                            text="Permite que qualquer pessoa contribua com informações relevantes de forma segura."
                            icon={faPhone} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
