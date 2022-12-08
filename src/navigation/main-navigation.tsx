import React, {useEffect} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {MainScreen} from "../screen/MainScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {observer} from "mobx-react-lite";
import AuthStore from "../store/AuthStore/auth-store";
import NotificationStore from "../store/NotificationStore";
import LoginScreen from "../screen/LoginScreen";
import RootStore from "../store/RootStore/root-store";
import {getToken} from "../utils/utils";
import {LoadingEnum} from "../store/Type/models";


const Stack = createNativeStackNavigator();
export const MainNavigation = observer(() => {
    const {isLoading, setIsLoading} = NotificationStore;
    const {isAuth} = AuthStore;

    useEffect(() => {
        if (getToken()) {
            RootStore.AuthStoreService.checkAuth();
        }
    }, []);
    if (isLoading === LoadingEnum.fetching) {
        console.log('loading')
    }
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
                {
                    isAuth ? (
                        <Stack.Screen options={{title: 'Главная страница'}} name="main">
                            {(props) => <MainScreen {...props} />}
                        </Stack.Screen>
                    ) : (
                        <Stack.Screen options={{title: 'Вход'}} name="login">
                            {(props) => <LoginScreen {...props} />}
                        </Stack.Screen>
                    )
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
});