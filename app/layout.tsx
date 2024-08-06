import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";
import { Providers } from "@/components/SessionProvider";
import { PantryProvider } from "@/providers/pantryContext";
import ToastProvider from "@/providers/toastProvider";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pantry Tracker AI App",
  description: "Pantry Tracker AI App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        {/* <!-- Google tag (gtag.js) --> */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-PKPNWVGBHZ"></Script>
        <Script id="goog-analytics">
          {
            `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-PKPNWVGBHZ');
            `
          }
        </Script>
      </head>
      <body className={inter.className}>
        <Providers>
          <ToastProvider>
              <AppRouterCacheProvider>
                <PantryProvider>
                  <ThemeProvider theme={theme}>
                    {children}
                  </ThemeProvider>
                </PantryProvider>
              </AppRouterCacheProvider>
            </ToastProvider>   
        </Providers>
      </body>
    </html>
  );
}