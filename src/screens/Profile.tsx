import React, { useState } from 'react'
import { Center, Heading, ScrollView, Skeleton, Text, VStack, useToast } from 'native-base'
import ScreenHeader from '@components/ScreenHeader'
import UserPhoto from '@components/UserPhoto'
import { TouchableOpacity, Alert } from 'react-native';
import Input from '@components/Input';
import Button from '@components/Button';
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system';

const PHOTO_SIZE = 33;

export default function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState('https://github.com/manuteu.png')

  const toast = useToast()

  const handleUserPhotoSelect = async () => {
    setPhotoIsLoading(true)
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      })
      console.log(photoSelected);

      if (photoSelected.canceled) {
        return;
      }

      // Utiliza o FileSystem para verificar o tamanho da imagem, já que o Image picker não possui essa função
      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri)

        // Converte para 5 MB
        if (photoInfo.exists && photoInfo.size && (photoInfo.size / 1024 / 1024) > 5) {
          // Snackbar, notifica o usuário com uma mensagem
          return toast.show({
            title: 'Essa imagem é muito grande. Escolha uma de até 5MB.',
            placement: 'top',
            bgColor: 'red.500'
          })
        }

        setUserPhoto(photoSelected.assets[0].uri)
      }

    } catch (error) {
      console.error(error)
    } finally {
      setPhotoIsLoading(false)
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title='Perfil' />
      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt={6} px={10}>
          {photoIsLoading ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded='full'
              startColor='gray.400'
              endColor='gray.600'
            />
          ) : (
            <UserPhoto
              size={PHOTO_SIZE}
              source={{ uri: userPhoto }}
              alt='Foto do usuário'
            />
          )}

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text color='green.500' fontWeight='bold' fontSize='md' mt={2} mb={8}>
              Alterar Foto
            </Text>
          </TouchableOpacity>

          <Input
            placeholder='Nome'
            bg='gray.600'
          />
          <Input
            value='mathtechn@gmail.com'
            bg='gray.600'
            isDisabled
          />
          <Heading color='gray.200' fontSize='md' mb={2} mt={12} alignSelf='flex-start'>Alterar Senha</Heading>

          <Input bg='gray.600' placeholder='Senha antiga' secureTextEntry />
          <Input bg='gray.600' placeholder='Nova senha' secureTextEntry />
          <Input bg='gray.600' placeholder='Confirmar nova senha' secureTextEntry />

          <Button
            title='Atualizar'
            mt={4}
          />
        </Center>

      </ScrollView>
    </VStack>
  )
}