import "tailwindcss/tailwind.css";
import { ThemeProvider } from "next-themes";
import { Provider } from "next-auth/client";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  );
}

export default MyApp;
