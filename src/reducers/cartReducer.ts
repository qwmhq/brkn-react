import type { CartItem, Product } from "@/types";
import { createContext } from "react";

interface InitializeAction {
  type: "INITIALIZE",
  payload: CartItem[];
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
      return action.payload;
    case "ADDITEM": {
      const itemInCart = state.find(x => x.product.slug === action.payload.slug);
      if (!itemInCart) {
        return [...state].concat({ product: action.payload, quantity: 1 });
      } else {
        return [...state];
      }
    }
    case "INC_ITEM": {
      const itemInCart = state.find(x => x.product.slug === action.payload.slug);
      if (!itemInCart) {
        return [...state].concat({ product: action.payload, quantity: 1 });
      } else {
        return state.map(item => {
          if (item === itemInCart) {
            return { ...itemInCart, quantity: itemInCart.quantity + 1 };
          } else {
            return item;
          }
        })
      }
    }
    case "DEC_ITEM": {
      const itemInCart = state.find(x => x.product.slug === action.payload.slug);
      if (!itemInCart) {
        return [...state];
      } else {
        return state.map(item => {
          if (item === itemInCart && item.quantity > 1) {
            return { ...itemInCart, quantity: itemInCart.quantity - 1 };
          } else {
            return item;
          }
        })
      }
    }
    case "REMOVEITEM": {
      return state.filter(item => item.product !== action.payload);
    }
  }
};

export const CartContext = createContext<[CartItem[], React.Dispatch<CartAction>]>([[], () => { }]);

export default reducer;
