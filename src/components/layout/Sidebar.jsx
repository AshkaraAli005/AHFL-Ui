import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
  Building2,
    ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from "../../components/ui/button";

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/applicants', label: 'Applicants', icon: Users },
  { path: '/documents', label: 'Documents', icon: FileText },
  // { path: '/settings', label: 'Settings', icon: Settings },
];

const Sidebar = ({ collapsed = false, onToggle }) => {
  const location = useLocation();

  return (
    <motion.aside
      initial={{ width: collapsed ? 80 : 256 }}
      animate={{ width: collapsed ? 80 : 256 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed left-0 top-0 z-40 flex h-screen flex-col bg-sidebar"
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-4">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-sidebar-primary">
          <Building2 className="h-5 w-5 text-sidebar-primary-foreground" />
        </div>

        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="text-lg font-semibold text-sidebar-foreground">
              DocuGenie.ai
            </h1>
            <p className="text-xs text-sidebar-foreground/60">
              Document Management
            </p>
          </div>
        )}
      </div>

      {/* Toggle Button */}
      {onToggle && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="absolute -right-3 top-20 z-50 h-6 w-6 rounded-full border bg-background shadow-md"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-6">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={cn(
                    "sidebar-link relative",
                    isActive && "active",
                    collapsed && "justify-center px-2"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-lg bg-sidebar-primary"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}

                  <Icon
                    className={cn(
                      "relative z-10 h-5 w-5 flex-shrink-0",
                      isActive
                        ? "text-sidebar-primary-foreground"
                        : "text-sidebar-foreground/70"
                    )}
                  />

                  {!collapsed && (
                    <span
                      className={cn(
                        "relative z-10",
                        isActive
                          ? "text-sidebar-primary-foreground font-medium"
                          : "text-sidebar-foreground/80"
                      )}
                    >
                      {item.label}
                    </span>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-4">
        <button
          className={cn(
            "sidebar-link w-full text-sidebar-foreground/60 hover:text-sidebar-foreground",
            collapsed && "justify-center px-2"
          )}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;

