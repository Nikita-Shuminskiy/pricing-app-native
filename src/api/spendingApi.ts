import {SpendDataType} from "../store/Type/models";
import {AxiosResponse} from "axios/index";
import {instance} from "./config";

export const spendingApi = {
    addSpending(data: SpendDataType): Promise<AxiosResponse<SpendDataType>> {
        return instance.post('history/spending', data);
    },
    updateSpending(spending: SpendingType, walletId: string): Promise<AxiosResponse<SpendDataType>> {
        return instance.put('history/spending', {spending, walletId});
    },
};
type SpendingType = {
    _id: string;
    title: string;
    description: string;
    category: string;
    amount: number;
    walletName: string;
    currency: string;
}