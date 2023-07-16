import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import searchIcon from '../../assets/search_icon.png'
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import favorites from '../../assets/favorite.png'
const Home = () => {
  const [searchText, setSearchText] = useState('');
  const [movies, setMovies] = useState([]);

  const filterMovies = (data, searchText) => {
    console.log('filter.......................');
    const formattedText = searchText.toLowerCase();
    return data.filter((movies) => {
      // filtre par titre
      const { title} = movies;
      return (
        title.toLowerCase().includes(formattedText) 
      );
    });
  }
  const handleSearch = (text) => {
    setSearchText(text);
    if (text.length != 0) {
        const filteredData = filterMovies(movies, text);
        setMovies(filteredData);
      } else {
        // Si aucun texte de recherche n'est saisi, vous pouvez réinitialiser les données
        fetchMovies()
      }
  }; 
      const fetchMovies = async () => {
          try {
              const config = {
                  headers: {
                      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNWUyNzZmODgzODk1NmFlMjhhOTFjZThjY2Y0NDcwNCIsInN1YiI6IjY0YjE4NGMwZDIzNmU2MDExY2E4MDNhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BGW__IRKJSp73UcfN5nKaHyZfAwR7mARlBZchQCzk8w'
                    }
                };  
        const response = await axios.get('https://api.themoviedb.org/3/movie/top_rated',config);
        const moviesData = response.data.results;
        setMovies(moviesData); // Mettre à jour l'état "movies" avec les données récupérées
      } catch (error) {
        console.log('Erreur lors de la récupération des films :');
        console.log(error);
      }
    };
useEffect(()=>{
    fetchMovies();
},[]);
const navigation = useNavigation();

const hundelNavigate=(data)=>{
navigation.navigate('Detail',{data})
}
const hundelNavigateToFavorites=()=>{
  console.log('ffffffff');
  navigation.navigate('favorites')
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{justifyContent:'center',alignItems:'flex-end'}} onPress={()=>hundelNavigateToFavorites()}>
      <Image source={favorites} style={{width:48,height:42,margin:10,alignContent:'flex-end'}}/>
      </TouchableOpacity>
      <View style={styles.searchContainer}>
        <Image source={searchIcon} style={styles.searchIcon} />
        <TextInput
          style={styles.search}
          placeholder="Search"
          placeholderTextColor="#A9A9A9"
          onChangeText={(text)=>handleSearch(text)}
          value={searchText}
          onSubmitEditing={handleSearch}
          
        />
      </View>
      {/* Afficher les films ici en utilisant le composant FlatList */}
      <FlatList
        data={movies}
        renderItem={({ item }) => (
            <TouchableOpacity style={styles.list_of_movies} onPress={()=>{hundelNavigate(item)}} >
                <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`}} style={styles.movieImage} />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.vote_average}>{item.vote_average}</Text>
            </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        key={movies.length} // Ajoutez une clé dynamique pour forcer le rendu lors du changement du nombre de colonnes
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {
    marginRight: 10,
    width: '85%',
    color:'#111111'
  },
  searchIcon: {
    width: 30,
    height: 30,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 30,
    marginHorizontal: 10,
    marginVertical: 10,
    borderWidth: 2,
  },
  list_of_movies:{
    margin:10,
    width:'45%',
  },
  movieImage:{
    width:150,
    height:150,
    resizeMode: 'cover',
  },
  vote_average:{
    color:"#111111",
  },
  title:{
    color:"#111111",
  }
});

export default Home;
