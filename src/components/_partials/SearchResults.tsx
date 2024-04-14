import React, { useContext, useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { CurrentSearchContext } from "../../store/FilterStore";
import { FilterResult } from "../../data/API";
import { IconStar } from "../Icons";
import { FavoritesContext } from "../../store/FavoriteStore";
import { Cocktail } from "../../data/Cocktails";

type SearchResultsProps = {
    setSelectedCocktail: (cocktail: FilterResult) => void;
}

export const SearchResults = ({setSelectedCocktail}:SearchResultsProps) => {

    const searchContext = useContext(CurrentSearchContext);
    const favorites = useContext(FavoritesContext);

    const isFavorite = (drink: FilterResult) => {
        return favorites.drinks.has(drink);
    }

    const ListItem = React.memo(({item}: {item: FilterResult}) => {
        const [isFav, setIsFav] = useState(() => isFavorite(item));

        const toggleFavorite = () => {
            setIsFav(!isFav);
            if (isFav) {
                favorites.removeDrink(item);
            } else {
                favorites.addDrink(item);
            }
        };

        return (
            <View style={{padding: 10, borderTopWidth: 1, borderTopColor: "#000", flexDirection: 'row'}}>
                <Pressable
                    style={{flex: 1, flexDirection: "row"}}
                    onPress={async () => { 
                        setSelectedCocktail(await item) 
                    }}
                >
                    <Image 
                        style={{width: 100, height: 100}}
                        source={{uri: item.strDrinkThumb}}
                    />
                    <Text>{item.strDrink}</Text>
                </Pressable>
                <IconStar 
                    style={{position: 'absolute', right: 10 }}
                    filled={isFav}  
                    size={50}
                    color="#000"
                    onClick={toggleFavorite}
                />
            </View>
        );
    });

    return (
        <FlatList
            data={searchContext.result}
            keyExtractor={(item) => item.idDrink}
            renderItem={({item}) => <ListItem item={item} />}
        />
    );
}