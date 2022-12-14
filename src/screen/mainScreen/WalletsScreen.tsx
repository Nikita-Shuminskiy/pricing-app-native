import React, {useEffect, useRef, useState} from 'react';
import {Animated, Button, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {observer} from "mobx-react-lite";
import WalletStore from "../../store/WalletStore/wallet-store";
import SafeAreaView from "../../common/components/safe-area-view";
import {WalletModelType} from "../../store/Type/models";
import {colors} from "../../assets/colors/colors";
import wallet from '../../assets/images/wallet.png';
import {FontAwesome} from '@expo/vector-icons';
import AntDesign from "react-native-vector-icons/AntDesign";
import {AddWalletModal} from "../../common/modals/add-wallet-modal";
import logo from "../../assets/logo/logo-pony-web.png";
import walletBlue from "../../assets/images/wallet-witch-cash-blue.png";
import walletPlus from "../../assets/images/wallet-plus.png";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import {routerConstants} from "../../constants/router-constants/router-constants";
import rootStore from "../../store/RootStore/root-store";
import {AddSpendModal} from "../../common/modals/add-spend-modal";
import HistoryStore from "../../store/HistoryStore/history-store";


type WalletScreenProps = {
    navigation: NavigationProp<ParamListBase>
}
const WalletsScreen = observer(({navigation}: WalletScreenProps) => {
    const [modalAddWallet, setModalAddWallet] = useState(false);
    const [modalAddSpend, setModalAddSpend] = useState(false);
    const {userId, wallets, setChosenWallet} = WalletStore
    const {getCurrentHistory} = HistoryStore
    useEffect(() => {
        if (!wallets) {
            rootStore.WalletStoreService.getWallets(userId)
        }
    }, [])

    const onPressButtonAddWallet = () => {
        setModalAddWallet(true)
    }

    const onPressButtonAddSpend = () => {
        setModalAddSpend(true)
    }
    const translateX = useRef(new Animated.Value(Dimensions.get("window").height)).current
    useEffect(() => {
        Animated.timing(translateX, {useNativeDriver: false, toValue: 0, duration: 2000}).start();
    })

    const onPressTouchWallet = (wallet: WalletModelType) => {
        getCurrentHistory(wallet._id)
        setChosenWallet(wallet)
        navigation.navigate(routerConstants.DETAIL_INFO_WALLET)
    }
    const WalletView = ({item}) => {
        return (
            <Animated.View style={{transform: [{translateY: translateX}]}}>
                <View style={styles.walletContainer}>
                    <View style={styles.imagesContainer}>
                        <TouchableOpacity style={styles.imagesOpacity}
                                          onPress={() => onPressTouchWallet(item as WalletModelType)}>
                            <Image style={styles.img} source={wallet}/>
                            <FontAwesome style={styles.icoInfo} name="info-circle" size={20} color={colors.orange}/>
                        </TouchableOpacity>
                    </View>


                    <View style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                        <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.walletName}>
                            Имя: {item?.name}
                        </Text>
                        <Text numberOfLines={1} ellipsizeMode={'tail'}>
                            Баланс: {item?.balance} {item?.currency}
                        </Text>
                    </View>

                </View>
            </Animated.View>


        );
    };

    return (
        <>
            <SafeAreaView>
                <View style={styles.addWalletContainer}>
                    <TouchableOpacity style={{alignItems: 'center', marginLeft: 15}} onPress={onPressButtonAddWallet}>
                        {/*<AntDesign name={"pluscircleo"} size={40} color={colors.orange}/>*/}
                        <Image resizeMode={'contain'} style={styles.imgAddWallet} source={walletPlus}/>
                        <Text style={[styles.text, {marginTop: 0}]}>Создать кошелек</Text>
                    </TouchableOpacity>
                    <Image style={styles.logo} resizeMode={'contain'} source={logo}/>
                    <TouchableOpacity style={{alignItems: 'center', marginRight: 15}} onPress={onPressButtonAddSpend}>
                        <Image style={styles.imgAddWallet} resizeMode={'contain'} source={walletBlue}/>
                        <Text style={styles.text}>Добавить трату </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <FlatList
                        data={wallets}
                        renderItem={WalletView}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={2}
                        /*contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}*/
                    />
                </View>
            </SafeAreaView>
            <AddWalletModal visible={modalAddWallet} onClose={() => setModalAddWallet(false)}/>
            <AddSpendModal visible={modalAddSpend} onClose={() => setModalAddSpend(false)}/>
        </>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        marginLeft: 5,
    },
    text: {
        marginTop: 5,
        color: colors.gray,
        fontSize: 12,
        fontWeight: '800'
    },
    walletContainer: {
        backfaceVisibility: 'hidden',
        alignItems: 'center',
        backgroundColor: colors.white,
        width: 170,
        margin: 10,
        padding: 10,
        borderRadius: 16,
        flex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10
    },
    logo: {
        width: 80,
        height: 80,
        marginRight: 5,
    },
    addWalletContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center"

    },
    imgAddWallet: {
        width: 50,
        height: 50,
    },
    walletName: {
        marginTop: 10,
        marginBottom: 5
    },
    wallet: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    img: {
        width: 40,
        height: 40,
    },
    icoInfo: {
        position: 'absolute',
        right: 0
    },
    imagesContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    imagesOpacity: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
    }
});

export default WalletsScreen;