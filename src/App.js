import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/routes";
import ScrollToTop from "./components/ScrollToTop";


const App = () => {
  return (
    <BrowserRouter>

      

      <div className="App">
        <AppRoutes />
        <ScrollToTop />
      </div>

    </BrowserRouter>
  );
};

export default App;