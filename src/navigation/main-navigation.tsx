import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {routerConstants} from "../constants/router-constants/router-constants";
import {MainScreen} from "../screen/mainScreen/MainScreen";
import {Icon} from "react-native-elements";
import WalletsScreen from "../screen/mainScreen/WalletScreen";
import {colors} from "../assets/colors/colors";
import WalletNavigation from "./WalletNavigation";

const Tab = createMaterialBottomTabNavigator();

const MainNavigation = () => {

    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color}) => {
                    let iconName;

                    if (route.name === 'wallets') {
                        iconName = focused
                            ? 'account-balance-wallet'
                            : 'account-balance-wallet'
                    } else if (route.name === 'work-space') {
                        iconName = focused ? 'tablet-android' : 'tablet-android';
                    } else if (route.name === 'chart') {
                        iconName = focused ? 'bar-chart' : 'bar-chart';
                    } else if (route.name === 'settings') {
                        iconName = focused ? 'app-settings-alt' : 'app-settings-alt';
                    }

                    return (
                        <Icon
                            name={iconName}
                            size={24}
                            color={color}
                            tvParallaxProperties={undefined}/>
                    )
                },
            })}
            activeColor={colors.orange}
            barStyle={{
                backgroundColor: colors.white,
            }}
        >
            <Tab.Screen options={{tabBarLabel: 'Кошельки'}}
                        name={routerConstants.WALLETS}
                        component={WalletNavigation}/>
            <Tab.Screen options={{tabBarLabel: 'История'}}
                        name={routerConstants.WORK_SPACE}
                        component={MainScreen}/>
            <Tab.Screen options={{tabBarLabel: 'График'}}
                        name={routerConstants.CHART}
                        component={MainScreen}/>
            <Tab.Screen options={{tabBarLabel: 'Настройки'}}
                        name={routerConstants.SETTINGS}
                        component={MainScreen}/>
        </Tab.Navigator>
    );
};

export default MainNavigation;