import React from 'react';
import {Image, StyleSheet, View} from "react-native";
import logo from "../../assets/logo/logo-pony-web.png";
import SafeAreaView from "./safe-area-view";
import {Spinner} from "native-base";

const Loading = () => {
    return (
        <SafeAreaView>
            <View style={style.container}>
                <Image style={style.logo} resizeMode={'contain'} source={logo}/>
                <Spinner size={'lg'} color="warning.500"/>
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