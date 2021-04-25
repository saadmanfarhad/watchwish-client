import { Navbar } from "./navbar.tsx";

export const Layout = ({ children, header = true }) => (
  <div className="min-h-screen bg-white dark:bg-gray-900">
    {header && <Navbar />}
    {!header && <div className="h-16 dark:bg-gray-900"></div>}
    {children}
  </div>
);
