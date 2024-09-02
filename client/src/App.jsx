import { Routes, Route } from "react-router-dom";
// import OverviewPage from "./pages/OverviewPage";
// import ProductPage from "./pages/ProductPage";
import Navbar from "./component/Navbar";
import SIdebar from "./component/SIdebar";
// import UpdatePage from "./pages/UpdatePage";
import Receiver from "./pages/Receiver";
import Sender from "./pages/Sender";
import Shipment from "./pages/Shipment";
import Tracking from "./pages/Tracking";
import Rightbar from "./component/Rightbar";
import { ProgressProvider } from "./component/ProgressContext";
import BarcodePage from "./pages/BarcodePage";
import AnalyticsPage from "./pages/AnalyticsPage";

const App = () => {
  return (
    <ProgressProvider>
      <div className="flex flex-col h-screen bg-gray-900 text-gray-100 overflow-hidden">
        <Navbar />

        <div className="flex flex-grow">
          <div className=" bg-gray-800 h-full">
            <SIdebar />
          </div>

          <Routes>
            <Route path="/" element={<Sender />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            {/* <Route path="/overview" element={<OverviewPage />} /> */}
            {/* <Route path="/products" element={<ProductPage />} /> */}
            <Route path="/receiver" element={<Receiver />} />
            <Route path="/shipment" element={<Shipment />} />
            <Route path="/tracking" element={<Tracking />} />
            {/* <Route path="/update" element={<UpdatePage />} /> */}
            <Route path="/barcode" element={<BarcodePage />} />
          </Routes>
          <div className=" bg-gray-800 h-full">
            <Rightbar />
          </div>
        </div>
      </div>
    </ProgressProvider>
  );
};

export default App;
