import React, {useState} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity} from "react-native";
import SafeAreaView from "../../common/components/safe-area-view";
import {observer} from "mobx-react-lite";
import {LineChart, PieChart} from "react-native-chart-kit";
import rootStore from "../../store/RootStore/root-store";
import WalletStore from "../../store/WalletStore/wallet-store";
import CategoriesStore from "../../store/CategoriesStore/categories-store";
import {Box, Image, Text} from "native-base";
import filterImage from '../../assets/images/filter.png'
import FilterChartModal from "../../common/modals/filter-chart-modal";
import {colors} from "../../assets/colors/colors";

const ChartScreen = observer(() => {
    const {CategoryStoreService} = rootStore
    const {chosenWallet} = WalletStore
    const {chartDataPie, labels, walletChartId, chartDataLine} = CategoriesStore
    const [modalFilterChart, setModalFilterChart] = useState(false);
    /*   useEffect(() => {
           CategoryStoreService.getChartData('639e2e063bd3108c8b756de0', '2022')
       }, [])*/
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
    console.log(chartDataLine)
    return (
        <>
            <SafeAreaView>
                <Box flex={1} width={'100%'} alignItems={'center'} justifyContent={'flex-start'}>
                    <Box flex={1} width={'100%'} alignItems={'center'}>
                        <Text fontSize={20} color={colors.gray} fontWeight={'700'}>Инфо о кошельке</Text>
                        <Text color={colors.gray} fontWeight={'500'}>Имя:</Text>
                        <Text color={colors.gray} fontWeight={'500'}>Валюта:</Text>
                        <Text color={colors.gray} fontWeight={'500'}>Дата создания:</Text>
                    </Box>

                    <Box flex={5} justifyContent={'center'} alignItems={'center'}>
                        <Box>
                            <Text fontSize={20} fontWeight={'700'} color={colors.gray}>
                                Данные за 2022 год
                            </Text>
                        </Box>
                        <PieChart
                            data={chartDataPie}
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
                            /*  absolute={true}*/ //show % or total sum
                            paddingLeft={'-10'}/>

                        <Box marginTop={10}>
                            <Text fontSize={20} fontWeight={'700'} color={colors.gray}>
                                Динамика по месяцам
                            </Text>
                        </Box>
                        <LineChart
                            data={{
                                labels: ['January'],
                                datasets: chartDataLine
                                /*legend: ["Rainy Days", "Sunny Days", "Snowy Days"] // optional*/
                            }}
                            width={width}
                            height={220}
                            transparent={true}
                            withShadow={true}
                            withVerticalLabels={true}
                            withInnerLines={true}
                            fromZero={true}
                            yLabelsOffset={5}
                            bezier={true}
                            fromNumber={100}
                            chartConfig={{
                                backgroundColor: '#000000',
                                backgroundGradientFrom: '#eff3ff',
                                backgroundGradientTo: '#efefef',
                                decimalPlaces: 2,
                                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                style: {
                                    borderRadius: 16,
                                },
                            }}
                            style={{
                                paddingTop: 15,
                                borderRadius: 16,
                                backgroundColor: 'rgba(91,85,75,0.27)',
                                width: '100%'
                            }}
                        />
                    </Box>
                    <Box right={10} position={'absolute'} bottom={10}>
                        <TouchableOpacity onPress={onPressFilter}>
                            <Image alt={'filter for chart'} w={50} height={50} source={filterImage}/>
                        </TouchableOpacity>
                    </Box>
                </Box>
            </SafeAreaView>
            {modalFilterChart &&
                <FilterChartModal visible={modalFilterChart} onClose={() => setModalFilterChart(false)}/>}
        </>
    );
});

const styles = StyleSheet.create({})

export default ChartScreen;