import { useState } from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

import Sidebar from "./Sidebar";

const MainLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const collapseSidebar = () => setSidebarCollapsed(true);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <motion.main
        initial={{ marginLeft: 256 }}
        animate={{ marginLeft: sidebarCollapsed ? 80 : 256 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <Outlet context={{ collapseSidebar }} />
      </motion.main>
    </div>
  );
};

export default MainLayout;
