import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { colors } from "../../constants/colors";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { router } from "expo-router";
import { useDataStore } from "../../store/data";

const schema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  age: z.string().min(1, { message: "A idade é obrigatória" }),
  weight: z.string().min(1, { message: "O peso é obrigatório" }),
  height: z.string().min(1, { message: "A altura é obrigatória" }),
});

type FormData = z.infer<typeof schema>;

export default function Step() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const setPageOne = useDataStore((state) => state.setPageOne);

  function handleCreate(data: FormData) {
    console.log("PASSANDO DADOS DA PÁG 1");
    setPageOne({
      name: data.name,
      weight: data.weight,
      height: data.height,
      age: data.age,
    });
    router.push("/create");
  }

  return (
    <View style={style.container}>
      <Header step="Passo 1  " tittle="Vamos Começar!" />

      <ScrollView style={style.content}>
        <Text style={style.label}>Nome:</Text>
        <Input
          name="name"
          control={control}
          placeholder="Digite seu nome..."
          error={errors.name?.message}
          keyboardType="default"
        />
        <Text style={style.label}>Idade:</Text>
        <Input
          name="age"
          control={control}
          placeholder="Digite sua idade..."
          error={errors.age?.message}
          keyboardType="numeric"
        />
        <Text style={style.label}>Seu peso atual:</Text>
        <Input
          name="weight"
          control={control}
          placeholder="Ex: 75"
          error={errors.weight?.message}
          keyboardType="numeric"
        />
        <Text style={style.label}>Sua altura:</Text>
        <Input
          name="height"
          control={control}
          placeholder="Digite sua altura..."
          error={errors.weight?.message}
          keyboardType="numeric"
        />
        <Pressable style={style.button} onPress={handleSubmit(handleCreate)}>
          <Text style={style.buttonText}>Avançar</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  label: {
    fontSize: 16,
    color: colors.dark,
    fontWeight: "bold",
    marginBottom: 8,
  },
  button: {
    backgroundColor: colors.bamboo,
    height: 44,
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
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: "bold",
  },
});
