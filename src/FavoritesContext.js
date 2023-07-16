import React,{Context,createContext,useState} from "react";
// 1- creation du contexte
export const FavoritesContext=createContext();
// 2- la creation d'un composant FavoritesProvider qui sera responsable de la gestion de l'état des favoris
export const FavoritesProvider=({children})=>{
    // tableau contiendra les films favoris.
    const [favorites, setFavorites] = useState([]);

    // Add favorites
    const addToFavorites = (movie) => {
        setFavorites([...favorites, movie]);
        console.log('favorites.....',movie);
      };
    // remove Favorites
      const removeFromFavorites = (movieId) => {
        setFavorites(favorites.filter((movie) => movie.id !== movieId));
      };
      return (
        <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
          {children}
        </FavoritesContext.Provider>
      );
} 