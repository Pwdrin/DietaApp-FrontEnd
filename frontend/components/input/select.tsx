import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Controller, set } from "react-hook-form";
import { colors } from "../../constants/colors";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";

interface OptionsProps {
  label: string;
  value: string | number;
}

interface SelectProps {
  name: string;
  control: any;
  placeholder?: string;
  error?: string;
  options: OptionsProps[];
}

export function Select({
  name,
  control,
  placeholder,
  error,
  options,
}: SelectProps) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={style.container}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TouchableOpacity
              style={style.select}
              onPress={() => setVisible(true)}
            >
              <Text>
                {value
                  ? options.find((option) => option.value === value)?.label
                  : placeholder}
              </Text>
              <Feather name="arrow-down" size={16} color={colors.dark} />
            </TouchableOpacity>
            <Modal
              visible={visible}
              animationType="fade"
              transparent={true}
              onRequestClose={() => setVisible(false)}
            >
              <TouchableOpacity
                style={style.modalContainer}
                activeOpacity={1}
                onPress={() => setVisible(false)}
              >
                <TouchableOpacity style={style.modalContent} activeOpacity={1}>
                  <FlatList
                    contentContainerStyle={{ gap: 4 }}
                    data={options}
                    keyExtractor={(item) => item.value.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={style.options}
                        onPress={() => {
                          onChange(item.value);
                          setVisible(false);
                        }}
                      >
                        <Text style={style.txt}>{item.label}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            </Modal>
          </>
        )}
      />
      {error && <Text style={style.errorText}>{error} </Text>}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  errorText: {
    color: "red",
    marginTop: 4,
  },
  select: {
    flexDirection: "row",
    height: 44,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  modalContainer: {
    backgroundColor: "rgba(41, 67, 28,0.5)",
    flex: 1,
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: colors.background,
    marginHorizontal: 10,
    borderRadius: 8,
    padding: 20,
  },
  options: {
    padding: 14,
    backgroundColor: "#86AD72",
    color: colors.background,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  txt: {
    color: colors.background,
    fontWeight: "bold",
  },
});
