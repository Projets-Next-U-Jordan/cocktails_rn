import { Pressable, StyleSheet, Text, View } from "react-native";
import { Header } from "../_partials/Header";
import { SearchFilters } from "../_partials/SearchFilters";
import Accordion from 'react-native-collapsible/Accordion';
import { useState } from "react";
import { SearchBar } from "../_partials/SearchBar";
import { SearchResults } from "../_partials/SearchResults";
import { Footer } from "../_partials/Footer";
import { Cocktail } from "../../data/Cocktails";
import { FilterResult } from "../../data/API";

type HomeProps = {
    setSelectedCocktail: (cocktail: FilterResult) => void
}

export const Home = ({setSelectedCocktail}:HomeProps) => {

    const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

    return (

        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding:10}}>
                <Header title="Cocktails" showSearchBar={true} isSearchBarOpen={isSearchBarOpen} setIsSearchBarOpen={setIsSearchBarOpen} />
            </View>
            <SearchBar isOpen={isSearchBarOpen} setIsOpen={setIsSearchBarOpen} />
            <SearchResults setSelectedCocktail={setSelectedCocktail} />
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