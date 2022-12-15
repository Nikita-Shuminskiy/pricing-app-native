import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {routerConstants} from "../constants/router-constants/router-constants";
import WalletsScreen from "../screen/mainScreen/WalletsScreen";
import {DetailInfoWalletScreen} from "../screen/mainScreen/DetailWalletInfoScreen.tsx";
import {observer} from "mobx-react-lite";
import NotificationStore from "../store/NotificationStore/notification-store";
import {LoadingEnum} from "../store/Type/models";
import Loading from "../common/components/loading";

const WalletStack = createNativeStackNavigator();
const WalletNavigation = observer(() => {
    const {isLoading} = NotificationStore;

    if (isLoading === LoadingEnum.fetching) {
        console.log(isLoading)
        return <Loading/>
    }
    return (
        <WalletStack.Navigator>
            <WalletStack.Screen options={{headerShown: false, animation: 'flip'}}
                                name={routerConstants.WALLETS}
                                component={WalletsScreen}/>
            <WalletStack.Screen options={{animation: 'flip', headerTitle: 'Информация о кошельке'}}
                                name={routerConstants.DETAIL_INFO_WALLET}
                                component={DetailInfoWalletScreen}/>
        </WalletStack.Navigator>
    );
});

export default WalletNavigation;