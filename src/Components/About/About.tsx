import './About.css'
import Card from "../Card/Card"

const About = () => {
    return (
        <section className="about bg-muted/30 border-b border-border">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto text-center">
                    {/* <h2 className="text-2xl font-bold text-foreground mb-4">Sobre o Portal</h2>
                    <p className="text-lg text-muted-foreground mb-6 text-balance">
                        O Portal de Pessoas Desaparecidas é uma plataforma dedicada a auxiliar famílias e autoridades na busca e
                        localização de pessoas desaparecidas em todo o Brasil.
                    </p> */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        <Card
                            title="UI / UX Creative Desing"
                            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse fuga adipisicing elit"
                            icon="" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
