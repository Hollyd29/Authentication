import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ProfileScreen from "./protected/profilescreen";
import AboutScreen from "./protected/aboutscreen";
import HomeScreen from "./protected/homescreen";

const Tab = createBottomTabNavigator();

function ProtectRoutes({ setIsLoggedIn }) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveBackgroundColor: "#00b4d8",
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#219ebc",
      }}
    >
      <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Entypo name="user" size={24} color={color} />;
          },
        }}
      >
        {() => <ProfileScreen setIsLoggingIn={setIsLoggedIn} />}
      </Tab.Screen>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Entypo name="home" size={24} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialCommunityIcons
                name="card-account-details"
                size={24}
                color={color}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default ProtectRoutes;
