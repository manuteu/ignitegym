import { HStack, Heading, Text, VStack, Icon, Pressable } from 'native-base'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { OSNotification } from 'react-native-onesignal'
import { AppNavigatorRoutesProps } from '@routes/app.routes'

type Props = {
  data: OSNotification
  onClose: () => void;
}

type AdditionalDataProps = {
  route?: string;
  exercise_id?: string;
}

export default function Notification({ data, onClose }: Props) {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>()
  const handleOnPress = () => {
    const { route, exercise_id } = data.additionalData as AdditionalDataProps
    if (route === 'exercise' && exercise_id) {
      navigate('exercise', { exerciseId: exercise_id })
      onClose()
    }
  }
  return (
    <Pressable
      borderRadius='lg'
      bg='gray.400'
      position='absolute'
      right={4}
      left={4}
      top={8}
      p={4}
      onPress={handleOnPress}
    >
      <HStack alignItems='center'>
        <VStack flex={1}>
          <HStack alignItems='center' space={3}>
            <Icon
              as={MaterialIcons}
              name='notifications'
              color='gray.200'
              size={5}
            />
            <VStack>
              <Heading color='gray.100' fontSize='md' fontFamily='heading'>
                {data.title}
              </Heading>
              <Text color='gray.100' fontSize='sm'>
                {data.body}
              </Text>
            </VStack>
          </HStack>
        </VStack>
        <TouchableOpacity onPress={onClose}>
          <Icon
            as={MaterialIcons}
            name='close'
            color='gray.200'
            size={5}
          />
        </TouchableOpacity>
      </HStack>
    </Pressable>
  )
}