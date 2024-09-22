import {
  View,
  StyleSheet,
  Text,
  TextInput,
  KeyboardTypeOptions,
} from "react-native";
import { Controller } from "react-hook-form";
import { colors } from "../../constants/colors";

interface InputProps {
  name: string;
  control: any;
  placeholder?: string;
  rules?: object;
  error?: string;
  keyboardType: KeyboardTypeOptions;
}

export function Input({
  name,
  control,
  placeholder,
  rules,
  error,
  keyboardType,
}: InputProps) {
  return (
    <View style={style.container}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={style.input}
            placeholder={placeholder}
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
            keyboardType={keyboardType}
          />
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
  input: {
    height: 44,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  errorText: {
    color: "red",
    marginTop: 4,
  },
});
