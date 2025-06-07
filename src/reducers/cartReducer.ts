import type { CartItem, Product } from "@/types";
import { createContext } from "react";

interface InitializeAction {
  type: "INITIALIZE",
}

interface AddItemAction {
  type: "ADDITEM",
  payload: Product,
}

interface IncrementItemAction {
  type: "INC_ITEM";
  payload: Product;
}

interface DecrementItemAction {
  type: "DEC_ITEM",
  payload: Product,
}

interface RemoveItemAction {
  type: "REMOVEITEM",
  payload: Product,
}

export type CartAction = InitializeAction
  | AddItemAction
  | IncrementItemAction
  | DecrementItemAction
  | RemoveItemAction;

const reducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case "INITIALIZE":
      const savedStateJSON = localStorage.getItem("cart");
      if (savedStateJSON) {
        return JSON.parse(savedStateJSON);
      }
      return [];
    case "ADDITEM": {
      const itemInCart = state.find(x => x.product.slug === action.payload.slug);
      const newState = itemInCart ? [...state] : [...state].concat({ product: action.payload, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
      // if (!itemInCart) {
      //   const newState = [...state].concat({ product: action.payload, quantity: 1 })
      //   return newState;
      // } else {
      //   return [...state];
      // }
    }
    case "INC_ITEM": {
      const itemInCart = state.find(x => x.product.slug === action.payload.slug);
      let newState;
      if (!itemInCart) {
        newState = [...state].concat({ product: action.payload, quantity: 1 });
      } else {
        newState = state.map(item => {
          if (item === itemInCart) {
            return { ...itemInCart, quantity: itemInCart.quantity + 1 };
          } else {
            return item;
          }
        })
      }
      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    }
    case "DEC_ITEM": {
      const itemInCart = state.find(x => x.product.slug === action.payload.slug);
      let newState;
      if (!itemInCart) {
        newState = [...state];
      } else {
        newState = state.map(item => {
          if (item === itemInCart && item.quantity > 1) {
            return { ...itemInCart, quantity: itemInCart.quantity - 1 };
          } else {
            return item;
          }
        })
      }
      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    }
    case "REMOVEITEM": {
      const newState = state.filter(item => item.product !== action.payload);
      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    }
  }
};

export const CartContext = createContext<[CartItem[], React.Dispatch<CartAction>]>([[], () => { }]);

export default reducer;
