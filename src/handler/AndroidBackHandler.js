import { Platform, BackHandler, Alert } from 'react-native';
import StaticVariables from "../common/StaticVariables";

// Android back button handler
class AndroidBackHandler {

    static backHandler;

    // Watch android back button
    static watchBackHandler(page, navigation) {
        if (Platform.OS === StaticVariables.PLATFORM_ANDROID) {
            AndroidBackHandler.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
                AndroidBackHandler.goBack(page, navigation); // works best when the goBack is async
                return true;
            });
        }
    }

    // Go to previous page
    static goBack(page, navigation) {
        if (page == StaticVariables.PAGE_MOVIE_LIST) {
            Alert.alert(
                'Exit',
                'Do you want to exit diagnal?',
                [
                    { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                    { text: 'OK', onPress: () => AndroidBackHandler.exitApp() },
                ],
                { cancelable: false }
            )
        } else {
            navigation.goBack();
        }
    }

    // Exit app
    static exitApp() {
        BackHandler.exitApp();
    }

    // Unwatch back button
    static endBackHandler() {
        if (Platform.OS === StaticVariables.PLATFORM_ANDROID) {
            AndroidBackHandler.backHandler.remove();
        }
    }
}

export default AndroidBackHandler;