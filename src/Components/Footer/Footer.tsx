import './Footer.css'

const Footer = () => {
    return (
        <footer className="border-t border-border mt-12 text-white">
            <div className="container mx-auto px-4 py-8">
                <div className="text-center space-y-4">
                    <h3 className="font-bold text-2xl">Portal de Pessoas Desaparecidas</h3>
                    <p className="text-sm text-muted-foreground max-w-2xl mx-auto text-balance">
                        Este portal foi criado para auxiliar na busca e localização de pessoas desaparecidas. Trabalhamos em
                        parceria com autoridades competentes e organizações de apoio às famílias.
                    </p>
                    <div className="flex sm:flex-row justify-center items-center gap-2 md:gap-4 lg:gap-4 text-sm text-muted-foreground">
                        <span>© 2025 Portal de Pessoas Desaparecidas</span>
                        <span className="sm:inline">•</span>
                        <span>Todos os direitos reservados</span>
                    </div>
                    <div className="pt-4 footer">
                        <p className="text-xs text-muted-foreground">
                            Em caso de emergência, ligue 190 (Polícia Militar) ou 197 (Polícia Civil)
                        </p>
                    </div>
                </div>
            </div>
        </footer>)
}

export default Footer