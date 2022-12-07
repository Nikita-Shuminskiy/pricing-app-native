import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';

export default function App() {
    return (
        <View style={styles.container}>
            <Text>Фил охуеет когда узнает что пони веб переезжяет в мобилки</Text>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        width: 50,
        height: 200,
        resizeMode: 'stretch',
    }
});
