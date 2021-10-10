import React from "react";
import { Headline, Surface, TouchableRipple } from "react-native-paper";
import { HomeDIrectoryProps } from "../../interfaces/shared_components";
import styles from "./styles";

const HomeDirectory: React.FC<HomeDIrectoryProps> = ({
  color,
  onAction,
  title,
}) => {
  return (
    <TouchableRipple
      style={[styles.surface, { backgroundColor: color }]}
      onPress={() => onAction()}
    >
      <Surface style={styles.surfaceView}>
        <Headline style={styles.itemText}>{title}</Headline>
      </Surface>
    </TouchableRipple>
  );
};

export default HomeDirectory;
