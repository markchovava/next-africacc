import ConstructionBanner from "@/components/ConstructionBanner";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MainContextProvider from "@/context/MainContext";


/* ToastContainer */
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export const metadata = {
  title: "Africa Capital Club",
  description: "Africa Capital Club",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <MainContextProvider>
          {/*  <ConstructionBanner /> */}
          <Header />
          {children}
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
      </MainContextProvider>
      </body>
    </html>
  );
}
