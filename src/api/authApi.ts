import {LoadingEnum, NewUserType} from "../store/Type/models";
import {instance} from "./config";
import {AxiosResponse} from "axios";
import NotificationStore from "../store/NotificationStore/notification-store";


export const authApi = {
    async login(email: string, password: string) {
        NotificationStore.setIsLoading(LoadingEnum.fetching)
        try {
            return await instance.post(`auth/login`, {email, password})
        } catch (e) {
            return e
        } finally {
            NotificationStore.setIsLoading(LoadingEnum.success)
        }
    },
    async logOut(): Promise<AxiosResponse<any>> {
        NotificationStore.setIsLoading(LoadingEnum.fetching)
        try {
            return await instance.post(`auth/logout`);
        } catch (e) {
            return e
        } finally {
            NotificationStore.setIsLoading(LoadingEnum.success)
        }
    },
    async registration(userData: NewUserType): Promise<AxiosResponse<any>> {
        NotificationStore.setIsLoading(LoadingEnum.fetching)
        try {
            const {email, password, lastName, name} = userData;
            return await instance.post('auth/register', {email, password, lastName, name});
        } catch (e) {
            return e
        } finally {
            NotificationStore.setIsLoading(LoadingEnum.success)
        }
    },
    async refreshToken(): Promise<AxiosResponse<any>> {
        NotificationStore.setIsLoading(LoadingEnum.fetching)
        try {
            return await instance.post<{ token: string }>(`auth/refresh`);
        } catch (e) {
            return e
        } finally {
            NotificationStore.setIsLoading(LoadingEnum.success)
        }

    },
};