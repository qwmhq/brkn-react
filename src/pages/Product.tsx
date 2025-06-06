import { Link, useParams } from "react-router";
import products from "@/assets/data/products.ts";
import brknLogo from "../assets/img/brkn_logo.png";
import { Separator } from "@/components/ui/separator";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { Product } from "@/types";
import { CartContext } from "@/reducers/cartReducer";
import { toast } from "sonner";

const Product = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [imgSrc, setImgSrc] = useState("");
  const [_cart, cartDispatch] = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const p = products.find(p => p.slug === slug);
    if (p) {
      document.title = `${p.name} - BRKNBRDS`;
      setImgSrc(`../../public/img/products/${p.images[0]}`);
      setProduct(p);
    } else {
      document.title = "Product not found";
    }
  }, [slug]);

  if (!product) {
    return null;
  }

  const addToCart = (product: Product) => {
    cartDispatch({ type: "ADDITEM", payload: product });
    toast.success(
      "Product added successfully",
      {
        action: {
          label: "Go to cart",
          onClick: () => navigate("/cart")
        }
      });
  };

  return (
    <main className="flex-grow p-[--edge-gap] grid grid-cols-[1fr_auto_1fr] text-white">
      <div className="">
        <header className="flex justify-between items-center">
          <img
            src={brknLogo}
            alt="BRKNBRDS Logo"
            className="max-w-[6vw]"
          />
        </header>
        <div className="flex flex-col items-center">
          <img
            src={imgSrc}
            alt={product.name}
            className="mt-[6.4vh] w-[72%] max-w-[32rem] h-auto object-contain"
          />
          <div className="mt-[8vh] flex gap-4">
            {product.images.map((img: string, index: number) => {
              const imgPath = `../../public/img/products/${img}`;
              return (
                <button key={index} onClick={() => setImgSrc(imgPath)}>
                  <img
                    src={imgPath}
                    alt={product.name}
                    className={`w-16 h-auto border border-[#c4c4c4] ${imgPath === imgSrc ? "border-white" : ""}`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <Separator orientation="vertical" />
      <section className="px-[--edge-gap] flex flex-col justify-between">
        <div>
          <h1 className="mb-2 text-2xl uppercase text-white">{product.name}</h1>
          <p className="mb-2 text-base font-bold text-[#dcdcdc]">₦{product.price.toLocaleString()}</p>
          <p className="mb-4 text-base text-[#dcdcdc]">{product.description}</p>
          <Separator className="my-4"></Separator>
          <p className="lmb-[52rem] text-[#333333] text-base">Estimated delivery date: {product.delivery.from} – {product.delivery.to}</p>
        </div>
        <div className="flex flex-col">
          <button
            onClick={() => addToCart(product)}
            className="mb-3 p-3 bg-[#b3b2b2] text-base text-white uppercase hover:bg-[#c4c4c4]"
          >
            Add to Cart
          </button>
          <Link to="/" className="text-white underline text-center">Back to Home</Link>
        </div>
      </section>
    </main>
  )
};

export default Product;
