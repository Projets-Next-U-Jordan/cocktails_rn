import { Pressable, StyleSheet, Text, View } from "react-native";
import { IconHome, IconStar } from "../Icons";
import { Pages } from "../../../App";

type FooterProps = {
    currentPage: Pages
    setPage: (page: Pages) => void
}

export const Footer = ({currentPage, setPage}:FooterProps) => {
    return (
        <View style={styles.container}>
            <Pressable
                style={styles.footerButton}
                onPress={() => {setPage("home")}}
            >
                <IconHome 
                    style={{margin: 10, borderColor: '#000'}} 
                    size={30} 
                    color="#000" 
                    filled={currentPage === "home"}
                />
            </Pressable>
            <Pressable
                style={styles.footerButton}
                onPress={() => {setPage("favorites")}}
            >
                <IconStar
                    style={{margin: 10}}
                    size={30}
                    color="#000"
                    filled={currentPage === "favorites"}
                />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderTopWidth: 1,
        borderTopColor: '#000',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    footerButton: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#000',
        borderRightWidth: 1,
    }
});