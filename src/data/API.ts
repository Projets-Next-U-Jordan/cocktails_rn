import { CurrentSearchType, FiltersContextType } from "../store/FilterStore";
import { Cocktail } from "./Cocktails";

export class Filter {
    name: string|null;
    category: string|null;
    ingredient: string|null;
    glass: string|null;
    alcoholic: string|null;

    constructor(name: string|null, category: string|null, ingredient: string|null, glass: string|null, alcoholic: string|null) {
        this.name = name;
        this.category = category;
        this.ingredient = ingredient;
        this.glass = glass;
        this.alcoholic = alcoholic;
    }

    static fromCurrentSearch(currentSearch: CurrentSearchType) {
        return new Filter(
            currentSearch.name,
            currentSearch.category,
            currentSearch.ingredient,
            currentSearch.glass,
            currentSearch.alcoholLevel
        );
    }

    canSearch() : boolean {
        return this.name !== null || this.category !== null || this.ingredient !== null || this.glass !== null || this.alcoholic !== null;
    }

    toQueryString() : string {
        return Object
            .keys(this)
            .filter(key => this[key] !== null && this[key] !== undefined && this[key].length > 0)
            .map(key => `${key[0]}=${this[key]}`).join("&");
    }
}

class FilterType {
    name: string;
    values: string[];
}

export class FilterResult {
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
    
    static fromCocktail(cocktail: Cocktail) : FilterResult {
        //Je sais c pas opti :'(
        let result = new FilterResult();
        result.idDrink = cocktail.idDrink;
        result.strDrink = cocktail.strDrink;
        result.strDrinkThumb = cocktail.strDrinkThumb; 
        return result;
    }
    static fromJson(json: any): FilterResult { 
        return Object.assign(new FilterResult(), json);
    }
    getCocktail() : Promise<Cocktail> {
        return fetchCocktail(this.idDrink);
    }
}

export async function getHomePageResults() : Promise<FilterResult[]> {
    const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic");
    let json;
    try {
        json = await response.json();
    } catch (error) {
        return;
    }
    return json.drinks.map((drink: any) => FilterResult.fromJson(drink));
}

export async function fetchCocktails() : Promise<Cocktail[]> {
    const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=");
    let json;
    try {
        json = await response.json();
    } catch (error) {
        return;
    }
    return json.drinks.map((drink: any) => Cocktail.fromJson(drink));
}

export async function fetchCocktail(id: string) : Promise<Cocktail> {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    let json;
    try {
        json = await response.json();
    } catch (error) {
        return;
    }
    return Cocktail.fromJson(json.drinks[0]);
}

export async function fetchRandomCocktail() : Promise<Cocktail> {
    const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php");
    let json;
    try {
        json = await response.json();
    } catch (error) {
        return;
    }
    return Cocktail.fromJson(json.drinks[0]);
}

export async function fetchCategories() : Promise<FilterType> {
    const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list");
    let json;
    try {
        json = await response.json();
    } catch (error) {
        return;
    }
    return { name: "Category", values: json.drinks.map((drink: any) => drink.strCategory) };
}

export async function fetchIngredients() : Promise<FilterType> {
    const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list");
    let json;
    try {
        json = await response.json();
    } catch (error) {
        return;
    }
    return { name: "Ingredient", values: json.drinks.map((drink: any) => drink.strIngredient1) };
}

export async function fetchGlasses() : Promise<FilterType> {
    const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list");
    let json;
    try {
        json = await response.json();
    } catch (error) {
        return;
    }
    return { name: "Glass", values: json.drinks.map((drink: any) => drink.strGlass) };
}        

export async function fetchAlcoholicFilters() : Promise<FilterType> {
    const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list");
    let json;
    try {
        json = await response.json();
    } catch (error) {
        return;
    }
    return { name: "Alcoholic", values: json.drinks.map((drink: any) => drink.strAlcoholic) };
}


export async function fetchCocktailByName(name: string) : Promise<Cocktail> {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
    let json;
    try {
        json = await response.json();
    } catch (error) {
        return;
    }
    return Cocktail.fromJson(json.drinks[0]);
}

export async function fetchCocktailsByFilter(filter: Filter) : Promise<FilterResult[]> {
    if (!filter.canSearch()) { return; }
    console.log(filter.toQueryString());
    if (filter.name && filter.name.length > 0) {
        return [FilterResult.fromCocktail(await fetchCocktailByName(filter.name))];
    }
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?${filter.toQueryString()}`);

    let json;
    try {
        json = await response.json();
    } catch (error) {
        return;
    }
    return json.drinks.map((drink: any) => FilterResult.fromJson(drink));
}

export async function fetchAllFilters(): Promise<FiltersContextType> {
    return {
        categories: (await fetchCategories()).values.sort((a, b) => a.localeCompare(b)),
        ingredients: (await fetchIngredients()).values.sort((a, b) => a.localeCompare(b)),
        glasses: (await fetchGlasses()).values.sort((a, b) => a.localeCompare(b)),
        alcoholsLevel: (await fetchAlcoholicFilters()).values.sort((a, b) => a.localeCompare(b)),
    };
}