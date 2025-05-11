import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Button, Text, View } from "react-native";
import { getToken, removeToken } from "../utils/tokenStorage";

function ProfileScreen({ setIsLoggingIn }) {
  const navigation = useNavigation();

  function handleLogout() {
    removeToken();
    setIsLoggingIn(null);
  }

  useEffect(() => {
    // console.log("I am token", getToken());
    // getToken().then((token) => {
    //   console.log("Retrieved token:", token);
    // });

    navigation.setOptions({
      headerRight: () => {
        return <Button title="Logout" onPress={handleLogout} />;
      },
    });
  }, []);

  return (
    <View>
      <Text>Name: OLADIMEJI OLAPEJU</Text>
      <Text>Age: UNDIFINE</Text>
      <Text>Sex: MALE</Text>
      <Text>Habit: ALWAYS TRY MY BEST TO MAKE GOOD EARNINGS</Text>
    </View>
  );
}

export default ProfileScreen;
