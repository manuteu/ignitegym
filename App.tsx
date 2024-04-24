import { StatusBar, Text, View } from 'react-native';
import { NativeBaseProvider } from 'native-base'
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import Loading from '@components/Loading';
import { THEME } from './src/theme';
import { Routes } from '@routes/index';
import { AuthContextProvider } from '@contexts/AuthContext';
import { NotificationClickEvent, OneSignal } from 'react-native-onesignal'
import { tagUserInfoCreate } from './src/notifications/notificationsTags';
import { useEffect } from 'react';

OneSignal.initialize('41ec8ad1-8005-4994-91f5-56a0981d5236')
OneSignal.Notifications.requestPermission(true)

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserInfoCreate({ user_email: 'mathtechn@gmail.com', user_name: 'Matheus' })

  useEffect(() => {
    const handleNotificationClick = (event: NotificationClickEvent): void => {
      const { actionId } = event.result

      if (actionId === '1') {
        return console.log('Ver Todos')
      }
      if (actionId === '2') {
        return console.log('Ver Exercício')
      }
    }

    OneSignal.Notifications.addEventListener('click', handleNotificationClick)

    return () => {
      OneSignal.Notifications.removeEventListener('click', handleNotificationClick)
    }
  }, [])

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