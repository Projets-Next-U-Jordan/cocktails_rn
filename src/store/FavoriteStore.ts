import React from "react";
import { FilterResult } from "../data/API";

export type FavoritesContextType = {
    drinks: Set<FilterResult>;
    addDrink: (drink: FilterResult) => void;
    removeDrink: (drink: FilterResult) => void;
};

export const FavoritesContext = React.createContext({} as FavoritesContextType);
