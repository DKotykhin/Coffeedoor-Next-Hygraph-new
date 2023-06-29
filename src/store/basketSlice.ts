import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBasket } from "types/basketTypes";

type BasketState = {
    basketdata: IBasket[];
};

const initialState: BasketState = {
    basketdata: [],
};

const basketdataListSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        basketAddItems: (state, action: PayloadAction<IBasket>) => {
            const itemIndex = state.basketdata.findIndex(
                (item) => item.id === action.payload.id
            );
            itemIndex < 0
                ? (state.basketdata = [...state.basketdata, action.payload])
                : (state.basketdata = state.basketdata.map((item, index) => {
                      if (index === itemIndex) {
                          return {
                              ...item,
                              quantity: item.quantity + action.payload.quantity,
                          };
                      } else {
                          return item;
                      }
                  }));
        },

        basketRemoveItems: (state, action: PayloadAction<string>) => {
            const newOrder = state.basketdata.filter(
                (item) => item.id !== action.payload
            );
            state.basketdata = newOrder;
        },

        basketRemoveQuantity: (state, action: PayloadAction<string>) => {
            state.basketdata.forEach((item) => {
                if (item.id === action.payload) {
                    item.quantity > 1
                        ? (item.quantity -= 1)
                        : (item.quantity = 1);
                }
            });
        },

        basketAddQuantity: (state, action: PayloadAction<string>) => {
            state.basketdata.forEach((item) => {
                if (item.id === action.payload) {
                    item.quantity += 1;
                }
            });
        },

        basketSetEmpty: (state) => {
            state.basketdata = [];
        },
    },
});

const { actions, reducer } = basketdataListSlice;

export default reducer;
export const {
    basketAddItems,
    basketRemoveItems,
    basketAddQuantity,
    basketRemoveQuantity,
    basketSetEmpty,
} = actions;
