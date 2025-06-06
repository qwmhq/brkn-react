import { Outlet } from "react-router";
import Navbar from "./Navbar";
import CartContextProvider from "./CartContextProvider";
import { Toaster } from "./ui/sonner";

const RootLayout = () => {

  return (
    <CartContextProvider>
      <div className="h-full flex flex-col">
        <Navbar />
        <Outlet />
      </div>
      <Toaster position="top-center" />
    </CartContextProvider>
  );
};

export default RootLayout;
