import { action, makeObservable, observable } from 'mobx';import { CategoryType, ChartDataType, ParamsToChartDate } from '../Type/models';import { v1 } from 'uuid';import { chartApi } from '../../api/api';import { HistoryStore } from '../HistoryStore/history-store';export class CategoriesStore extends HistoryStore {	categories: CategoryType[] = [		{ _id: v1(), value: 'Магазин еды' },		{ _id: v1(), value: 'Магазин одежды' },		{ _id: v1(), value: 'Комунальные услуги' },		{ _id: v1(), value: 'Подарки' },		{ _id: v1(), value: 'Авто серсис' },		{ _id: v1(), value: 'Развлечения' },		{ _id: v1(), value: 'Сигареты и алкоголь' },		{ _id: v1(), value: 'Другое'},		{ _id: v1(), value: 'Бьюти'},	];	selectedСategories: string[] = [];	walletChartId: string | undefined = '';	chartData: ChartDataType[] = [		{			label: 'Chart',			data: [{ x: '', y: 0 }],		},	];	labels: string[] = [];	constructor() {		super();		makeObservable(this, {			selectedСategories: observable,			labels: observable,			chartData: observable,			walletChartId: observable,			setWalletChartId: action,			setSelectedСategories: action,			transformDataToChartData: action,		});		this.setSelectedСategories = this.setSelectedСategories.bind(this);		this.setWalletChartId = this.setWalletChartId.bind(this);	}	setSelectedСategories(newCategory: string): void {		const checkRepeatSelectedCategories = this.selectedСategories.find(			(category) => category === newCategory,		);		if (checkRepeatSelectedCategories) {			this.selectedСategories = this.selectedСategories.filter(				(category) => category !== checkRepeatSelectedCategories,			);		} else {			this.selectedСategories = [...this.selectedСategories, newCategory];		}	}	async transformDataToChartData(params: ParamsToChartDate): Promise<void> {		const { data } = await chartApi.getChartData(params);		this.chartData = data;	}	async setWalletChartId(walletId: string, year?: string): Promise<any> {		try {			await this.transformDataToChartData({				walletId,				year,			});			return 'ok';		} catch (e: any) {			return e.response.data.message;		}	}	addСategory(category: CategoryType): void {		this.categories.push(category);		return;	}	removeСategory(idCategory: string): void {		const currentCategory = this.categories.findIndex((category) => category._id === idCategory);		this.categories.splice(currentCategory, 1);		return;	}	changeСategory(currentCategory: CategoryType): void {		this.categories.find((category) => {			if (category._id === currentCategory._id) {				category.value = currentCategory.value;			}		});		return;	}	setСategory(categories: CategoryType[]): void {		this.categories = categories;		return;	}}export default new CategoriesStore();