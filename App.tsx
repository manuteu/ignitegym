import { StatusBar, Text, View } from 'react-native';
import { NativeBaseProvider } from 'native-base'
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import Loading from '@components/Loading';
import { THEME } from './src/theme';
import { Routes } from '@routes/index';
import { AuthContextProvider } from '@contexts/AuthContext';
import { OneSignal } from 'react-native-onesignal'
import { useAuth } from '@hooks/useAuth';
import { tagUserEmailCreate } from 'src/notifications/notificationsTags';

OneSignal.initialize('41ec8ad1-8005-4994-91f5-56a0981d5236')
OneSignal.Notifications.requestPermission(true)

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  const { user } = useAuth()

  tagUserEmailCreate(user.email)
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle='light-content'
        backgroundColor="transparent"
        translucent
      />
      <AuthContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}