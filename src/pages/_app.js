import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import QueryProvider from "@/context/QueryProvider";
import { ExperienceProvider } from "@/context/ExperienceContext";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <QueryProvider>
        <ExperienceProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ExperienceProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
