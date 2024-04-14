import { Pressable, StyleSheet, Text, View } from "react-native";
import { IconSearch } from "../Icons";

type HeaderProps = {
    title: string
    showSearchBar: boolean
    isSearchBarOpen: boolean
    setIsSearchBarOpen: (isOpen: boolean) => void
}

export const Header = ({title, isSearchBarOpen, setIsSearchBarOpen, showSearchBar}:HeaderProps) => {
    return (
        <>
            <Text style={{fontSize:30, textAlign:'center'}}>{title}</Text>
            <IconSearch onClick={()=>setIsSearchBarOpen(!isSearchBarOpen)} style={{display:showSearchBar ? "flex" : "none", position: 'absolute', right: 20}} size={40} color="#000" />
        </>
    );
}