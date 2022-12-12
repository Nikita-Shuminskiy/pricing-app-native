import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {routerConstants} from "../constants/router-constants/router-constants";
import WalletsScreen from "../screen/mainScreen/WalletScreen";
import {DetailInfoWalletScreen} from "../screen/mainScreen/DetailWalletInfoScreen.tsx";

const WalletStack = createNativeStackNavigator();
const WalletNavigation = () => {
    return (
        <WalletStack.Navigator>
            <WalletStack.Screen options={{headerShown: false, animation: 'flip'}}
                                name={routerConstants.WALLETS}
                                component={WalletsScreen}/>
            <WalletStack.Screen options={{animation: 'flip', headerTitle: 'Информация о кошельке',}}
                                name={routerConstants.DETAIL_INFO_WALLET}
                                component={DetailInfoWalletScreen}/>
        </WalletStack.Navigator>
    );
};

export default WalletNavigation;