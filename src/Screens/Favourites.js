import React, { useContext } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import goback from '../../assets/goback.png';
import minus from '../../assets/minus.png';

import {useNavigation} from '@react-navigation/native';
import { FavoritesContext } from '../FavoritesContext';

const Favorites = () => {
    const movies=[
        {
            "adult": false,
            "backdrop_path": "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
            "genre_ids": [
              18,
              80
            ],
            "id": 238,
            "original_language": "en",
            "original_title": "The Godfather",
            "overview": "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.",
            "popularity": 134.929,
            "poster_path": "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
            "release_date": "1972-03-14",
            "title": "The Godfather",
            "video": false,
            "vote_average": 8.7,
            "vote_count": 18221
          },
          {
            "adult": false,
            "backdrop_path": "/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
            "genre_ids": [
              18,
              80
            ],
            "id": 278,
            "original_language": "en",
            "original_title": "The Shawshank Redemption",
            "overview": "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.",
            "popularity": 94.107,
            "poster_path": "/lyQBXzOQSuE59IsHyhrp0qIiPAz.jpg",
            "release_date": "1994-09-23",
            "title": "The Shawshank Redemption",
            "video": false,
            "vote_average": 8.7,
            "vote_count": 24112
          },
          {
            "adult": false,
            "backdrop_path": "/kGzFbGhp99zva6oZODW5atUtnqi.jpg",
            "genre_ids": [
              18,
              80
            ],
            "id": 240,
            "original_language": "en",
            "original_title": "The Godfather Part II",
            "overview": "In the continuing saga of the Corleone crime family, a young Vito Corleone grows up in Sicily and in 1910s New York. In the 1950s, Michael Corleone attempts to expand the family business into Las Vegas, Hollywood and Cuba.",
            "popularity": 64.684,
            "poster_path": "/bMadFzhjy9T7R8J48QGq1ngWNAK.jpg",
            "release_date": "1974-12-20",
            "title": "The Godfather Part II",
            "video": false,
            "vote_average": 8.6,
            "vote_count": 10994
          },
          {
            "adult": false,
            "backdrop_path": "/zb6fM1CX41D9rF9hdgclu0peUmy.jpg",
            "genre_ids": [
              18,
              36,
              10752
            ],
            "id": 424,
            "original_language": "en",
            "original_title": "Schindler's List",
            "overview": "The true story of how businessman Oskar Schindler saved over a thousand Jewish lives from the Nazis while they worked as slaves in his factory during World War II.",
            "popularity": 45.989,
            "poster_path": "/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg",
            "release_date": "1993-12-15",
            "title": "Schindler's List",
            "video": false,
            "vote_average": 8.6,
            "vote_count": 14247
          },
         
    ]
  const navigation = useNavigation();
  
    const hundelGoback = () => {
      navigation.navigate('Home');
    };
    const hundelNavigate=(data)=>{
      navigation.navigate('Detail',{data})
      }
      const {removeFromFavorites}=useContext(FavoritesContext);
    const hundelRemoveMovies=(id)=>{
      removeFromFavorites(id)
    }
    const {favorites}=useContext(FavoritesContext)
  return (
    <View styles={styles.container}>
      <View styles={styles.firstSection}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={hundelGoback}>
          <Image
            source={goback}
            style={{width: 50, height: 50, borderRadius: 50, margin: 10}}
          />
          <View style={{marginLeft:'20%'}}>
            <Text style={{fontSize:30,color:'#111111'}}>Favourites</Text>
          </View>
        </TouchableOpacity>
      </View>
      <FlatList
        data={favorites}
        renderItem={({ item }) => (
            <TouchableOpacity style={styles.list_of_movies} onPress={()=>{hundelNavigate(item)}} >
                <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`}} style={styles.movieImage} />
                <TouchableOpacity style={{alignItems:'flex-end', width:150,position:'absolute',padding:5}} onPress={()=>{hundelRemoveMovies(item.id)}}>
                <Image source={minus} style={styles.minus}/>
                </TouchableOpacity>
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
  firstSection: {
    flexDirection: 'row',
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
  },
  minus:{
    width:30,
    height:30,
  }
});
export default Favorites;
