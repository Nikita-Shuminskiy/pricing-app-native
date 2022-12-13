import {instance} from './config';
import {AxiosResponse} from 'axios';
import {
    ChartDataType,
    ParamsToChartDate,
    SpendDataType,
    SpendingModel,
} from '../store/Type/models';



export const historyApi = {
    getCurrentHistory(walletId: string): Promise<AxiosResponse<SpendingModel[]>> {
        return instance.get<SpendingModel[]>(`history?walletId=${walletId}`);
    },
    getAllHistory(): Promise<AxiosResponse<SpendingModel[]>> {
        return instance.get<SpendingModel[]>(`history/allUserHistory`);
    },
};

export const chartApi = {
    getChartData(params: ParamsToChartDate): Promise<AxiosResponse<ChartDataType[]>> {
        try {
            return instance.get('chart/getChartData', {
                params: {...params},
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
};

export const spendingApi = {
    addSpending(data: SpendDataType): Promise<AxiosResponse<SpendDataType>> {
        return instance.post('history/spending', data);
    },
};
