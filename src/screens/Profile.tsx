import React, { useState } from 'react'
import { Center, Heading, ScrollView, Skeleton, Text, VStack } from 'native-base'
import ScreenHeader from '@components/ScreenHeader'
import UserPhoto from '@components/UserPhoto'
import { TouchableOpacity } from 'react-native';
import Input from '@components/Input';
import Button from '@components/Button';

const PHOTO_SIZE = 33;

export default function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)


  return (
    <VStack flex={1}>
      <ScreenHeader title='Perfil' />
      <ScrollView contentContainerStyle={{paddingBottom: 36}}>
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
              source={{ uri: 'https://github.com/manuteu.png' }}
              alt='Foto do usuário'
            />
          )}

          <TouchableOpacity>
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