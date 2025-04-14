import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sender from "./pages/Sender";
import Viewer from "./pages/Viewer";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sender" element={<Sender />} />
        <Route path="/viewer" element={<Viewer />} />
        <Route path="*" element={<div className="p-6">404: Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
