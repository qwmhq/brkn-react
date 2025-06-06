import { useState } from "react";
import { Link } from "react-router";

import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

import products from "@/assets/data/products.ts";

const Navbar = () => {
  const [showSearchResults, setShowSearchResults] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const searchResults = searchTerm.length > 0 ? products.filter(product => product.name.toLowerCase().includes(searchTerm.trim().toLowerCase())) : []

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length > 0) {
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
    setSearchTerm(value)
  };

  const onOpenAutoFocus = (event: Event) => {
    event.preventDefault();
  }

  return (
    <>
      <nav className="py-4 px-[--edge-gap] bg-[#333] uppercase text-xs flex flex-wrap gap-3 items-center justify-between sm:x-[flex-nowrap]">

        <Popover
          open={showSearchResults}
          onOpenChange={setShowSearchResults}
        >
          <PopoverAnchor asChild>
            <input
              type="search"
              name="search"
              placeholder="SEARCH..."
              aria-label="Search products"
              value={searchTerm}
              onChange={onSearchChange}
              className="w-full py-1 px-0 text-white placeholder-[#6a6868] bg-transparent border-b border-b-white outline-none sm:x-[w-48]"
            />
          </PopoverAnchor>
          <PopoverContent
            onOpenAutoFocus={onOpenAutoFocus}
            className="w-96 max-h-[36rem] overflow-y-scroll"
          >
            {searchResults.length > 0 ? searchResults.map((product, index) => {
              return (
                <div key={index}>
                  <Link to={`/product/${product.slug}`} className="py-3 flex justify-start items-center gap-2">
                    <img
                      src={`../../public/img/products/${product.images[0]}`}
                      alt={product.name}
                      className="size-24 object-contain"
                    />
                    <div className="text-lg text-gray-800 flex-grow">
                      <div>{product.name}</div>
                      <div>₦{product.price.toLocaleString()}</div>
                    </div>
                  </Link>
                  {index != searchResults.length - 1 && <Separator />}
                </div >
              );
            }) : <div className="uppercase text-lg text-center">No Products Found</div>}
          </PopoverContent>
        </Popover>

        <ul className="flex flex-shrink flex-grow basis-auto justify-start sm:justify-center list-none gap-4 sm:gap-8 text-white placeholder-[#6a6868]">
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/about">About</Link>
          </li>

          <li>
            <Link to="/sessions">Sessions</Link>
          </li>

          <li>
            <a href="https://90642.org/">Lab</a>
          </li>
        </ul>

        <div
          className="flex-grow-0 flex-shrink-0 basis-auto text-white"
        >
          <Link to="/cart" className="uppercase">Cart</Link>
        </div>

      </nav>
    </>
  );
};

export default Navbar;
