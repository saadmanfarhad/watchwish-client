import { Navbar } from "./navbar.tsx";

export const Layout = ({ children }) => (
  <div>
    <Navbar />
    {children}
  </div>
);
