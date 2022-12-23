import React, {useEffect, useRef, useState} from 'react';
import {Animated, Dimensions, FlatList, StyleSheet, TouchableOpacity} from "react-native";
import SafeAreaView from "../../common/components/safe-area-view";
import {observer} from "mobx-react-lite";
import {PieChart} from "react-native-chart-kit";
import WalletStore from "../../store/WalletStore/wallet-store";
import CategoriesStore from "../../store/CategoriesStore/categories-store";
import {Box, Image, ScrollView, Text} from "native-base";
import filterImage from '../../assets/images/filter.png'
import FilterChartModal from "../../common/modals/filter-chart-modal";
import {colors} from "../../assets/colors/colors";
import {convertToDate, dateFormat} from "../../utils/utils";
import {FontAwesome} from "@expo/vector-icons";

const ChartScreen = observer(() => {
    const {chosenWallet} = WalletStore
    const {chartDataPie, chartFilterDate} = CategoriesStore
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

                                                Статистика
                                                за {chartFilterDate.month ? `${chartFilterDate.month} ${chartFilterDate.year} года` : `${chartFilterDate.year} год`}
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

                                        <Box mb={4}>
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
    contentContainerStyle: {flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 5},
});


export default ChartScreen;