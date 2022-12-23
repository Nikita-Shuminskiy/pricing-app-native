import React, {useEffect, useRef, useState} from 'react';
import {Animated, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {observer} from "mobx-react-lite";
import WalletStore from "../../store/WalletStore/wallet-store";
import SafeAreaView from "../../common/components/safe-area-view";
import {WalletModelType} from "../../store/Type/models";
import {colors} from "../../assets/colors/colors";
import wallet from '../../assets/images/wallet.png';
import {FontAwesome} from '@expo/vector-icons';
import {AddWalletModal} from "../../common/modals/add-wallet-modal";
import logo from "../../assets/logo/logo-pony-web.png";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import {routerConstants} from "../../constants/router-constants/router-constants";
import rootStore from "../../store/RootStore/root-store";
import {AddSpendModal} from "../../common/modals/add-spend-modal";
import HistoryStore from "../../store/HistoryStore/history-store";
import AntDesign from "react-native-vector-icons/AntDesign";
import {createAlert} from "../../common/components/alert";


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
        if(wallets.length >= 6) {
            return createAlert({
                title: 'Сообщение',
                message: 'На данный момент у вас максимальное количество кошельков',
                buttons: [{text: 'Закрыть', style: "cancel", onPress: () => console.log('')}]
            })
        } else {
            setModalAddWallet(true)
        }
    }

    const onPressButtonAddSpend = () => {
        setModalAddSpend(true)
    }
    const translateX = useRef(new Animated.Value(Dimensions.get("window").height)).current
    useEffect(() => {
        Animated.timing(translateX, {useNativeDriver: false, toValue: 0, duration: 1000}).start();
    })

    const onPressTouchWallet = (wallet: WalletModelType) => {
        getCurrentHistory(wallet._id)
        setChosenWallet(wallet)
        navigation.navigate(routerConstants.DETAIL_INFO_WALLET)
    }
    const walletView = ({item}) => {
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
    const renderEmptyContainer = () => {
        return <View>
            <Text style={styles.renderEmptyText}>У вас нет кошельков</Text>
        </View>
    }

    return (
        <>
            <SafeAreaView>
                <View style={styles.addWalletContainer}>
                    <TouchableOpacity style={{alignItems: 'center', marginLeft: 15}} onPress={onPressButtonAddWallet}>
                        <AntDesign name={"pluscircleo"} size={24} color={colors.black}/>
                        <Text style={[styles.text]}>Создать кошелек</Text>
                    </TouchableOpacity>
                    <Image style={styles.logo} resizeMode={'contain'} source={logo}/>
                    <TouchableOpacity style={{alignItems: 'center', marginRight: 15}} onPress={onPressButtonAddSpend}>
                        <FontAwesome name={"cart-plus"} size={24} color={colors.black}/>
                        <Text style={styles.text}>Добавить трату</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.walletsContainer}>
                    <FlatList
                        data={wallets}
                        renderItem={walletView}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={2}
                        style={{width: '100%'}}
                        ListEmptyComponent={renderEmptyContainer}
                        contentContainerStyle={!wallets?.length && styles.contentContainerStyle}
                    />
                </View>
            </SafeAreaView>
            <AddWalletModal visible={modalAddWallet} onClose={() => setModalAddWallet(false)}/>
            <AddSpendModal visible={modalAddSpend} onClose={() => setModalAddSpend(false)}/>
        </>
    );
});

const styles = StyleSheet.create({
    walletsContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    contentContainerStyle: {flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 5},
    renderEmptyText: {
        color: colors.gray,
        fontSize: 20
    },
    text: {
        marginTop: 5,
        color: colors.black,
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
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10
    },
    logo: {
        width: 70,
        height: 70,
        marginRight: 5,
    },
    addWalletContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center"

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