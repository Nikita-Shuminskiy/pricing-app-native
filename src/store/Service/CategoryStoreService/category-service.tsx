import React from 'react';import RootStore from '../../RootStore/root-store';export class CategoryStoreService {	rootStore: typeof RootStore;	constructor(rootStore: typeof RootStore) {		this.rootStore = rootStore;	}}export default CategoryStoreService;