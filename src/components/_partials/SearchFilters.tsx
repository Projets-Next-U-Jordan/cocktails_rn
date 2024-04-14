import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { CurrentSearchType, CurrentSearchContext, FilterContext } from "../../store/FilterStore";
import { useContext, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

const MAX_FILTERS_HEIGHT = 80;

type SearchFiltersProps = {
    currentSearch: CurrentSearchType
}

export const SearchFilters = ({currentSearch}:SearchFiltersProps) => {

    const filters = useContext(FilterContext);

    const [filtersVisible, setFiltersVisible] = useState(false);

    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isIngredientOpen, setIsIngredientOpen] = useState(false);
    const [isGlassOpen, setIsGlassOpen] = useState(false);
    const [isAlcoholLevelOpen, setIsAlcoholLevelOpen] = useState(false);
    
    const createDropDownPicker = (items, placeholder, value, setValue, open, setOpen) => (
        <View key={placeholder}>
            <Text style={{textAlign:'center'}}>{placeholder}</Text>
            <DropDownPicker
                style={styles.dropdown}
                multiple={false}
                items={[{ label: placeholder, value: null }, ...items.map((item) => ({ label: item, value: item }))]}
                placeholder={placeholder}
                value={value}
                setValue={(value:any) => setValue(value())}
                open={open}
                setOpen={setOpen}
                scrollViewProps={{ persistentScrollbar: true }}
                listMode="MODAL"
                modalProps={{ animationType: 'fade' }}
            />
        </View>
    );

    return (
        <View>
            <Pressable 
                style={{backgroundColor: '#000', padding: 10, margin: 10, borderRadius: 5}}
                onPress={() => {
                    setFiltersVisible(!filtersVisible)
                }}
            >
                <Text style={{color: '#fff', textAlign: 'center'}}>{filtersVisible ? "X" : "+"} Filters</Text>
            </Pressable>
            <ScrollView 
                horizontal 
                style={[
                    filtersVisible ? {display: "flex"} : {display: "none"},
                    styles.container
                ]}
            >
                {createDropDownPicker(filters.categories, "Category", currentSearch.category, currentSearch.setCategory, isCategoryOpen, setIsCategoryOpen)}
                {createDropDownPicker(filters.ingredients, "Ingredient", currentSearch.ingredient, currentSearch.setIngredient, isIngredientOpen, setIsIngredientOpen)}
                {createDropDownPicker(filters.glasses, "Glass", currentSearch.glass, currentSearch.setGlass, isGlassOpen, setIsGlassOpen)}
                {createDropDownPicker(filters.alcoholsLevel, "Alcohol Level", currentSearch.alcoholLevel, currentSearch.setAlcoholLevel, isAlcoholLevelOpen, setIsAlcoholLevelOpen)}
            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderBottomColor: '#000',
        flexDirection: 'row',
        gap: 0,
        marginHorizontal: 5,
        height: 80
    },
    dropdown: {
        height: 40,
        width: 'auto',
        marginHorizontal: 10,
        borderColor: '#000',
    },
});