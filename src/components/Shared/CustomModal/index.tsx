import { useTheme } from "@react-navigation/native";
import React from "react";
import { Modal, Portal } from "react-native-paper";
import { combinedDarkTheme, combinedDefaultTheme } from "../../../constants/theme";
import { CustomModalProps } from "../../../interfaces/shared_components";
import styles from "./styles";

const CustomModal: React.FC<CustomModalProps> = ({ visible, onDismiss, children }) => {
  const { dark } = useTheme();
  return (
    <Portal>
      <Modal
        theme={dark ? combinedDarkTheme : combinedDefaultTheme}
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.container}
      >
        {children}
      </Modal>
    </Portal>
  );
};

export default CustomModal;
