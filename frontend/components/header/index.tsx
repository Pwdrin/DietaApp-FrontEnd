import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../constants/colors";
import { router } from "expo-router";

interface HeaderProps {
  step: string;
  tittle: string;
}

export function Header({ step, tittle }: HeaderProps) {
  return (
    <SafeAreaView style={style.container}>
      <View style={style.content}>
        <View style={style.row}>
          <Pressable onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color={colors.background} />
          </Pressable>
          <Text style={style.text}>
            {step}
            <Feather name="loader" size={16} color={colors.background} />
          </Text>
        </View>
        <Text style={style.tittle}>{tittle}</Text>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: colors.dark,
    borderBottomRightRadius: 14,
    borderBottomLeftRadius: 14,
    marginBottom: 14,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight! + 34 : 34,
  },
  content: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 34,
    borderBottomRightRadius: 14,
    borderBottomLeftRadius: 14,
  },
  row: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: colors.background,
  },
  tittle: {
    marginTop: 15,
    fontSize: 30,
    fontWeight: "bold",
    color: colors.background,
  },
});
