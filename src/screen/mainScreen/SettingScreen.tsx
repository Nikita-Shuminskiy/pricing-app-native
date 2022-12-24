import React from 'react';
import {Box, Text} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import {SafeAreaView, TouchableOpacity} from "react-native";
import AuthStore from "../../store/AuthStore/auth-store";
import {convertToDate, dateFormat} from "../../utils/utils";
import {colors} from "../../assets/colors/colors";
import {Feather} from "@expo/vector-icons";
import rootStore from "../../store/RootStore/root-store";

type SettingScreenProps = {
    navigation: NavigationProp<ParamListBase>
}
const SettingScreen = ({navigation}: SettingScreenProps) => {
    const {user} = AuthStore
    const {AuthStoreService} = rootStore
    const {email, createdAt, firstName, lastName} = user
    const onPressExit = () => {
        AuthStoreService.logOutUser()
    }
    return (
        <SafeAreaView>
            <Box pl={5} pr={5}>
                <Box w={'100%'} h={'100%'} alignItems={'flex-start'} justifyContent={'center'}>
                    <Box mb={20} w={'100%'} h={'auto'} justifyContent={'center'} alignItems={'center'}>
                        <Feather name="info" size={74} color="black"/>
                        <Text fontSize={24} mt={10} fontWeight={700}>Инфо о пользователе</Text>
                    </Box>
                    <Box mt={5} flexDirection={'row'} alignItems={'center'}>
                        <Text color={colors.gray} fontSize={20} fontWeight={500}>Имя: </Text>
                        <Text fontSize={18}>{firstName}{lastName}</Text>
                    </Box>
                    <Box mt={5} flexDirection={'row'} alignItems={'center'}>
                        <Text color={colors.gray} fontSize={20} fontWeight={500}>Емайл: </Text>
                        <Text fontSize={18}>{email}</Text>
                    </Box>
                    <Box mt={5} flexDirection={'row'} alignItems={'center'}>
                        <Text color={colors.gray} fontSize={20} fontWeight={500}>Создание акаунта: </Text>
                        <Text fontSize={18}>{dateFormat(convertToDate(createdAt))}</Text>
                    </Box>
                    <Box mt={10}>
                        <Text color={colors.gray} fontSize={20} fontWeight={500}>Выйти</Text>
                        <TouchableOpacity onPress={onPressExit}>
                            <Ionicons name="exit-outline" size={35} color={colors.gray}/>
                        </TouchableOpacity>
                    </Box>
                </Box>
            </Box>
        </SafeAreaView>
    );
};

export default SettingScreen;