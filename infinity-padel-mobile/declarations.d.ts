// Type declarations for external modules to prevent IDE red squigglies
declare module 'react' {
  export const useState: any;
  export const useEffect: any;
  export const useMemo: any;
  export const useCallback: any;
  export const useRef: any;
  export type FC<T = any> = any;
  export default any;
}

declare module 'react-native' {
  export const View: any;
  export const Text: any;
  export const StyleSheet: any;
  export const TouchableOpacity: any;
  export const ScrollView: any;
  export const Image: any;
  export const Modal: any;
  export const Alert: any;
  export const FlatList: any;
  export const TextInput: any;
  export const Platform: any;
  export const Dimensions: any;
}

declare module 'expo-router' {
  export const Stack: any;
  export const Tabs: any;
  export const useRouter: () => any;
  export const useLocalSearchParams: () => any;
  export const Link: any;
}

declare module 'expo-status-bar' {
  export const StatusBar: any;
}

declare module 'react-native-safe-area-context' {
  export const SafeAreaView: any;
  export const SafeAreaProvider: any;
  export const useSafeAreaInsets: () => any;
}

declare module '@tanstack/react-query' {
  export const QueryClient: any;
  export const QueryClientProvider: any;
  export const useQuery: any;
  export const useMutation: any;
}

declare module 'zustand' {
  export const create: any;
}

declare module 'axios' {
  const axios: any;
  export default axios;
}

declare module 'lucide-react-native' {
  export const Bell: any;
  export const MapPin: any;
  export const Clock: any;
  export const Check: any;
  export const CheckCircle2: any;
  export const Calendar: any;
  export const Users: any;
  export const Plus: any;
  export const Trophy: any;
  export const Award: any;
  export const Shield: any;
  export const ShieldCheck: any;
  export const ShieldAlert: any;
  export const Settings: any;
  export const ChevronRight: any;
  export const LogOut: any;
  export const CreditCard: any;
  export const Wallet: any;
  export const Star: any;
  export const ArrowRight: any;
  export const Zap: any;
  export const Info: any;
  export const Share2: any;
  export const X: any;
  export const QrCode: any;
  export const Home: any;
  export const Ticket: any;
  export const User: any;
  export const Sparkles: any;
  export const Filter: any;
}

declare module 'react-native-qrcode-svg' {
  const QRCode: any;
  export default QRCode;
}

declare module 'expo-haptics';
declare module 'expo-secure-store';
declare module 'expo-linking';
declare module 'react-native-reanimated';
