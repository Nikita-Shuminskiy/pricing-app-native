import React from 'react';
import {Platform, SafeAreaView as SafeAreaViewComponent} from 'react-native';

const SafeAreaView = ({ children }: { children: JSX.Element[] | JSX.Element }) => (
	<SafeAreaViewComponent style={{ flex: 1, paddingTop: Platform.OS === 'android' ? 35 : 0 }}>
		{children}
	</SafeAreaViewComponent>
);

export default SafeAreaView;
