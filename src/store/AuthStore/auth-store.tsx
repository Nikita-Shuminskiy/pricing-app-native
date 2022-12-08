import {userApi} from '../../api/api';
import {action, makeObservable, observable} from 'mobx';
import {NewUserType, UserType} from '../Type/models';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {deviceStorage} from "../../storage/storage";
import {authApi} from "../../api/authApi";

export class AuthStore {
	user: UserType = {} as UserType;

	isAuth: boolean | null = false

	setUser(userData: UserType): void {
		this.user = userData;
		this.setAuth(true);
	}

	setAuth(auth: boolean): void {
		this.isAuth = auth;
	}

	async getUser(): Promise<void> {
		try {
			const { data } = await userApi.getUser();
			this.setUser(data);
		} catch (e: any) {
			console.log(e);
		}
	}

	async login(userData: { email: string; password: string }){
		const { data } = await authApi.login(userData.email, userData.password)
		await deviceStorage.saveItem('token', data.token);
		this.setAuth(true);
		await this.getUser();
	}

	async logOutUser(): Promise<void> {
		await authApi.logOut();
		await AsyncStorage.removeItem('token');
		this.setAuth(false);
	}

	async registration(userData: NewUserType) {
		await authApi.registration(userData);
	}

	async checkAuth(){
		const { data } = await authApi.refreshToken();
		await AsyncStorage.setItem('token', data.token)
		this.setAuth(true);
		await this.getUser();
	}

	constructor() {
		makeObservable(this, {
			user: observable,
			isAuth: observable,
			setUser: action,
			setAuth: action,
			getUser: action,
			login: action,
			logOutUser: action,
			registration: action,
			checkAuth: action,
		});
		this.setAuth = this.setAuth.bind(this);
		this.getUser = this.getUser.bind(this);
		this.checkAuth = this.checkAuth.bind(this);
		this.login = this.login.bind(this);
		this.logOutUser = this.logOutUser.bind(this);
	}
}

export default new AuthStore();
