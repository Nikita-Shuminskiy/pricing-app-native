import React from 'react';
import {ActivityIndicator, StyleSheet, View} from "react-native";
import {colors} from "../../assets/colors/colors";

const Loading = () => {
    return (
        <View style={[style.container, style.horizontal]}>
            <ActivityIndicator size="large" color={colors.orange}/>
        </View>
    );
};
const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
    },
})
export default Loading;