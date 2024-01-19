import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./shared/Navbar";
import Home from "./home/Home";
import About from "./about/About";
import Contact from "./contact/Contact";
import CharacterDetail from "./home/CharacterDetail";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/" element={<Home />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
