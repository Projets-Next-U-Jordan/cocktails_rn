import { useContext, useEffect } from "react";
import { CurrentSearchType, CurrentSearchContext } from "../../store/FilterStore";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SearchFilters } from "./SearchFilters";
import * as API from "../../data/API";
import { IconDelete } from "../Icons";

type SearchBarProps = {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

export const SearchBar = (props:SearchBarProps) => {

    const currentSearch:CurrentSearchType = useContext(CurrentSearchContext);

    return (
        <View style={[ props.isOpen ? {display: "flex" } : {display: "none"}, styles.container]}>
            <TextInput
                style={styles.input}
                placeholder="Search"
                value={currentSearch.name}
                onChangeText={(text) => {
                    currentSearch.setName(text);
                }}
            />
            <SearchFilters currentSearch={currentSearch}/>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems:'center'}}>
                <Pressable 
                    style={{flex:1, backgroundColor: '#000', padding: 10, margin: 10, borderRadius: 5}}
                    onPress={async () => {
                        const result = await API.fetchCocktailsByFilter(
                            API.Filter.fromCurrentSearch(currentSearch)
                        );
                        currentSearch.setResult(result);
                    }}
                >
                    <Text style={{color: '#fff', textAlign: 'center'}}>Chercher</Text>
                </Pressable>
                <Pressable
                    style={{backgroundColor: '#000', padding: 10, margin: 10, borderRadius: 5}}
                    onPress={() => {
                        currentSearch.setName("");
                        currentSearch.setCategory("");
                        currentSearch.setIngredient("");
                        currentSearch.setGlass("");
                        currentSearch.setAlcoholLevel("");
                    }}
                >
                    <IconDelete
                        size={20}
                        color="#fff"
                    />
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "auto",
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#000',
        paddingVertical: 10,
        marginBottom: 20,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});