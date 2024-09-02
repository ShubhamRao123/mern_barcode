import { Routes, Route } from "react-router-dom";
import OverviewPage from "./pages/OverviewPage";
import ProductPage from "./pages/ProductPage";
import Navbar from "./component/Navbar";
import SIdebar from "./component/SIdebar";
import UpdatePage from "./pages/UpdatePage";

const App = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100 overflow-hidden">
      <Navbar />

      <div className="flex flex-grow">
        <div className=" bg-gray-800 h-full">
          <SIdebar />
        </div>

        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/update" element={<UpdatePage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
