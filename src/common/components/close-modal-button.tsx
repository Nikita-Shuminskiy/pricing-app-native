import {StyleSheet, TouchableOpacity} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {colors} from "../../assets/colors/colors";
import React from "react";
type CloseButtonModalProps = {
    onClose: () => void
}

export const CloseModalButton = ({onClose}: CloseButtonModalProps) => {
    return <TouchableOpacity onPress={() => onClose()} style={styles.closeIco}>
        <Ionicons name="close-circle-outline" size={34} color={colors.black}/>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    closeIco: {
        position: 'absolute',
        right: 20,
        top: 20,
        padding: 20
    },
});
