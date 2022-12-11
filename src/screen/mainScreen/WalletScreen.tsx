import React, {useEffect, useRef, useState} from 'react';
import {Animated, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {observer} from "mobx-react-lite";
import WalletStore from "../../store/WalletStore/wallet-store";
import SafeAreaView from "../../common/components/safe-area-view";
import {WalletModelType} from "../../store/Type/models";
import {colors} from "../../assets/colors/colors";
// @ts-ignore
import wallet from '../../assets/images/wallet.png';
import {FontAwesome} from '@expo/vector-icons';
import AntDesign from "react-native-vector-icons/AntDesign";
import {AddWalletModal} from "../../common/modals/add-wallet-modal";
// @ts-ignore
import logo from "../../assets/logo/logo-pony-web.png";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import {routerConstants} from "../../constants/router-constants/router-constants";


type WalletScreenProps = {
    navigation: NavigationProp<ParamListBase>
}
const WalletsScreen = observer(({navigation}: WalletScreenProps) => {
    const [modalAddWallet, setModalAddWallet] = useState(false);
    const {getWallets, userId, wallets, setChosenWallet} = WalletStore

    useEffect(() => {
        getWallets(userId)
    }, [])

    const onPressButton = () => {
        setModalAddWallet(true)
    }


    const translateX = useRef(new Animated.Value(Dimensions.get("window").height)).current
    useEffect(() => {
        Animated.timing(translateX, {useNativeDriver: false, toValue: 0, duration: 2000}).start();
    })

    const onPressTouchWallet = (wallet: WalletModelType) => {
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
                    <TouchableOpacity onPress={onPressButton}>
                        <AntDesign style={styles.imgAddWallet} name={"pluscircleo"} size={40} color={colors.orange}/>
                    </TouchableOpacity>
                    <Image style={styles.logo} resizeMode={'contain'} source={logo}/>
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
        </>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        marginLeft: 5,
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
        marginTop: 10,
        marginLeft: 15,
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