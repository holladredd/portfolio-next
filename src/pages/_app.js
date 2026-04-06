import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import QueryProvider from "@/components/QueryProvider";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <QueryProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryProvider>
    </ThemeProvider>
  );
}
