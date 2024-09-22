import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { colors } from "../constants/colors";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={style.container}>
      <Image source={require("../assets/images/logo.png")} />
      <Text style={style.tittle}>
        Saudável<Text style={{ color: colors.bamboo }}>.IA</Text>
      </Text>
      <Text style={style.text}>
        Sua dieta personalizada com inteligência artificial
      </Text>
      <Link href={"/step"} asChild>
        <Pressable style={style.btn}>
          <Text style={style.btntext}>Gerar dieta</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16,
  },
  tittle: {
    fontSize: 40,
    fontWeight: "bold",
    color: colors.clear,
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.dark,
  },
  btn: {
    backgroundColor: colors.bamboo,
    width: "50%",
    height: 40,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    shadowColor: colors.bamboo,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  btntext: {
    color: colors.background,
    fontSize: 16,
    fontWeight: "bold",
  },
});
