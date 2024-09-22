import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Share,
} from "react-native";
import { useDataStore } from "../../store/data";
import { api } from "../../services/api";
import { useQuery } from "@tanstack/react-query";
import { colors } from "../../constants/colors";
import { Data } from "../../types/data";
import { Link, router } from "expo-router";
import { Ionicons, Feather } from "@expo/vector-icons";

interface ResponseData {
  data: Data;
}

export default function Diet() {
  const user = useDataStore((state) => state.user);

  const { data, isFetching, error } = useQuery({
    queryKey: ["diet"],
    queryFn: async () => {
      try {
        if (!user) {
          throw new Error("Filed load diet");
        }
        const response = await api.post<ResponseData>("/create", {
          name: user.name,
          age: user.age,
          gender: user.gender,
          height: user.height,
          weight: user.weight,
          objective: user.objective,
          level: user.level,
        });

        return response.data.data;
      } catch (error) {
        console.log(error);
      }
    },
  });
  async function handleShare() {
    try {
      if (data && Object.keys(data).length === 0) return;
      const supplements = `${data?.suplementos.map((item) => `${item}`)}`;
      const foods = `${data?.refeicoes.map(
        (item) =>
          `\n- Nome: ${item.nome}\n- Horário: ${
            item.horario
          }\n Alimentos: ${item.alimentos.map((alimento) => `${alimento}`)} `
      )}`;
      const message = `Dieta: ${data?.nome} -Objetivo: ${data?.objetivo}\n\n- Dica Suplemento: ${supplements}`;
      await Share.share({
        message: message,
      });
    } catch (error) {
      console.log(error);
    }
  }

  if (isFetching) {
    return (
      <View style={style.loading}>
        <Text style={style.loadingText}>Estamos gerando sua dieta</Text>
        <Text style={style.loadingText}>Anotando os últimos detalhes...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={style.loading}>
        <Text style={style.loadingText}>Falha ao gerar dieta</Text>
        <Link href="/">
          <Text style={style.loadingText}>Tente novamente</Text>
        </Link>
      </View>
    );
  }

  return (
    <View style={style.container}>
      <View style={style.containerHeader}>
        <View style={style.contentHeader}>
          <Text style={style.tittle}>Minha dieta</Text>
          <Pressable style={style.buttonShare}>
            <Text style={style.buttonShareText} onPress={handleShare}>
              Compartilhar
            </Text>
          </Pressable>
        </View>
      </View>
      <View style={{ paddingLeft: 16, paddingRight: 16, flex: 1 }}>
        {data && Object.keys(data).length > 0 && (
          <>
            <Text style={style.name}>{data.nome}</Text>
            <Text style={style.objective}>Foco: {data.objetivo}</Text>

            <Text style={style.label}>Refeições:</Text>

            <ScrollView>
              <View style={style.foods}>
                {data.refeicoes.map((refeicao) => (
                  <View key={refeicao.nome} style={style.food}>
                    <View style={style.foodHeader}>
                      <Text style={style.foodName}>{refeicao.nome}</Text>
                      <Ionicons name="restaurant" size={16} color="#29431C" />
                    </View>
                    <View style={style.foodContent}>
                      <Feather name="clock" size={16} color="#29431C" />
                      <Text>Horário: {refeicao.horario}</Text>
                    </View>
                    <Text style={style.foodText}>
                      Alimentos:{"\n"}
                      {refeicao.alimentos.map((alimento) => (
                        <Text key={alimento}>
                          {" "}
                          {alimento}
                          {"\n"}
                        </Text>
                      ))}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={style.suplements}>
                <Text style={style.foodName}>Dica de suplemento: </Text>
                {data.suplementos.map((item) => (
                  <Text key={item}>{item}</Text>
                ))}
              </View>
              <Pressable
                style={style.button}
                onPress={() => router.replace("/")}
              >
                <Text style={style.buttonText}>Gerar nova dieta</Text>
              </Pressable>
            </ScrollView>
          </>
        )}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  },
  loadingText: {
    fontSize: 18,
    color: colors.dark,
    marginBottom: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: colors.bamboo,
    flex: 1,
  },
  containerHeader: {
    backgroundColor: colors.dark,
    borderBottomLeftRadius: 14,
    borderTopRightRadius: 14,
    paddingTop: 60,
    paddingBottom: 20,
    marginBottom: 16,
  },
  contentHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 16,
    paddingRight: 16,
  },
  tittle: {
    fontSize: 30,
    color: colors.background,
    fontWeight: "bold",
  },
  buttonShare: {
    backgroundColor: colors.clear,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    borderRadius: 4,
  },
  buttonShareText: {
    color: colors.background,
    fontWeight: "bold",
  },
  name: {
    fontSize: 25,
    color: colors.background,
    fontWeight: "bold",
  },
  objective: {
    fontSize: 16,
    color: colors.background,
    marginBottom: 24,
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    color: colors.background,
    fontWeight: "bold",
  },
  foods: {
    backgroundColor: colors.background,
    padding: 14,
    borderRadius: 8,
    marginTop: 8,
    gap: 8,
  },
  food: {
    backgroundColor: "rgba(208, 208, 208, 0.40)",
    padding: 8,
    borderRadius: 4,
  },
  foodHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  foodName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  foodContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  foodText: {
    fontSize: 16,
    marginBottom: 4,
    marginTop: 14,
  },
  suplements: {
    backgroundColor: colors.background,
    marginTop: 14,
    marginBottom: 14,
    padding: 14,
    borderRadius: 8,
  },
  button: {
    backgroundColor: colors.clear,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    marginBottom: 24,
  },
  buttonText: {
    color: colors.background,
    fontWeight: "bold",
    fontSize: 16,
  },
});
