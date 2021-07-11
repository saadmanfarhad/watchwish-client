import { Navbar } from "./navbar";

export const Layout = ({ children, header = true }) => (
  <div className="min-h-screen bg-gray-200 dark:bg-gray-900">
    {header && <Navbar />}
    {!header && <div className="h-16 dark:bg-gray-900"></div>}
    {children}
  </div>
);
