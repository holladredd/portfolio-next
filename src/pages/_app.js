import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import QueryProvider from "@/context/QueryProvider";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <QueryProvider>
        <Component {...pageProps} />
      </QueryProvider>
    </ThemeProvider>
  );
}
