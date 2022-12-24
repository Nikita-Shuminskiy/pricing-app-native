import {Navigations} from "./src/navigation/navigations";
import * as React from 'react';
import {NativeBaseProvider} from "native-base";
import {useEffect} from "react";
import NetInfo from "@react-native-community/netinfo";
import {createAlert} from "./src/common/components/alert";
import {StatusBar} from 'expo-status-bar';

const App = () => {
    useEffect(() => {
        NetInfo.addEventListener((state) => {
            const offline = !(state.isConnected && state.isInternetReachable);
            if (offline) {
                createAlert({
                    title: 'Сообщение',
                    message: "Отсутствует подключение к интернету",
                    buttons: [{text: 'Выйти', style: "cancel"}]
                })
            }
        });
    })
    return (
        <NativeBaseProvider>
            <StatusBar hidden={false} style={'auto'} animated={true} translucent={true}/>
            <Navigations/>
        </NativeBaseProvider>
    );
}

export default App;