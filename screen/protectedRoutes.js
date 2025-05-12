import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ProfileScreen from "./protected/profilescreen";
import AboutScreen from "./protected/aboutscreen";
import HomeScreen from "./protected/homescreen";
import EditProfile from "./protected/editProfile";
import GetMessageScreen from "./protected/getmessagescreen";
import AllMessageScreen from "./protected/allmessagescreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ProfileStack({ setIsLoggedIn }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileMain" options={{ title: "Main Profile" }}>
        {() => <ProfileScreen setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>

      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ title: "Edit Profile" }}
      />
    </Stack.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home">{() => <HomeScreen />}</Stack.Screen>
      <Stack.Screen
        name="Getmessage"
        options={{ title: "Get Message" }}
        component={GetMessageScreen}
      />
      <Stack.Screen
        name="Allmessage"
        options={{ title: "All Message" }}
        component={AllMessageScreen}
      />
    </Stack.Navigator>
  );
}

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
          headerShown: false,
        }}
      >
        {() => <ProfileStack setIsLoggedIn={setIsLoggedIn} />}
      </Tab.Screen>

      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Entypo name="home" size={24} color={color} />;
          },
          headerShown: false,
        }}
      >
        {() => <HomeStack />}
      </Tab.Screen>
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
