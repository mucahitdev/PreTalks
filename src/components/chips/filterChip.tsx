import React, { FC } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface FilterChipProps {
  id: number;
  name: string;
  onPress: (id: number) => void;
  selectedOptionId: number;
}

const FilterChip: FC<FilterChipProps> = ({
  name,
  onPress,
  id,
  selectedOptionId,
}) => {
  const isSelected = selectedOptionId === id;
  return (
    <TouchableOpacity
      onPress={() => onPress(id)}
      style={[styles.container, isSelected && styles.selectedcontainer]}
    >
      <Text style={styles.label}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
  },
  selectedcontainer: {
    backgroundColor: "pink",
  },
  label: {
    textAlignVertical: "center",
    color: "#000",
    fontSize: 20,
    textAlign: "center",
  },
});

export default FilterChip;
