import "@/app/assets/styles/global.scss";
import ClientTourProvider from "./components/ClientTourProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientTourProvider>
          <main>{children}</main>
        </ClientTourProvider>
      </body>
    </html>
  );
}
