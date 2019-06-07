import NetInfo from "@react-native-community/netinfo";

// Network provider services
class NetworkProvider {

    static connected = false;

    // Check for network
    static checkNetwork() {
        NetInfo.isConnected.fetch().then(isConnected => {
            NetworkProvider.connected = isConnected;
        });
    }

    // Subscribe to network change
    static subscribeNetwork() {
        NetInfo.isConnected.addEventListener(
            'connectionChange',
            NetworkProvider.handleFirstConnectivityChange
        );
    }

    // Unsubscribe to network change 
    static unSubscribeNetwork() {
        NetInfo.isConnected.removeEventListener(
            'connectionChange',
            NetworkProvider.handleFirstConnectivityChange
        );
    }

    // Handle network changes
    static handleFirstConnectivityChange(isConnected) {
        NetworkProvider.connected = isConnected;
    }
}

export default NetworkProvider;