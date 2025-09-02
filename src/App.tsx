import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("./Components/Home/Home"));
const Navbar = lazy(() => import("./Components/NavBar/NavBar"));
const About = lazy(() => import("./Components/About/About"));
const Desaparecidos = lazy(() => import("./Components/Desaparecidos/Desaparecidos"));
const Detalhes = lazy(() => import("./Components/Detalhes/Detalhes"));
const Title = lazy(() => import("./Components/Title/Title"));
const Footer = lazy(() => import("./Components/Footer/Footer"));

import Loader from "./Components/Loader/Loader";

function DefaultLayout() {
  return (
    <>
      <Navbar />
      <Home />
      <div className="site-container bg-gradient">
        <Title
          subTitle="Sobre o Portal"
          title="O Portal de Pessoas Desaparecidas é uma plataforma dedicada a auxiliar famílias e autoridades na busca e localização de pessoas desaparecidas em todo o Brasil."
          classColor="color-white"
        />
        <About />
      </div>
      <div className="site-container">
        <Title subTitle="Buscar Pessoas Desaparecidas" title="" classColor="" />
        <Outlet />
      </div>
      <div className="site-container bg-gradient">
        <Footer />
      </div>
    </>
  );
}

function DetalhesLayout() {
  return (
    <>
      <Navbar />
      <div className="site-container">
        <Outlet />
      </div>
      <div className="site-container bg-gradient">
        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>

          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Desaparecidos />} />
          </Route>

          <Route element={<DetalhesLayout />}>
            <Route path="/Detalhes/:id" element={<Detalhes />} />
          </Route>

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
