import React, {useEffect, useState} from "react";
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import SafeAreaView from "../../common/components/safe-area-view";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import WalletStore from "../../store/WalletStore/wallet-store";
import {colors} from "../../assets/colors/colors";
import wallet from '../../assets/images/wallet.png';
import {convertToDate, dateFormat} from "../../utils/utils";
import {FontAwesome5} from '@expo/vector-icons';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {createAlert} from "../../common/components/alert";
import RootStore from "../../store/RootStore/root-store";
import {ChangeWalletModal} from "../../common/modals/change-wallet-modal";
import {HeaderBackButton} from "@react-navigation/elements";
import rootStore from "../../store/RootStore/root-store";

type DetailInfoWalletModalType = {
    navigation: NavigationProp<ParamListBase>
}
//  топ 5 последний трат
// топ 3 категории трат
export const DetailInfoWalletScreen = ({navigation}: DetailInfoWalletModalType) => {
    const [modalChangeWallet, setModalChangeWallet] = useState(false);
    const {chosenWallet} = WalletStore
    const lastSpends = chosenWallet?.history?.sort((a, b) => a.createdAt > b.createdAt ? 1 : -1).slice(0, 3)
    const confirmDeleteWallet = () => {
        createAlert({
            title: 'Удаление кошелька',
            message: 'Вы действительно хотите удалить кошелек ?',
            buttons: [
                {text: 'Удалить', style: "cancel", onPress: onPressRemove},
                {text: 'Не удалять', style: "destructive"}
            ]
        })
    }
    const onPressRemove = () => {
        RootStore.WalletStoreService.removeWallet(chosenWallet.userId, chosenWallet._id)
    }
    const onPressChangeWallet = () => {
        setModalChangeWallet(true)
    }

    useEffect( () => {
        navigation.setOptions({
            headerLeft: (props) => (
                <HeaderBackButton
                    {...props}
                    onPress={() => {
                        navigation.goBack()
                       rootStore.WalletStoreService.getWallets(chosenWallet.userId)
                    }}
                />
            )
        });
    } );

    return (
        <ScrollView style={{width: '100%'}}>
            <SafeAreaView>
                <View style={styles.container}>

                    <Image style={styles.logo} resizeMode={'contain'} source={wallet}/>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity onPress={onPressChangeWallet}>
                            <FontAwesome5 name={"edit"} size={24} color={colors.orange}/>
                        </TouchableOpacity>
                        <Text style={styles.textHeader}>Мой кошелек</Text>
                        <TouchableOpacity onPress={confirmDeleteWallet}>
                            <MaterialIcons name={"delete-sweep"} size={30}
                                           color={colors.red}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.body}>
                        <View style={styles.blockText}>
                            <Text style={styles.textName}>Имя:</Text>
                            <Text style={styles.text}>{chosenWallet?.name}</Text>
                        </View>
                        <View style={styles.blockText}>
                            <Text style={styles.textName}>Валюта:</Text>
                            <Text style={styles.text}>{chosenWallet?.currency}</Text>
                        </View>
                        <View style={styles.blockText}>
                            <Text style={styles.textName}>Баланс:</Text>
                            <Text style={styles.text}>{chosenWallet?.balance}</Text>
                        </View>
                        <View style={styles.blockText}>
                            <Text style={styles.textName}>Всего Трат:</Text>
                            <Text style={styles.text}>{chosenWallet?.totalSpends ? chosenWallet?.totalSpends : 0}</Text>
                        </View>
                        <View style={styles.blockText}>
                            <Text style={styles.textName}>Дата создания кошелька:</Text>
                            <Text style={styles.text}>{dateFormat(convertToDate(chosenWallet?.createdAt))}</Text>
                        </View>
                    </View>
                    <View style={styles.lastHistoryBlock}>
                        <Text style={styles.textHeader}>3 Последних траты</Text>
                        <View>

                        </View>
                    </View>
                </View>
            </SafeAreaView>
            <ChangeWalletModal visible={modalChangeWallet} onClose={() => setModalChangeWallet(false)}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    textHeader: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 20
    },
    lastHistoryBlock: {},
    body: {
        margin: 20,
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    blockText: {
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    text: {
        flexShrink: 1,
        fontSize: 18,
    },
    textName: {
        fontSize: 18,
        color: colors.gray,
        marginRight: 10
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20
    },
});
