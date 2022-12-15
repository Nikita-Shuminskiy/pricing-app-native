import React, {useEffect, useRef, useState} from 'react';
import {Animated, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {observer} from "mobx-react-lite";
import SafeAreaView from "../../common/components/safe-area-view";
import HistoryStore from "../../store/HistoryStore/history-store";
import {SpendingModel} from "../../store/Type/models";
import {colors} from "../../assets/colors/colors";
import {convertToDate, dateFormat, getDateFormatTime} from "../../utils/utils";
import coinImage from '../../assets/images/cash.png'
import settingImage from "../../assets/images/setting.png";
import logo from "../../assets/logo/logo-pony-web.png";
import FilterHistoryModal from "../../common/modals/filter-history-modal";
import WalletStore from "../../store/WalletStore/wallet-store";

type HistoryScreenProps = {}
const HistoryScreen = observer(({}: HistoryScreenProps) => {
    const {selectedWalletHistory, getAllHistory} = HistoryStore
    const {chosenWallet} = WalletStore
    const onPressTouchStory = (story: SpendingModel) => {
    }
    const [modalFilterHistory, setModalFilterHistory] = useState(false);
    const translateX = useRef(new Animated.Value(Dimensions.get("window").height)).current
    useEffect(() => {
        Animated.timing(translateX, {useNativeDriver: false, toValue: 0, duration: 1500}).start();
    })
    useEffect(() => {
        if(!selectedWalletHistory?.length) {
            console.log(selectedWalletHistory)
            getAllHistory()
        }
    })
    const storyView = ({item}) => {
        return (
            <Animated.View style={[{transform: [{translateY: translateX}]}, styles.storyContainer]}>
                <View style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                    <View style={styles.blockSpendText}>
                        <Text style={styles.textName}>Имя категории</Text>
                        <Text style={[styles.blockSpendTextValue, {maxWidth: '90%', width: '100%'}]}>{item.title}</Text>
                    </View>
                    <View style={styles.blockSpendText}>
                        <Text style={styles.textName}>Дата</Text>
                        <Text
                            style={styles.blockSpendTextValue}> {dateFormat(convertToDate(item.createdAt))} в {getDateFormatTime(convertToDate(item.createdAt))}</Text>
                    </View>
                    <View style={styles.blockSpendText}>
                        <Text style={styles.textName}>Сумма</Text>
                        <Text style={styles.blockSpendTextValue}>{item.amount} {item.currency}</Text>
                    </View>
                    <View style={styles.blockSpendText}>
                        <Text style={styles.textName}>Коментарий</Text>
                        <Text style={styles.blockSpendTextValue}>{item.description}</Text>
                    </View>
                </View>
                <View style={styles.imagesContainer}>
                    <Image style={styles.img} source={coinImage}/>
                </View>
            </Animated.View>
        );
    };
    const onPressButtonFilterHistory = () => {
        setModalFilterHistory(true)
    }

    return (
        <>
            <SafeAreaView>
                <View style={styles.headerContainer}>
                    <Image style={styles.imgLogo} resizeMode={'contain'} source={logo}/>
              {/*      <Text style={styles.textWalletName}>{selectedHistoryWalletName ? selectedHistoryWalletName : 'Вся история'}</Text>*/}
                    <TouchableOpacity style={{alignItems: 'center', marginLeft: 15}}
                                      onPress={onPressButtonFilterHistory}>
                        <Image resizeMode={'contain'} style={styles.imgFilter} source={settingImage}/>
                        <Text style={[styles.text, {marginTop: 0}]}>Фильтры</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={selectedWalletHistory}
                    renderItem={storyView}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={1}
                    style={{width: '100%'}}
                />
            </SafeAreaView>
            {modalFilterHistory &&
                <FilterHistoryModal visible={modalFilterHistory} onClose={() => setModalFilterHistory(false)}/>}
        </>
    );
})

const styles = StyleSheet.create({
    storyName: {
        marginTop: 10,
        marginBottom: 5
    },
    text: {
        marginTop: 5,
        color: colors.gray,
        fontSize: 12,
        fontWeight: '800'
    },
    textWalletName: {
        fontWeight: '800',
        fontSize: 16,
        color: colors.grayWhite,
    },
    headerContainer: {
        width: '100%',
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 20

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
        paddingTop: 5,
        paddingBottom: 5,
    },
    textName: {
        fontSize: 18,
        color: colors.gray,
        marginRight: 10
    },
    blockSpendTextValue: {
        paddingLeft: 10
    },
    storyContainer: {
        borderWidth: 2,
        borderColor: colors.gray,
        borderRadius: 16,
        padding: 10,
        marginBottom: 20,
        flexDirection: 'row',
        maxWidth: '95%',
        width: '100%',
        marginLeft: '3%'
    },
    story: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    img: {
        width: 60,
        height: 60,
    },
    imgFilter: {
        width: 40,
        height: 40,
    },
    imgLogo: {
        width: 70,
        height: 70,
    },
    imagesContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-end'
    }
});

export default HistoryScreen;