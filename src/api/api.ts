import {instance} from './config';
import {AxiosResponse} from 'axios';
import {ChartDataType, ParamsToChartDate, SpendingModel,} from '../store/Type/models';


export const historyApi = {
    getCurrentHistory(walletId: string): Promise<AxiosResponse<SpendingModel[]>> {
        return instance.get<SpendingModel[]>(`history?walletId=${walletId}`);
    },
    getAllHistory(): Promise<AxiosResponse<SpendingModel[]>> {
        return instance.get<SpendingModel[]>(`history/allUserHistory`);
    },
};

export const chartApi = {
    getChartData(params: ParamsToChartDate) {
        try {
            return instance.get<ChartDataType>('chart/getChartData', {
                params: {...params, isMobile: true},
            });
        } catch (err) {
            console.log(err);
        }
    },
};
