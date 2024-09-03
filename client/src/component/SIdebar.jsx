import {
  BarChart2,
  DollarSign,
  Menu,
  Settings,
  ShoppingBag,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const SIDEBAR_ITEMS = [
  { name: "Overview", icon: BarChart2, color: "#6366f1", href: "/sender" },
  { name: "Barcode", icon: ShoppingBag, color: "#8B5CF6", href: "/barcode" },
  { name: "Analytics", icon: Users, color: "#EC4899", href: "/analytics" },
  { name: "Option3", icon: DollarSign, color: "#10B981", href: "/overview" },
  { name: "Option4", icon: ShoppingCart, color: "#F59E0B", href: "/products" },
  { name: "Option5", icon: TrendingUp, color: "#3B82F6", href: "/update" },
  { name: "Option6", icon: Settings, color: "#6EE7B7", href: "/settings" },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Toggle sidebar based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 970) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isSidebarOpen ? "w-64" : "w-16"
      }`}
      animate={{ width: isSidebarOpen ? 256 : 64 }}
      style={{ borderRight: "1px solid #2d2d2d" }} // Adds a consistent border-right to avoid line issues
    >
      <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit"
        >
          <Menu size={24} />
        </motion.button>

        <nav className="mt-8 flex-grow">
          {SIDEBAR_ITEMS.map((item, index) => (
            <Link key={item.href} to={item.href}>
              <motion.div className="flex items-center p-3 sm:p-4 text-xs sm:text-sm md:text-base font-medium rounded-lg hover:bg-gray-700 transition-colors mb-1 sm:mb-2">
                <item.icon
                  size={16}
                  className="min-w-[16px] sm:min-w-[20px]"
                  style={{ color: item.color }}
                />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className="ml-3 sm:ml-4 whitespace-nowrap"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

export default Sidebar;
