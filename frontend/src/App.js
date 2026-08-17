import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StorePage from "./pages/StorePage.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StorePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
