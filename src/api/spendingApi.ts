import {SpendDataType} from "../store/Type/models";
import {AxiosResponse} from "axios/index";
import {instance} from "./config";

export const spendingApi = {
    addSpending(data: SpendDataType): Promise<AxiosResponse<SpendDataType>> {
        return instance.post('history/spending', data);
    },
};
