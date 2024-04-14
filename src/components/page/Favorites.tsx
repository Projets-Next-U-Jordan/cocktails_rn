import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Header } from "../_partials/Header";
import { Footer } from "../_partials/Footer";
import { useContext } from "react";
import { FavoritesContext } from "../../store/FavoriteStore";
import { IconStar } from "../Icons";
import { Cocktail } from "../../data/Cocktails";
import { FilterResult } from "../../data/API";

type FavoritesProps = {
    setSelectedCocktail: (cocktail: FilterResult) => void
}

export const FavoritesPage = ({setSelectedCocktail}:FavoritesProps) => {

    const favorites = useContext(FavoritesContext);

    return (

        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding:10}}>
                <Header title="Favoris" showSearchBar={false} isSearchBarOpen={null} setIsSearchBarOpen={null} />
            </View>
            <View
                style={{flex: 1}}
            >
                {[...favorites.drinks].map((favorite, index) => {
                    return (
                        <Pressable 
                            key={index} 
                            onPress={async () => {
                                setSelectedCocktail(favorite);
                            }}
                            style={{padding: 10, borderTopWidth: 1, borderTopColor: "#000", flexDirection: 'row'}}>
                            <Image 
                                style={{width: 100, height: 100}}
                                source={{uri: favorite.strDrinkThumb}}
                            />
                            <Text>{favorite.strDrink}</Text>
                            <IconStar 
                                style={{position: 'absolute', right: 10 }}
                                filled={true}  
                                size={50}
                                color="#000"
                                onClick={ () => {
                                    favorites.removeDrink(favorite);
                                }}
                            />
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
    },
});