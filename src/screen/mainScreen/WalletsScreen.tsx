import React, {useCallback, useEffect, useRef, useState} from 'react';
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
import AntDesign from "react-native-vector-icons/AntDesign";
import {createAlert} from "../../common/components/alert";
import Link from "../../common/components/link";
import {Box} from "native-base";
import {useSwipe} from "../../utils/hooks/useSwipe";
import HistoryStore from "../../store/HistoryStore/history-store";


type WalletScreenProps = {
    navigation: NavigationProp<ParamListBase>
}
const WalletsScreen = observer(({navigation}: WalletScreenProps) => {
    const [modalAddWallet, setModalAddWallet] = useState(false);
    const [modalAddSpend, setModalAddSpend] = useState(false);
    const {userId, wallets, setChosenWallet} = WalletStore

    const onSwipeRight = () => {
        setModalAddWallet(true)
    }

    const {onTouchStart, onTouchEnd} = useSwipe(null, onSwipeRight, null, 4)

    const {WalletStoreService} = rootStore
    const {getCurrentHistory} = HistoryStore

    useEffect(() => {
        if (!wallets) {
            WalletStoreService.getWallets(userId)
        }
    }, [])
    const onPressButtonAddWallet = () => {
        if (wallets.length >= 6) {
            return createAlert({
                title: 'Сообщение',
                message: 'У вас максимальное количество кошельков',
                buttons: [{text: 'Закрыть', style: "cancel"}]
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
            <Animated.View style={{transform: [{translateY: translateX}], flex: 1, height: '100%'}}>
                <Box style={styles.walletContainer}>
                    <TouchableOpacity style={styles.imagesOpacity}
                                      onPress={() => onPressTouchWallet(item as WalletModelType)}>
                        <View style={styles.walletBody}>
                            <View style={styles.imagesContainer}>
                                <Image style={styles.img} source={wallet}/>
                                <FontAwesome style={styles.icoInfo} name="info-circle" size={20} color={colors.orange}/>
                            </View>
                            <View style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                                <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.walletName}>
                                    Имя: {item?.name}
                                </Text>
                                <Text numberOfLines={1} ellipsizeMode={'tail'}>
                                    Баланс: {Math.round(item?.balance)} {item?.currency}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>

                </Box>
            </Animated.View>
        );
    };
    const renderEmptyContainer = () => {
        const onPressLink = () => {
            setModalAddWallet(true)
        }
        return <Box alignItems={'center'}>
            <Text style={styles.renderEmptyText}>У вас нет кошельков</Text>
            <Link styleText={styles.linkWallet} style={styles.link} text={'Создать кошелек'} onPress={onPressLink}/>
        </Box>
    }

    const [isRefreshing, setIsRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setIsRefreshing(true);
        WalletStoreService.getWallets(userId)
    }, []);

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
                    <FlatList
                        onTouchStart={onTouchStart}
                        onTouchEnd={onTouchEnd}
                        data={wallets}
                        renderItem={walletView}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={2}
                        style={{width: '100%'}}
                        ListEmptyComponent={renderEmptyContainer}
                        contentContainerStyle={!wallets?.length && styles.contentContainerStyle}
                        showsVerticalScrollIndicator={false}
                        refreshing={isRefreshing} // Added pull to refesh state
                        onRefresh={onRefresh} // Added pull to refresh control
                    />
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
    link: {
        marginTop: 10,
    },
    linkWallet: {
        fontSize: 18
    },
    contentContainerStyle: {flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 5},
    renderEmptyText: {
        color: colors.gray,
        fontSize: 18
    },
    text: {
        marginTop: 5,
        color: colors.black,
        fontSize: 12,
        fontWeight: '800'
    },
    walletContainer: {
        backgroundColor: colors.white,
        width: 170,
        margin: 10,
        marginBottom: 20,
        padding: 10,
        borderRadius: 16,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    },
    walletBody: {
        backfaceVisibility: 'hidden',
        alignItems: 'center',
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
        justifyContent: 'center'
    }
});

export default WalletsScreen;