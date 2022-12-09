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
import RegistrationScreen from "../screen/RegistrationScreen";
import {ActivityIndicator, View, StyleSheet} from "react-native";
import {colors} from "../assets/colors/colors";


const Stack = createNativeStackNavigator();
export const MainNavigation = observer(() => {
    const {isLoading} = NotificationStore;
    const {isAuth} = AuthStore;

    useEffect(() => {
        if (getToken()) {
            RootStore.AuthStoreService.checkAuth();
        }
    }, []);
    if (isLoading === LoadingEnum.fetching) {

        return <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color={colors.orange}/>
        </View>
    }
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={"main"}>
                {
                    isAuth ? (
                        <Stack.Screen options={{title: 'Главная страница'}} name={"main"} component={MainScreen}/>
                    ) : (
                        <React.Fragment>
                            <Stack.Screen options={{title: 'Вход'}}
                                          name="login"
                                          component={LoginScreen}/>
                            <Stack.Screen options={{title: 'Регистрация'}}
                                          name="registration"
                                          component={RegistrationScreen}/>
                        </React.Fragment>
                    )
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
});
