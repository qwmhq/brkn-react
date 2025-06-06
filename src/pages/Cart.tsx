import type { CartItem, Product } from "@/types";
import { useContext, useEffect } from "react";
import { Link } from "react-router";
import { Separator } from "@/components/ui/separator";
import { Trash2, MinusIcon, PlusIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CartContext } from "@/reducers/cartReducer";

const Cart = () => {
  const [cart, cartDispatch] = useContext(CartContext);

  useEffect(() => {
    document.title = "Cart – BRKNBRDS";
  }, []);

  const cartTotal = cart.reduce((acc: number, curr: CartItem) => acc + curr.quantity * curr.product.price, 0);
  const shippingFee = 0;

  const increaseCount = (product: Product) => {
    cartDispatch({ type: "INC_ITEM", payload: product })
  };

  const decreaseCount = (product: Product) => {
    cartDispatch({ type: "DEC_ITEM", payload: product })
  };

  const deleteFromCart = (product: Product) => {
    cartDispatch({ type: "REMOVEITEM", payload: product });
  };

  return (
    <main className="flex-grow p-[--edge-gap] text-white grid grid-rows-[3fr_1fr] sm:grid-rows-1 sm:grid-cols-[3fr_auto_1fr]">
      <div className="sm:pr-[--edge-gap]">
        <h1 className="text-2xl uppercase">Cart({cart.length})</h1>
        <Separator className="" />
        <div className="max-h-[62vh] sm:max-h-none sm:px-4 overflow-y-scroll">
          {cart.map((item, index) => {
            return (
              <div key={index}>
                <div className="my-2 flex">
                  <Link to={`/product/${item.product.slug}`} className="">
                    <img
                      src={`../../public/img/products/${item.product.images[0]}`}
                      alt={item.product.name}
                      className="size-24 object-contain"
                    />
                  </Link>
                  <div className="ml-4 mt-2 flex-grow flex justify-between">
                    <div className="">
                      <Link to={`/product/${item.product.slug}`} className="flex ">
                        <h3 className="text-xl">{item.product.name}</h3>
                      </Link>
                      <p className="mt-1 text-lg text-[#333]">₦{item.product.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center gap-4">
                        <div className="px-2 flex items-center gap-4 border border-gray-400 rounded-xl">
                          <button><MinusIcon color="#333333" className="size-4" onClick={() => decreaseCount(item.product)} /></button>
                          <span className="text-lg text-[#333333]">{item.quantity}</span>
                          <button><PlusIcon color="#333333" className="size-4" onClick={() => increaseCount(item.product)} /></button>
                        </div>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button className="">
                              <Trash2 size={16} color="#333333"></Trash2>
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle className="">Remove Product</AlertDialogTitle>
                              <AlertDialogDescription>Remove item from cart?</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="uppercase">Cancel</AlertDialogCancel>
                              <AlertDialogAction className="uppercase" onClick={() => deleteFromCart(item.product)}>Ok</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                </div>
                {index != cart.length - 1 && <Separator />}
              </div>
            );
          })}
        </div>
      </div>
      <Separator orientation="vertical" className="hidden sm:block" />
      <div className="sm:pl-[--edge-gap]">
        <h2 className="text-xl uppercase">Cart Summary</h2>
        <Separator className="mb-2" />
        <div className="flex justify-between items-center text-lg">
          <p className="text-[#333]">Subtotal</p>
          <span className="text-gray-900">₦{cartTotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center text-lg">
          <p className="text-[#333]">Shipping</p>
          <span className="text-gray-900">₦{shippingFee.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center text-lg">
          <p className="text-[#333]">Estimated total</p>
          <span className="text-gray-900">₦{(cartTotal + shippingFee).toLocaleString()}</span>
        </div>
        <button className="w-full mt-2 p-3 bg-[#b3b2b2] hover:bg-[#c4c4c4] text-lg uppercase">Checkout</button>
      </div>
    </main>
  );
};

export default Cart;
