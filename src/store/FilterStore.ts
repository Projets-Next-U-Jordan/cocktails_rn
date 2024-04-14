import React from "react";
import { FilterResult } from "../data/API";

export type FiltersContextType = {
    categories: string[];
    ingredients: string[];
    glasses: string[];
    alcoholsLevel: string[];
};

export const FilterContext = React.createContext({} as FiltersContextType);


export type CurrentSearchType = {
    name: string;
    setName: (name: string) => void;
    category: string;
    setCategory: (category: string) => void;
    ingredient: string;
    setIngredient: (ingredient: string) => void;
    glass: string;
    setGlass: (glass: string) => void;
    alcoholLevel: string;
    setAlcoholLevel: (alcoholLevel: string) => void;
    result: FilterResult[];
    setResult: (result: FilterResult[]) => void;
};

export const CurrentSearchContext = React.createContext({} as CurrentSearchType);