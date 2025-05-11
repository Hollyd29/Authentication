import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Button, Text, View } from "react-native";
import { getToken, removeToken } from "../../utils/tokenStorage";

function ProfileScreen({ setIsLoggedIn }) {
  const navigation = useNavigation();

  function handleLogout() {
    removeToken();
    setIsLoggedIn(null);
  }

  useEffect(() => {
    // console.log("I am token", getToken());
    // getToken().then((token) => {
    //   console.log("Retrieved token:", token);
    // });

    navigation.setOptions({
      headerRight: () => {
        return (
          <View style={{ paddingRight: 16 }}>
            <Button title="Logout" onPress={handleLogout} />
          </View>
        );
      },
    });
  }, []);

  return (
    <View>
      <Text>Name: OLADIMEJI OLAPEJU</Text>
      <Text>Age: UNDIFINE</Text>
      <Text>Sex: MALE</Text>
      <Text>Habit: ALWAYS TRY MY BEST TO MAKE GOOD EARNINGS</Text>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginInline: "auto",
          gap: 8,
          marginTop: 8,
        }}
      >
        <Button title="Profile" />
        <Button title="Settings" />
      </View>
    </View>
  );
}

export default ProfileScreen;
