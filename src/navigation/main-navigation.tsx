import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {routerConstants} from "../constants/router-constants/router-constants";
import {colors} from "../assets/colors/colors";
import WalletNavigation from "./wallet-navigation";
import HistoryScreen from "../screen/mainScreen/HistoryScreen";
import ChartScreen from "../screen/mainScreen/ChartScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import SettingScreen from "../screen/mainScreen/SettingScreen";

const Tab = createMaterialBottomTabNavigator();

const MainNavigation = () => {

    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color}) => {
                    let iconName;

                    if (route.name === 'wallets') {
                        iconName = focused
                            ? 'wallet'
                            : 'wallet-outline'
                    } else if (route.name === 'work-space') {
                        iconName = focused ? 'analytics' : 'analytics-outline';
                    } else if (route.name === 'chart') {
                        iconName = focused ? 'bar-chart' : 'bar-chart-outline';
                    } else if (route.name === 'settings') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }

                    return (
                        <Ionicons name={iconName} size={24} color={color}/>
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
                        component={HistoryScreen}/>
            <Tab.Screen options={{tabBarLabel: 'График'}}
                        name={routerConstants.CHART}
                        component={ChartScreen}/>
            <Tab.Screen options={{tabBarLabel: 'Настройки'}}
                        name={routerConstants.SETTINGS}
                        component={SettingScreen}/>
        </Tab.Navigator>
    );
};

export default MainNavigation;