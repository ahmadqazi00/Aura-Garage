import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Information from "./pages/Information";
import AdminPanel from "./pages/AdminPanel";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/information/:id" element={<Information />} />{" "}
          <Route path="/adminpanel" element={<AdminPanel />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
