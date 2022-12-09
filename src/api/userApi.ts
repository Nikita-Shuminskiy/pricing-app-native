import {AxiosResponse} from "axios";
import {LoadingEnum, UserType} from "../store/Type/models";
import {instance} from "./config";
import NotificationStore from "../store/NotificationStore/notification-store";

export const userApi = {
    async getUser(): Promise<AxiosResponse<UserType>> {
        NotificationStore.setIsLoading(LoadingEnum.fetching)
        try {
            return await instance.get<UserType>(`users/user`);
        } catch (e) {
            return e
        } finally {
            NotificationStore.setIsLoading(LoadingEnum.success)
        }
    },
};