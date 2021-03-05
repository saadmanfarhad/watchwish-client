import { Navbar } from "./navbar.tsx";

export const Layout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);
