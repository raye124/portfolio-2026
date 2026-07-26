import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Techstack from "./components/Techstack";
import Qualifications from "./components/Qualifications";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Hero />
    <div className="page-background">
      <Navbar />
      <About />
      <Techstack />
      <Qualifications />
      <Projects />
      <Certifications />
      <Footer />
    </div>
    </>
  );
}

export default App;