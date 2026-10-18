// Type declarations for external modules to prevent IDE red squigglies
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
    interface Element extends any {}
  }

  namespace React {
    type FC<P = any> = (props: P) => any;
    type ReactNode = any;
    type ReactElement = any;
    type ComponentType<P = any> = (props: P) => any;
  }
}

declare module 'react' {
  export const useState: <T = any>(initial: T | (() => T)) => [T, (val: T | ((prev: T) => T)) => void];
  export const useEffect: (effect: () => void | (() => void), deps?: any[]) => void;
  export const useMemo: <T = any>(factory: () => T, deps?: any[]) => T;
  export const useCallback: <T extends (...args: any[]) => any>(callback: T, deps?: any[]) => T;
  export const useRef: <T = any>(initial?: T) => { current: T };
  export type FC<T = any> = (props: T) => any;
  export type ReactNode = any;
  const React: any;
  export default React;
}

declare module 'react-native' {
  export const View: any;
  export const Text: any;
  export const StyleSheet: {
    create: <T extends Record<string, any>>(styles: T) => T;
  };
  export const TouchableOpacity: any;
  export const ScrollView: any;
  export const Image: any;
  export const Modal: any;
  export const Alert: {
    alert: (title: string, message?: string, buttons?: any[]) => void;
  };
  export const FlatList: any;
  export const TextInput: any;
  export const Platform: any;
  export const Dimensions: any;
  export const ActivityIndicator: any;
  export const Linking: {
    openURL: (url: string) => Promise<any>;
    canOpenURL: (url: string) => Promise<boolean>;
  };
}

declare module 'expo-router' {
  export const Stack: any;
  export const Tabs: any;
  export const useRouter: () => {
    push: (url: string) => void;
    replace: (url: string) => void;
    back: () => void;
  };
  export const useLocalSearchParams: <T = any>() => T;
  export const Link: any;
}

declare module 'expo-status-bar' {
  export const StatusBar: any;
}

declare module 'react-native-safe-area-context' {
  export const SafeAreaView: any;
  export const SafeAreaProvider: any;
  export const useSafeAreaInsets: () => { top: number; bottom: number; left: number; right: number };
}

declare module '@tanstack/react-query' {
  export const QueryClient: any;
  export const QueryClientProvider: any;
  export const useQuery: any;
  export const useMutation: any;
}

declare module 'zustand' {
  export const create: <T = any>(fn: (set: any, get: any) => T) => () => T;
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
  export const Phone: any;
  export const PhoneCall: any;
  export const Mail: any;
  export const Lock: any;
  export const LogIn: any;
  export const UserPlus: any;
  export const Camera: any;
  export const Edit3: any;
  export const Globe: any;
  export const Medal: any;
  export const Flame: any;
  export const AlertTriangle: any;
  export const AlertCircle: any;
  export const PlusCircle: any;
  export const CheckCheck: any;
  export const Trash2: any;
  export const Copy: any;
  export const FileText: any;
}

declare module 'react-native-qrcode-svg' {
  const QRCode: any;
  export default QRCode;
}

declare module 'expo-haptics';
declare module 'expo-secure-store';
declare module 'expo-linking';
declare module 'react-native-reanimated';
