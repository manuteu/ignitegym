import { useEffect, useState } from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import AuthRoutes from './auth.routes';
import { Box, useTheme } from 'native-base';
import { AppRoutes } from './app.routes';
import { useAuth } from '@hooks/useAuth';
import Loading from '@components/Loading';
import { NotificationWillDisplayEvent, OSNotification, OneSignal } from 'react-native-onesignal';
import Notification from '@components/Notification'

export function Routes() {
  const { colors } = useTheme()
  const { user, isLoadingUserStorageData } = useAuth()
  const [notification, setNotification] = useState<OSNotification>()

  const linking = {
    prefixes: ['com.mathtechn.ignitegym://', 'ignitegym://'],
    config: {
      screens: {
        exercise: {
          path: '/exercise/:exerciseId',
          parse: {
            exerciseId: (exerciseId: string) => exerciseId,
          }
        },
        NotFound: '*',
      }
    }
  }

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700]

  useEffect(() => {
    const handleNotification = (event: NotificationWillDisplayEvent): void => {
      event.preventDefault()
      const response = event.getNotification()
      setNotification(response)
    }

    OneSignal.Notifications.addEventListener("foregroundWillDisplay", handleNotification)

    return () => OneSignal.Notifications.removeEventListener("foregroundWillDisplay", handleNotification)
  }, []);

  if (isLoadingUserStorageData) {
    return <Loading />
  }
  return (
    <Box flex={1} bg='gray.700'>
      <NavigationContainer theme={theme} linking={linking}>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
        {notification?.title && (
          <Notification
            data={notification}
            onClose={() => setNotification(undefined)}
          />
        )}
      </NavigationContainer>
    </Box>
  )
}