import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./component/Navbar";
import Sidebar from "./component/Sidebar"; // Corrected import spelling
import Receiver from "./pages/Receiver";
import Sender from "./pages/Sender";
import Shipment from "./pages/Shipment";
import Tracking from "./pages/Tracking";
import Rightbar from "./component/Rightbar";
import { ProgressProvider } from "./component/ProgressContext";
import BarcodePage from "./pages/BarcodePage";
import AnalyticsPage from "./pages/AnalyticsPage";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";

const App = () => {
  const location = useLocation(); // Access the current route

  // Check if the current route is for signup or login
  const isAuthPage =
    location.pathname === "/" || location.pathname === "/login";

  return (
    <ProgressProvider>
      <div className="flex flex-col h-screen bg-gray-900 text-gray-100 overflow-hidden">
        <Navbar />

        <div className="flex flex-grow">
          {/* Render Sidebar only if not on signup or login pages */}
          {!isAuthPage && <Sidebar />}

          {/* Main content area */}
          <div
            className={`flex-grow flex flex-col overflow-y-auto ${
              isAuthPage ? "w-full" : ""
            }`}
          >
            <Routes>
              <Route path="/" element={<SignUp />} />
              <Route path="/sender" element={<Sender />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/receiver" element={<Receiver />} />
              <Route path="/shipment" element={<Shipment />} />
              <Route path="/tracking" element={<Tracking />} />
              <Route path="/barcode" element={<BarcodePage />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>

          {/* Render Rightbar only if not on signup or login pages */}
          {!isAuthPage && (
            <div className="bg-gray-800 w-16 lg:w-56 xl:w-60 h-full">
              <Rightbar />
            </div>
          )}
        </div>
      </div>
    </ProgressProvider>
  );
};

export default App;
