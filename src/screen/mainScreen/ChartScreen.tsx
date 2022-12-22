import React, {useEffect, useRef, useState} from 'react';
import {Animated, Dimensions, FlatList, StyleSheet, TouchableOpacity} from "react-native";
import SafeAreaView from "../../common/components/safe-area-view";
import {observer} from "mobx-react-lite";
import {PieChart} from "react-native-chart-kit";
import rootStore from "../../store/RootStore/root-store";
import WalletStore from "../../store/WalletStore/wallet-store";
import CategoriesStore from "../../store/CategoriesStore/categories-store";
import {Box, Image, ScrollView, Text} from "native-base";
import filterImage from '../../assets/images/filter.png'
import FilterChartModal from "../../common/modals/filter-chart-modal";
import {colors} from "../../assets/colors/colors";
import {StatisticsDataEveryMonthTheYearType} from "../../store/Type/models";
import {convertToDate, dateFormat} from "../../utils/utils";
import {FontAwesome} from "@expo/vector-icons";

const ChartScreen = observer(() => {
    const {CategoryStoreService} = rootStore
    const {chosenWallet} = WalletStore
    const {chartDataPie, walletChartId} = CategoriesStore
    const [modalFilterChart, setModalFilterChart] = useState(false);

    const chartConf = {
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: "#ffa726",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            flex: 1,
            borderRadius: 16
        },
        propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
        }
    }

    const onPressFilter = () => {
        setModalFilterChart(true)
    }

    const width = Dimensions.get('window').width - 16

    const translateX = useRef(new Animated.Value(Dimensions.get("window").height)).current

    useEffect(() => {
        Animated.timing(translateX, {useNativeDriver: false, toValue: 0, duration: 1500}).start();
    })

    const chartView = ({item}) => {
        return (
            <Animated.View style={{transform: [{translateY: translateX}]}}>
                <Box style={styles.walletContainer}>
                    {/* <View style={styles.imagesContainer}>
                        <TouchableOpacity style={styles.imagesOpacity}>
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
                    </View>*/}
                    <PieChart
                        data={item.statisticsDataEveryMonthTheYear?.map((data: StatisticsDataEveryMonthTheYearType) => ({
                            name: data.category,
                            population: data.totalSum,
                            legendFontColor: 'white',
                        })) ?? []}
                        width={100}
                        height={100}
                        chartConfig={chartConf}
                        accessor={"population"}
                        backgroundColor={"none"}
                        center={[20, 0]}
                        hasLegend={true}
                        avoidFalseZero={true}
                        style={{
                            paddingRight: 10,
                            marginVertical: 10,
                            borderRadius: 16,
                            backgroundColor: 'rgba(91,85,75,0.27)',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 100
                        }}
                        paddingLeft={'-10'}/>

                </Box>
            </Animated.View>


        );
    };
    const categoryView = ({item}) => {
        const {color} = item
        return <Box mt={2} flex={1} width={'100%'} flexDirection={'row'} alignItems={'center'}
                    justifyContent={'space-between'} borderWidth={1} borderRadius={8}>
            <Box flexDirection={'row'} padding={1} alignItems={'center'}>
                <FontAwesome style={{marginLeft: 5}} name={'circle'} size={20} color={color}/>
                <Text marginLeft={1} fontSize={18}>{item.name}</Text>
            </Box>
            <Text padding={1} fontSize={18}>{item.population} {chosenWallet.currency}</Text>
        </Box>
    }
    const renderEmptyContainer = () => {
        return <Box mt={4} flex={1} width={'100%'} alignItems={'center'}>
            <Text fontSize={18} fontWeight={'700'} color={colors.gray}> Лист категорий пуст </Text>
        </Box>
    }

    return (
        <>
            <ScrollView contentContainerStyle={!chartDataPie?.length && {flex: 1, alignItems: 'center'}}>
                <SafeAreaView>
                    <Box marginTop={10} paddingLeft={5} paddingRight={5} flex={1} width={'100%'}>
                        {
                            chartDataPie?.length ? (
                                <>
                                    <Box width={'100%'}>
                                        <Box alignItems={'center'}>
                                            <Text fontSize={20} color={colors.gray} fontWeight={'700'}>Инфо о
                                                кошельке</Text>
                                        </Box>
                                        <Box alignItems={'flex-start'}>
                                            <Text color={colors.gray} fontWeight={'500'}>Имя:</Text>
                                            <Text paddingLeft={1} fontSize={18}>{chosenWallet?.name}</Text>
                                            <Text paddingLeft={1} color={colors.gray} fontWeight={'500'}>Валюта: </Text>
                                            <Text paddingLeft={1} fontSize={18}>{chosenWallet?.currency}</Text>
                                            <Text color={colors.gray} fontWeight={'500'}>Дата создания:</Text>
                                            <Text paddingLeft={1}
                                                  fontSize={18}>{dateFormat(convertToDate(chosenWallet?.createdAt))}</Text>
                                        </Box>
                                    </Box>

                                    <Box flex={1}>
                                        <Box alignItems={'center'}>
                                            <Text fontSize={20} fontWeight={'700'} color={colors.gray}>
                                                Статистика за 2022 год
                                            </Text>
                                        </Box>
                                        <Box alignItems={'center'}>
                                            <PieChart
                                                data={chartDataPie?.map(data => ({
                                                    name: data.name,
                                                    population: data.population,
                                                    color: data.color,
                                                    legendFontColor: data.legendFontColor,
                                                })) ?? []}
                                                width={width}
                                                height={220}
                                                chartConfig={chartConf}
                                                accessor={"population"}
                                                backgroundColor={"none"}
                                                center={[20, 0]}
                                                hasLegend={true}
                                                avoidFalseZero={true}
                                                style={{
                                                    paddingRight: 10,
                                                    marginVertical: 10,
                                                    borderRadius: 16,
                                                    backgroundColor: 'rgba(91,85,75,0.27)',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    width: width
                                                }}
                                                paddingLeft={'-10'}/>
                                        </Box>

                                        <Box  mb={4}>
                                            <Box mb={2} alignItems={'center'}>
                                                <Text fontSize={20} color={colors.gray} fontWeight={'700'}>
                                                    Все категории с полной суммой трат
                                                </Text>
                                            </Box>
                                            <FlatList
                                                data={chartDataPie}
                                                renderItem={categoryView}
                                                keyExtractor={(item, index) => index.toString()}
                                                ListEmptyComponent={renderEmptyContainer}
                                                contentContainerStyle={!chartDataPie?.length && styles.contentContainerStyle}/>
                                        </Box>

                                        {/* <Box marginTop={10}>
                                <Text fontSize={20} fontWeight={'700'} color={colors.gray}>
                                    Динамика по месяцам
                                </Text>
                            </Box>
                            <FlatList
                                horizontal={true}
                                data={chartDataPie}
                                renderItem={chartView}
                                keyExtractor={(item, index) => index.toString()}
                                ListEmptyComponent={renderEmptyContainer}
                                contentContainerStyle={!chartDataPie?.length && styles.contentContainerStyle}
                            />*/}
                                    </Box>
                                </>
                            ) : (
                                <Box flex={1} alignItems={'center'} justifyContent={'center'}>
                                    <Text fontSize={24}
                                          color={colors.gray}
                                          fontWeight={'700'}>Пусто</Text>
                                </Box>
                            )

                        }
                        <Box right={5} position={'absolute'} top={0}>
                            <TouchableOpacity onPress={onPressFilter}>
                                <Image alt={'filter for chart'} w={50} height={50} source={filterImage}/>
                            </TouchableOpacity>
                        </Box>
                    </Box>
                </SafeAreaView>
            </ScrollView>
            {modalFilterChart &&
                <FilterChartModal visible={modalFilterChart} onClose={() => setModalFilterChart(false)}/>}
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


export default ChartScreen;