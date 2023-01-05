import React, {useEffect, useState} from "react";
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import SafeAreaView from "../../common/components/safe-area-view";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import WalletStore from "../../store/WalletStore/wallet-store";
import {colors} from "../../assets/colors/colors";
import wallet from '../../assets/images/wallet-witch-money.png';
import money from '../../assets/images/coin.png';
import {convertToDate, dateFormat, getDateFormatTime} from "../../utils/utils";
import {FontAwesome5} from '@expo/vector-icons';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {createAlert} from "../../common/components/alert";
import RootStore from "../../store/RootStore/root-store";
import {ChangeWalletModal} from "../../common/modals/change-wallet-modal";
import {HeaderBackButton} from "@react-navigation/elements";
import rootStore from "../../store/RootStore/root-store";
import HistoryStore from "../../store/HistoryStore/history-store";
import {observer} from "mobx-react-lite";

type DetailInfoWalletModalType = {
    navigation: NavigationProp<ParamListBase>
}
// топ 3 категории трат
export const DetailInfoWalletScreen = observer(({navigation}: DetailInfoWalletModalType) => {
    const [modalChangeWallet, setModalChangeWallet] = useState(false);
    const {chosenWallet, clearChosenWallet} = WalletStore
    const {lastSpendsWallet, clearSelectedWalletHistory} = HistoryStore
    const confirmDeleteWallet = () => {
        createAlert({
            title: 'Удаление кошелька',
            message: 'Вы действительно хотите удалить кошелек ?',
            buttons: [
                {text: 'Удалить', style: "default", onPress: onPressRemove},
                {text: 'Не удалять', style: "cancel"}
            ]
        })
    }

    const onPressRemove = () => {
        RootStore.WalletStoreService.removeWallet(chosenWallet?.userId, chosenWallet._id)
    }
    const onPressChangeWallet = () => {
        setModalChangeWallet(true)
    }

    useEffect(() => {
        navigation.setOptions({
            headerLeft: (props) => (
                <HeaderBackButton
                    {...props}
                    onPress={() => {
                        navigation.goBack()
                        clearSelectedWalletHistory()
                        clearChosenWallet()
                        rootStore.WalletStoreService.getWallets(chosenWallet?.userId)
                    }}
                />
            )
        });
    });
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
                            <Text style={styles.text}>{Math.round(chosenWallet?.balance)}</Text>
                        </View>
                        {/*  <View style={styles.blockText}>
                            <Text style={styles.textName}>Всего Трат:</Text>
                            <Text style={styles.text}>{chosenWallet?.totalSpends ? chosenWallet?.totalSpends : 0}</Text>
                        </View>*/}
                        <View style={styles.blockText}>
                            <Text style={styles.textName}>Дата создания кошелька:</Text>
                            <Text style={styles.text}>{dateFormat(convertToDate(chosenWallet?.createdAt))}</Text>
                        </View>
                    </View>
                    <View style={[styles.lastHistoryBlock]}>
                        <Text style={styles.textHeader}>
                            5 Последних трат</Text>
                        {
                            lastSpendsWallet?.map((spend) => {
                                return <View style={styles.blockSpend} key={spend._id}>
                                    <View style={{maxWidth: '90%', width: '100%'}}>
                                        <View style={styles.blockSpendText}>
                                            <Text style={styles.textName}>Имя категории</Text>
                                            <Text style={styles.blockSpendTextValue}>{spend.title}</Text>
                                        </View>
                                        <View style={styles.blockSpendText}>
                                            <Text style={styles.textName}>Дата</Text>
                                            <Text
                                                style={styles.blockSpendTextValue}> {dateFormat(convertToDate(spend.createdAt))} в {getDateFormatTime(convertToDate(spend.createdAt))}</Text>
                                        </View>
                                        <View style={styles.blockSpendText}>
                                            <Text style={styles.textName}>Сумма</Text>
                                            <Text
                                                style={styles.blockSpendTextValue}>{spend.amount} {spend.currency}</Text>
                                        </View>
                                        <View style={styles.blockSpendText}>
                                            <Text style={styles.textName}>Коментарий</Text>
                                            <Text style={styles.blockSpendTextValue}>{spend.description}</Text>
                                        </View>
                                    </View>
                                    <Image style={styles.blockSpendLogo} source={money}/>
                                </View>
                            })
                        }
                        {!lastSpendsWallet?.length && <Text style={styles.textNotSpends}>У вас нету трат</Text>}
                    </View>
                </View>
            </SafeAreaView>
            <ChangeWalletModal visible={modalChangeWallet} onClose={() => setModalChangeWallet(false)}/>
        </ScrollView>
    )
})

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
        marginBottom: 20,
    },
    blockSpend: {
        borderWidth: 2,
        borderColor: colors.gray,
        borderRadius: 16,
        padding: 10,
        marginBottom: 5,
        flexDirection: 'row'
    },
    blockSpendText: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        paddingTop: 5,
        paddingBottom: 5,
    },
    blockSpendLogo: {
        width: 40,
        height: 40
    },
    blockSpendTextValue: {
        paddingLeft: 10
    },
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 20
    },
    lastHistoryBlock: {
        paddingLeft: 10,
        paddingRight: 10,
        width: '100%',
        alignItems: 'center'
    },
    textNotSpends: {
        fontSize: 15,
        color: colors.gray,
    },
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
        width: 180,
        height: 180,
    },
});
