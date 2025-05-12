import { Button, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

function GetMessageScreen() {
  const Navigation = useNavigation();
  return (
    <View style={{ marginTop: "50%" }}>
      <Text style={{ marginBottom: 100 }}>
        Click button to get full message
      </Text>
      <Button
        title="Click Here"
        onPress={() => Navigation.navigate("Allmessage")}
      />
    </View>
  );
}

export default GetMessageScreen;
