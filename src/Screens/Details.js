import React,{useContext,useState,useEffect} from "react";
import { StyleSheet, View, ImageBackground, Image, Text, TouchableOpacity,Animated } from "react-native";
import goback from '../../assets/goback.png'
import addFavorites from '../../assets/addFavorites.png'
import { useNavigation } from '@react-navigation/native';
import { FavoritesContext } from "../FavoritesContext";
const  Details =({route})=>{
    const {data} = route.params;
    const navigation = useNavigation();
    const [isAnimated, setIsAnimated] = useState(false);
    const animatedScale = useState(new Animated.Value(1))[0];

    const hundelGoback=()=>{
        navigation.goBack();
    }
    const {addToFavorites} =useContext(FavoritesContext)
    const hundelAddToFavorite=()=> {
        addToFavorites(data);
        setIsAnimated(true);
        // navigation.navigate('favorites')
    }
    useEffect(() => {
        // exécuter l'animation lorsque isAnimated est true.
        if (isAnimated) {
          Animated.sequence([
            // réalisée lannimation avec deux étapes
             // l'image passe de 1 à 0.5 en 400 millisecondes
            Animated.timing(animatedScale, {
              toValue: 0.5,
              duration: 400,
              useNativeDriver: true,
            }),
            // l'image revient a 1 en 400 millisecondes
            Animated.timing(animatedScale, {
              toValue: 1,
              duration: 400,
              useNativeDriver: true,
            }),
          ]).start(() => {
            setIsAnimated(false);
          });
        }
      }, [isAnimated, animatedScale]);
return(
    <View style={styles.container}>
        {/* section 1 */}
        <ImageBackground source={{ uri: `https://image.tmdb.org/t/p/w500${data.poster_path}`}} style={styles.section1}>
            {/* sub Section 1 */}
           <View style={{flexDirection:'row',justifyContent:'space-between'}}>
           <TouchableOpacity style={{margin:2}} onPress={hundelGoback}>
                <Image source={goback} style={{width:50,height:50,borderRadius:50,margin:10}}/>
            </TouchableOpacity>
            <TouchableOpacity style={{ margin: 2 }} onPress={hundelAddToFavorite}>
          <Animated.Image
            source={addFavorites}
            style={[styles.addFavorites, { transform: [{ scale: animatedScale }] }]}
          />
        </TouchableOpacity>
           </View>
            {/* sub Section 1 */}
<View style={{backgroundColor:'white',marginTop:'42%',borderBottomWidth:2}}>
            {/* sub Section 2 */}
            <View style={styles.subSection2}>
                <Text style={{color:'#111111',fontSize:20}}>{data.title}</Text>
                <Text style={{color:'#111111',fontSize:15}}>Rating</Text>
            </View>
            <Text style={{color:'#111111',marginHorizontal:20,fontSize:15}}>{data.release_date}</Text>
            <View style={styles.subSection3}>
                <View style={styles.type}>
                <Text style={{color:'#111111',fontSize:15}}>Action</Text>
                </View>
                <View style={[styles.type,{marginLeft:20}]}>
                <Text style={{color:'#111111',fontSize:15}}>Herror</Text>
                </View>
            </View>
            </View>
            {/* sub Section 2*/}
    </ImageBackground>
    <View style={{marginTop:10}}>
    <Text style={{color:'#111111',fontSize:25,margin:10}}>OverView </Text>
    </View>
    <View style={{margin:10,borderWidth:1,flex:0.3}}>
        <Text style={styles.overview}>{data.overview}</Text>
    </View>
    </View>
)
}


const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    section1:{
       height:'100%' ,
       flex:0.6,
    },
    subSection2:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:20,

    },
    subSection3:{
        flexDirection:'row',
        // justifyContent:'',
        marginHorizontal:20,
    },
    type:{
        borderWidth:2,
        height:40,
        width:100,
        marginTop:20,
        justifyContent:"center",
        alignItems:'center',
        marginBottom:10,
        borderRadius:20
    },
    overview:{
        fontSize:15,
        textAlign:'justify',
        margin:10,
        color:'#111111'
    },addFavorites:{
        width:50,height:40,borderRadius:50,margin:10
    }
});
export default Details;