import React, {useEffect} from 'react';import {NavigationContainer} from "@react-navigation/native";import {createNativeStackNavigator} from "@react-navigation/native-stack";import {observer} from "mobx-react-lite";import AuthStore from "../store/AuthStore/auth-store";import NotificationStore from "../store/NotificationStore";import LoginScreen from "../screen/autorizationScreens/LoginScreen";import RootStore from "../store/RootStore/root-store";import {getToken} from "../utils/utils";import {LoadingEnum} from "../store/Type/models";import RegistrationScreen from "../screen/autorizationScreens/RegistrationScreen";import {routerConstants} from "../constants/router-constants/router-constants";import MainNavigation from "./main-navigation";import Loading from "../common/components/loading";const Stack = createNativeStackNavigator();export const Navigations = observer(() => {    const {isLoading} = NotificationStore;    const {isAuth} = AuthStore;    useEffect(() => {        if (getToken()) {            RootStore.AuthStoreService.checkAuth();        }    }, []);    if (!isAuth && isLoading === LoadingEnum.fetching) {        return <Loading/>    }    return (        <NavigationContainer>            <Stack.Navigator>                {                    isAuth ? (                        <Stack.Screen options={{headerShown: false}}                                      name={routerConstants.MAIN}                                      component={MainNavigation}/>                    ) : (                        <React.Fragment>                            <Stack.Screen options={{                                title: 'Вход',                                headerTransparent: true,                                headerShadowVisible: true                            }}                                          name={routerConstants.LOGIN}                                          component={LoginScreen}/>                            <Stack.Screen                                options={{title: 'Регистрация', headerTransparent: true, headerShadowVisible: true}}                                name={routerConstants.REGISTRATION}                                component={RegistrationScreen}/>                        </React.Fragment>                    )                }            </Stack.Navigator>        </NavigationContainer>    );});