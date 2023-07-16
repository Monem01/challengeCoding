import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Screens/Home";
import Details from "../Screens/Details";
import Favorites from "../Screens/Favourites";
const Stack = createStackNavigator();
function MyStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home"  component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="Detail" component={Details} options={{headerShown: false}} />
        <Stack.Screen name="favorites" component={Favorites} options={{headerShown: false}} />
      </Stack.Navigator>
    );
  }
  export default MyStack;