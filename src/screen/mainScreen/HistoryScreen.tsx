import React, {useEffect, useRef, useState} from 'react';
import {Animated, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {observer} from "mobx-react-lite";
import SafeAreaView from "../../common/components/safe-area-view";
import HistoryStore from "../../store/HistoryStore/history-store";
import {LoadingEnum, SpendingModel} from "../../store/Type/models";
import {colors} from "../../assets/colors/colors";
import {convertToDate, dateFormat, getDateFormatTime} from "../../utils/utils";
import coinImage from '../../assets/images/cash.png'
import logo from "../../assets/logo/logo-pony-web.png";
import FilterHistoryModal from "../../common/modals/filter-history-modal";
import WalletStore from "../../store/WalletStore/wallet-store";
import Loading from "../../common/components/loading";
import NotificationStore from "../../store/NotificationStore/notification-store";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {DetailSpendModal} from "../../common/modals/detail-spend-modal";
import Link from "../../common/components/link";
import {Box} from "native-base";

type HistoryScreenProps = {
    navigation: NavigationProp<ParamListBase>
}
const HistoryScreen = observer(({navigation}: HistoryScreenProps) => {
    const {selectedWalletHistory, setChosenSpend} = HistoryStore
    const {chosenWallet} = WalletStore
    const {isLoading} = NotificationStore;
    const onPressTouchStory = (story: SpendingModel) => {
    }
    const [modalFilterHistory, setModalFilterHistory] = useState(false);
    const [modalDetailSpend, setModalDetailSpend] = useState(false);
    const translateX = useRef(new Animated.Value(Dimensions.get("window").height)).current
    useEffect(() => {
        Animated.timing(translateX, {useNativeDriver: false, toValue: 0, duration: 1000}).start();
    })

    const onPressTouchSpend = (spend: SpendingModel) => {
        setChosenSpend(spend)
        setModalDetailSpend(true)
    }

    if (isLoading === LoadingEnum.fetching) {
        return <Loading/>
    }
    const storyView = ({item}) => {
        return (
            <Animated.View style={[{transform: [{translateY: translateX}]}, styles.storyContainer]}>
                <TouchableOpacity style={styles.imagesOpacity} onPress={() => onPressTouchSpend(item)}>
                    <View style={styles.blockSpendCategory}>
                        <Text>{item.title}</Text>
                        <Text> {dateFormat(convertToDate(item.createdAt))} в {getDateFormatTime(convertToDate(item.createdAt))}</Text>
                    </View>
                    <View style={styles.blockAmount}>
                        <Text>{item.amount} {item.currency}</Text>
                        <Image style={styles.img} source={coinImage}/>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );
    };
    const onPressButtonFilterHistory = () => {
        setModalFilterHistory(true)
    }
    const renderEmptyContainer = () => {
        const onPressLink = () => {
            setModalFilterHistory(true)
        }
        return <Box alignItems={'center'}>
            <Text style={styles.renderEmptyText}>История пуста</Text>
            <Link styleText={styles.linkWallet} style={styles.link} text={'Выбрать кошелек'} onPress={onPressLink}/>
        </Box>
    }
    return (
        <>
            <SafeAreaView>
                <View style={styles.headerContainer}>
                    <Image style={styles.imgLogo} resizeMode={'contain'} source={logo}/>
                    <Text style={styles.textWalletName}>{chosenWallet?.name ? `Имя: ${chosenWallet?.name}` : ''}</Text>
                    <TouchableOpacity style={{alignItems: 'center', marginLeft: 15}}
                                      onPress={onPressButtonFilterHistory}>
                        <Ionicons name={"filter"} size={24} color={colors.black}/>
                        <Text style={[styles.text]}>Фильтры</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.historyContainer}>
                    <FlatList
                        data={selectedWalletHistory}
                        renderItem={storyView}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={1}
                        style={{width: '100%'}}
                        ListEmptyComponent={renderEmptyContainer()}
                        contentContainerStyle={!selectedWalletHistory?.length && styles.contentContainerStyle}
                    />
                </View>
            </SafeAreaView>
            {modalFilterHistory &&
                <FilterHistoryModal visible={modalFilterHistory} onClose={() => setModalFilterHistory(false)}/>}
            {
                modalDetailSpend &&
                <DetailSpendModal visible={modalDetailSpend} onClose={() => setModalDetailSpend(false)}/>
            }
        </>
    );
})

const styles = StyleSheet.create({
    link: {
        marginTop: 10,
    },
    linkWallet: {
        fontSize: 18
    },
    renderEmptyText: {
        color: colors.gray,
        fontSize: 18
    },
    storyName: {
        marginTop: 10,
        marginBottom: 5
    },
    imagesOpacity: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    blockSpendCategory: {
        alignItems: 'flex-start'
    },
    blockAmount: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    historyContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    contentContainerStyle: {flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 5},
    text: {
        width: '100%',
        marginTop: 5,
        color: colors.black,
        fontSize: 12,
        fontWeight: '800'
    },
    textWalletName: {
        fontWeight: '800',
        fontSize: 20,
        maxWidth: '50%',
        color: colors.black,
    },
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 20

    },
    textName: {
        fontSize: 18,
        color: colors.gray,
        marginRight: 10
    },
    storyContainer: {
        borderColor: colors.gray,
        borderRadius: 16,
        padding: 10,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '95%',
        width: '100%',
        marginLeft: '3%',
        backgroundColor: colors.white,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10
    },
    story: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    img: {
        width: 30,
        height: 30,
        marginLeft: 5
    },
    imgFilter: {
        width: 40,
        height: 40,
    },
    imgLogo: {
        width: 80,
        height: 80,
    },
});

export default HistoryScreen;