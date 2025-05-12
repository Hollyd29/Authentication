import { Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

function HomeScreen() {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.navigate("Getmessage")}>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur quo
        aliquam perferendis error hic ab neque eum tempora, alias est architecto
        autem quae asperiores iste! Aut numquam quae similique doloremque illum
        tempora iste quam? Dolorum, accusamus enim, dignissimos aspernatur
        laborum officia, laudantium aliquid quia reiciendis perferendis
        assumenda sequi soluta facere?
      </Text>
    </Pressable>
  );
}

export default HomeScreen;
