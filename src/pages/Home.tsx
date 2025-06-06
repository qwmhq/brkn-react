import { useState } from "react";
import { Link } from "react-router";

import Loader from "../components/Loader";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip.tsx";

import brknLogo from "../assets/img/brkn_logo.png";
import products from "../assets/data/products.ts";

const Home = () => {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <Loader enterFn={() => setLoading(false)} />
    );
  }

  return (
    <main className="p-[--edge-gap] flex flex-col text-white">

      <header className="flex justify-between items-center mb-[--edge-gap]">
        <img
          src={brknLogo}
          alt="BRKNBRDS Logo"
          className="max-w-[6vw]"
        />
      </header>

      <div className="grid grid-cols-[repeat(8,_1fr)] gap-[--grid-gap] justify-center items-start">
        {products.map((product, index) => (
          <div
            key={index}
            className="w-full max-w-[8vw] overflow-hidden cursor-pointer"
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to={`/product/${product.slug}`}>
                    <img src={`../../public/img/products/${product.images[0]}`} alt={product.name} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>{product.name}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ))}
      </div>
    </main>
  )
};

export default Home;
