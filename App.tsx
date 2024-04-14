import { Modal, StyleSheet, View } from 'react-native';
import { Home } from './src/components/page/Home';
import { CurrentSearchContext, CurrentSearchType, FilterContext, FiltersContextType } from './src/store/FilterStore';
import { useEffect, useState } from 'react';
import * as API from './src/data/API';
import { LoadingSpinner } from './src/components/_partials/LoadingSpinner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { FavoritesContext, FavoritesContextType } from './src/store/FavoriteStore';
import { FavoritesPage } from './src/components/page/Favorites';
import { Footer } from './src/components/_partials/Footer';
import { CocktailDetails } from './src/components/_partials/CocktailDetails';
import { Cocktail } from './src/data/Cocktails';

export type Pages = 'home' | 'favorites';

export default function App() {
	
	const [currentPage, setCurrentPage] = useState<Pages>('home');
	const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState<FiltersContextType>({
        categories: [],
        ingredients: [],
        glasses: [],
        alcoholsLevel: [],
    });

	const [currentSearch, setCurrentSearch] = useState<CurrentSearchType>({
		name: '',
		setName: (newName) => {
			setCurrentSearch(prevSearch => ({...prevSearch, name:newName}));
		},
		category: '',
		setCategory: (newCategory) => {
			setCurrentSearch(prevSearch => ({...prevSearch, category:newCategory}));
		},
		ingredient: '',
		setIngredient: (newIngredient) => {
			setCurrentSearch(prevSearch => ({...prevSearch, ingredient: newIngredient}));
		},
		glass: '',
		setGlass: (newGlass) => {
			setCurrentSearch(prevSearch => ({...prevSearch, glass:newGlass}));
		},
		alcoholLevel: '',
		setAlcoholLevel: (newAlcoholLevel) => {
			setCurrentSearch(prevSearch => ({...prevSearch, alcoholLevel:newAlcoholLevel}));
		},
		result: [],
		setResult: async (newResult) => {
			let setNewResult = newResult;
			if (!newResult || newResult.length === 0) {
				setNewResult = await API.getHomePageResults();
			}
			setCurrentSearch(prevSearch => ({...prevSearch, result:setNewResult}));
		},
	});

	const [favorites, setFavorites] = useState<FavoritesContextType>({
		drinks: new Set<API.FilterResult>(),
		addDrink: (drink:API.FilterResult) => {
			setFavorites(prevFavorites => {
				const newDrinks = new Set(prevFavorites.drinks);
				newDrinks.add(drink);
				return {...prevFavorites, drinks: newDrinks};
			});
		},
		removeDrink: (drink:API.FilterResult) => {
			setFavorites(prevFavorites => {
				const newDrinks = new Set(prevFavorites.drinks);
				newDrinks.delete(drink);
				return {...prevFavorites, drinks: newDrinks};
			});
		}
	});

	useEffect(() => {
		const loadFavorites = async () => {
			const storedFavorites = await AsyncStorage.getItem('favorites');
			if (storedFavorites) {
				const jsonFavs = JSON.parse(storedFavorites);
				if (Array.isArray(jsonFavs.drinks)) {
					setFavorites(prevFavorites => ({...prevFavorites, drinks: new Set(jsonFavs.drinks)}));
				}
			}
		};
	
        (async () => {
			await loadFavorites();
			const allFilters = await API.fetchAllFilters();
			setFilters(allFilters);
			setLoading(false);

			const homeResult = await API.getHomePageResults();
			currentSearch.setResult(homeResult);
		})();
    }, []);

	useEffect(() => {
		(async () => {
			await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
		})();
	}, [favorites]);

	const [selectedCocktail, setSelectedCocktail] = useState<API.FilterResult | null>(null);

	return (
		<FavoritesContext.Provider value={favorites}>
			<FilterContext.Provider value={filters}>
				<CurrentSearchContext.Provider value={currentSearch}>
					<View style={styles.container}>
						{ loading && <LoadingSpinner /> }
						{ !loading && (
							<>
								{currentPage === 'home' && <Home setSelectedCocktail={setSelectedCocktail} />}
								{currentPage === 'favorites' && <FavoritesPage setSelectedCocktail={setSelectedCocktail} />}
								<Footer currentPage={currentPage} setPage={setCurrentPage} />
							</>
						)}
						<Modal
							visible={!!selectedCocktail}
							animationType="slide"
							onRequestClose={() => setSelectedCocktail(null)}
						>
							<CocktailDetails
								key={selectedCocktail?.idDrink}
								filterResult={selectedCocktail}
							/>
						</Modal>
					</View>
				</CurrentSearchContext.Provider>
			</FilterContext.Provider>
		</FavoritesContext.Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: Constants.statusBarHeight,
		backgroundColor: '#fff',
	},
});
