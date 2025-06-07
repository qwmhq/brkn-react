import { useEffect, useReducer } from "react"
import cartReducer, { CartContext } from "@/reducers/cartReducer";

const CartContextProvider: React.FC<{ children: React.ReactNode; }> = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, []);

  useEffect(() => {
    dispatch({ type: "INITIALIZE" });
  }, []);

  return (
    <CartContext.Provider value={[cartState, dispatch]}>
      {children}
    </CartContext.Provider>
  )
};

export default CartContextProvider;
