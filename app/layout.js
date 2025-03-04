import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

export const metadata = {
  title: "GDGoC",
  description: "The techie meet-Up",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body>
        <main className="app">
          <Nav />
          {children}
        </main>
        <Footer />
      </body>
    </html> 
  );
};

export default RootLayout;
