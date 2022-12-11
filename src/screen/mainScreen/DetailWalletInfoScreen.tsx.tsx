import React from "react";
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import SafeAreaView from "../../common/components/safe-area-view";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import WalletStore from "../../store/WalletStore/wallet-store";
import {colors} from "../../assets/colors/colors";
// @ts-ignore
import wallet from '../../assets/images/wallet.png';
import {convertToDate, dateFormat} from "../../utils/utils";

type DetailInfoWalletModalType = {
    navigation: NavigationProp<ParamListBase>
}
//  топ 5 последний трат
// топ 3 категории трат
export const DetailInfoWalletScreen = ({navigation}: DetailInfoWalletModalType) => {
    const {chosenWallet} = WalletStore
    const lastSpends =  chosenWallet?.history?.sort((a, b) => {
        if (a.createdAt > b.createdAt) {
            return 1
        } else {
            return -1
        }
    }).slice(0, 3)
    return (
        <ScrollView style={{width: '100%'}}>
            <SafeAreaView>
                <View style={styles.container}>
                    <View style={{alignItems: 'center'}}>
                        <Image style={styles.logo} resizeMode={'contain'} source={wallet}/>
                        <Text style={styles.textHeader}>Мой кошелек</Text>
                    </View>
                    <View style={styles.body}>
                        <View style={styles.blockText}>
                            <Text style={styles.textName}>Имя:</Text>
                            <Text style={styles.text}>{chosenWallet.name}</Text>
                        </View>
                        <View style={styles.blockText}>
                            <Text style={styles.textName}>Валюта:</Text>
                            <Text style={styles.text}>{chosenWallet.currency}</Text>
                        </View>
                        <View style={styles.blockText}>
                            <Text style={styles.textName}>Баланс:</Text>
                            <Text style={styles.text}>{chosenWallet.balance}</Text>
                        </View>
                        <View style={styles.blockText}>
                            <Text style={styles.textName}>Всего Трат:</Text>
                            <Text style={styles.text}>{chosenWallet.totalSpends}</Text>
                        </View>
                        <View style={styles.blockText}>
                            <Text style={styles.textName}>Дата создания кошелька:</Text>
                            <Text style={styles.text}>{dateFormat(convertToDate(chosenWallet.createdAt))}</Text>
                        </View>
                    </View>
                    <View style={styles.lastHistoryBlock}>
                        <Text style={styles.textHeader}>3 Последних траты</Text>
                        <View>
                            
                        </View>
                    </View>
                </View>
            </SafeAreaView>
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
        color: colors.white,
        marginBottom: 20
    },
    lastHistoryBlock: {},
    body: {
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    blockText: {
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    text: {
        fontSize: 18,
        color: colors.white
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
