import React from 'react';
import {ActivityIndicator, Image, StyleSheet, View} from "react-native";
import {colors} from "../../assets/colors/colors";
import logo from "../../assets/logo/logo-pony-web.png";
import SafeAreaView from "./safe-area-view";

const Loading = () => {
    return (
        <SafeAreaView>
            <View style={style.container}>
                <Image style={style.logo} resizeMode={'contain'} source={logo}/>
                <ActivityIndicator size="large" color={colors.orange}/>
            </View>
        </SafeAreaView>
    );
};
const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: "center",
    },
    logo: {
        position: 'absolute',
        top: 0,
        width: 150,
        height: 150,
    }
})
export default Loading;