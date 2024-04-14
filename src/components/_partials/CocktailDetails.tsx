import { Image, Text, View } from "react-native";
import { Cocktail } from "../../data/Cocktails";
import { FilterResult } from "../../data/API";
import { useEffect, useState } from "react";

type CocktailDetailsProps = {
    filterResult: FilterResult | null,
}

export const CocktailDetails = ({filterResult}:CocktailDetailsProps) => {

    const [cocktail, setCocktail] = useState<Cocktail>(null);

    useEffect(() => {
        if (filterResult) {
            filterResult.getCocktail().then((cocktail) => {
                setCocktail(cocktail);
            });
        }
    }, [filterResult]);

    if (!cocktail) return null;
    return (
        <View 
            style={{padding: 10, borderTopWidth: 1, borderTopColor: "#000", alignItems: 'center'}}
        >
            <Image 
                style={{width: "70%", aspectRatio: 1}}
                source={{uri: cocktail.strDrinkThumb}}
            />
            <Text
                style={{fontSize: 30, textAlign: 'center', padding: 10}}
            >
                {cocktail.strDrink}
            </Text>
            <View
                style={{padding: 10, width: '100%', alignItems: 'center'}}
            >
                <Text
                    style={{fontSize: 20, textAlign: 'center', paddingTop: 10}}
                >
                    Instructions
                </Text>
                {cocktail.strInstructions[0]?.split(". ").map((instruction, index) => {
                    return (
                        <Text 
                            key={index}
                            style={{width: "100%", textAlign: 'left'}}
                        >
                            {index+1}. {instruction}
                        </Text>
                    );
                })}
                <Text
                    style={{width: "80%", fontSize: 20, textAlign: 'center', paddingTop: 10, borderBottomColor: '#000', borderBottomWidth: 1}}
                >
                    Ingredients
                </Text>
                {cocktail.strIngredients?.map((ingredient, index) => {
                    let amount = cocktail.strMeasures[index];
                    return (
                        <View
                            key={index}
                            style={{width: "100%", flexDirection: 'row', justifyContent: 'space-between'}}
                        >
                            <Text 
                                style={{textAlign: 'right', paddingTop: 10}}
                            >
                                {amount}
                            </Text>
                            <Text 
                                key={index}
                                style={{textAlign: 'left', paddingTop: 10}}
                            >
                                {ingredient}
                            </Text>
                        </View>
                    );
                })}
            </View>
        </View>
    );
}