const LANGUAGES = [
    "",
    "ES",
    "DE",
    "FR",
    "IT",
    "ZH_HANS",
    "ZH_HANT"
];

export class CurrentSearch {
    name: string;
    category: string;
    ingredient: string;
    glass: string;
    alcoholic: string;
}

export class Ingredient {
    strIngredient: string;
    strDescription: string;
    strType: string;
    strAlcohol: string;
    strABV: string;

    static fromJson(json: any): Ingredient {
        return Object.assign(new Ingredient(), json);
    }
}

class CocktailRaw {
    idDrink: string;
    strDrink: string;
    strDrinkAlternate: string;

    strTags: string;
    strVideo: string;
    strCategory: string;

    strIBA: string;
    strAlcoholic: string;
    strGlass: string;

    strInstructions: string;
    strInstructionsES: string;
    strInstructionsDE: string;
    strInstructionsFR: string;
    strInstructionsIT: string;
    strInstructionsZH_HANS: string;
    strInstructionsZH_HANT: string;

    strDrinkThumb: string;
    strIngredient1: string;
    strIngredient2: string;
    strIngredient3: string;
    strIngredient4: string;
    strIngredient5: string;
    strIngredient6: string;
    strIngredient7: string;
    strIngredient8: string;
    strIngredient9: string;
    strIngredient10: string;
    strIngredient11: string;
    strIngredient12: string;
    strIngredient13: string;
    strIngredient14: string;
    strIngredient15: string;

    strMeasure1: string;
    strMeasure2: string;
    strMeasure3: string;
    strMeasure4: string;
    strMeasure5: string;
    strMeasure6: string;
    strMeasure7: string;
    strMeasure8: string;
    strMeasure9: string;
    strMeasure10: string;
    strMeasure11: string;
    strMeasure12: string;
    strMeasure13: string;
    strMeasure14: string;
    strMeasure15: string;
    
    strImageSource: string;
    strImageAttribution: string;
    strCreativeCommonsConfirmed: string;

    dateModified: string;

    static fromJson(json: any): CocktailRaw {
        return Object.assign(new CocktailRaw(), json);
    }
}

export class Cocktail {
    idDrink: string;
    strDrink: string;
    strDrinkAlternate: string;

    strTags: string;
    strVideo: string;
    strCategory: string;

    strIBA: string;
    strAlcoholic: string;
    strGlass: string;

    strInstructions: string[];
    strDrinkThumb: string;
    strIngredients: string[];
    strMeasures: string[];

    strImageSource: string;
    strImageAttribution: string;
    strCreativeCommonsConfirmed: string;

    dateModified: string;

    static fromJson(json: any): Cocktail {
        return Cocktail.fromRaw(CocktailRaw.fromJson(json));
    }

    static fromRaw(raw: CocktailRaw): Cocktail {
        const strIngredients: string[] = [];
        const strMeasures: string[] = [];
        const strInstructions: string[] = [];

        for (let i = 1; i <= 15; i++) {
            if (raw[`strIngredient${i}`] !== null && raw[`strIngredient${i}`] !== "") {
                strIngredients.push(raw[`strIngredient${i}`]);
            }
            if (raw[`strMeasure${i}`] !== null && raw[`strMeasure${i}`] !== "") {
                strMeasures.push(raw[`strMeasure${i}`]);
            }
        }

        for (let i = 0; i < LANGUAGES.length; i++) {
            if (raw[`strInstructions${LANGUAGES[i]}`] !== null && raw[`strInstructions${LANGUAGES[i]}`] !== "")
                strInstructions.push(raw[`strInstructions${LANGUAGES[i]}`]);
            else
                strInstructions.push("");
        }

        return Object.assign(new Cocktail(), {
            idDrink: raw.idDrink,
            strDrink: raw.strDrink,
            strDrinkAlternate: raw.strDrinkAlternate,

            strTags: raw.strTags,
            strVideo: raw.strVideo,
            strCategory: raw.strCategory,

            strIBA: raw.strIBA,
            strAlcoholic: raw.strAlcoholic,
            strGlass: raw.strGlass,

            strInstructions: strInstructions,

            strDrinkThumb: raw.strDrinkThumb,
            strIngredients: strIngredients,
            strMeasures: strMeasures,
            strImageSource: raw.strImageSource,
            strImageAttribution: raw.strImageAttribution,
            strCreativeCommonsConfirmed: raw.strCreativeCommonsConfirmed,

            dateModified: raw.dateModified
        });
    }
}