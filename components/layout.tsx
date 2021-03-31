import { Navbar } from "./navbar.tsx";

export const Layout = ({ children }) => (
  <div className="min-h-screen bg-white dark:bg-gray-800">
    <Navbar />
    {children}
  </div>
);
