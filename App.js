import { StatusBar } from "expo-status-bar";
import { Button, TouchableWithoutFeedback, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RegisterScreen from "./screen/unprotected/registerscreen.js";
import LoginScreen from "./screen/unprotected/loginscreen.js";
import Toast from "react-native-toast-message";
import ProfileScreen from "./screen/protected/profilescreen.js";
import { getToken, setToken } from "./utils/tokenStorage.js";
import { useEffect, useState } from "react";
import HomeScreen from "./screen/protected/homescreen.js";
import AboutScreen from "./screen/protected/aboutscreen.js";
import ProtectRoutes from "./screen/protectedRoutes.js";
import UnprotectedRoutes from "./screen/unProtectedRoutes.js";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(true);

  useEffect(() => {
    getToken().then((storedToken) => {
      setIsLoggedIn(storedToken);
      setIsLoginLoading(false);
    });
  }, []);

  if (isLoginLoading) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <NavigationContainer>
        {isLoggedIn ? (
          <ProtectRoutes setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <UnprotectedRoutes
            setIsLoggedIn={setIsLoggedIn}
            setIsLoginLoading={setIsLoginLoading}
          />
        )}
      </NavigationContainer>

      <Toast />
    </View>
  );
}

export default App;
