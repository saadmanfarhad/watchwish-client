import { Navbar } from "./navbar.tsx";

export const Layout = ({ children }) => (
  <div className="dark:bg-gray-700 bg-gray-100 h-screen">
    <Navbar />
    {children}
  </div>
);
