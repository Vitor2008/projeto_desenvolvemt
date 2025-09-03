import './LoaderSecondary.css'

const LoaderSecondary = () => {
    return (
        <div className="loader-secondary">
            <div className="loading-text">
                Buscando<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span>
            </div>
            <div className="loading-bar-background">
                <div className="loading-bar">
                    <div className="white-bars-container">
                        <div className="white-bar"></div>
                        <div className="white-bar"></div>
                        <div className="white-bar"></div>
                        <div className="white-bar"></div>
                        <div className="white-bar"></div>
                        <div className="white-bar"></div>
                        <div className="white-bar"></div>
                        <div className="white-bar"></div>
                        <div className="white-bar"></div>
                        <div className="white-bar"></div>
                    </div>
                </div>
            </div>
        </div>

  )
}

export default LoaderSecondary