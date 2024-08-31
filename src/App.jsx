import { Routes, Route } from "react-router-dom";
import OverviewPage from "./pages/OverviewPage";
import ProductPage from "./pages/ProductPage";
import Navbar from "./component/Navbar";
import SIdebar from "./component/SIdebar";

const App = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100 overflow-hidden">
      <Navbar />

      {/* <div className="fixed inset-0 z-0">
        <div className="absolute inset-0"></div>
        <div className="absolute inset-0"></div>
      </div>
      <SIdebar /> */}

      <div className="flex flex-grow">
        {/* Sidebar - Fixed width and full height */}
        <div className=" bg-gray-800 h-full">
          <SIdebar />
        </div>

        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/products" element={<ProductPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
