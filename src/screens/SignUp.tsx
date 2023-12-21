import React from 'react'
import { VStack, Image, Text, Center, Heading, ScrollView, Box } from 'native-base'
import LogoSvg from '@assets/logo.svg'
import BackgroundImg from '@assets/background.png'
import Input from '@components/Input'
import Button from '@components/Button'
import { useNavigation } from '@react-navigation/native'

export default function SignUp() {

  const { goBack } = useNavigation()

  const handleGoBack = () => {
    goBack()
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack
        flex={1}
        bgColor={'gray.700'}
        pb={16}
      >
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt='Pessoas treinando'
          resizeMode='contain'
          position="absolute"
        />
        <Box flex={1} justifyContent='space-around' px={10}>
          <Center mt={10}>
            <LogoSvg />
            <Text
              color='gray.100'
              fontSize='sm'
            >
              Treine sua mente e o seu corpo
            </Text>
          </Center>

          <Center>
            <Heading
              color='gray.100'
              fontSize='xl'
              mb={6}
              fontFamily='heading'
            >
              Crie sua conta
            </Heading>

            <Input
              placeholder='Nome'
            />
            <Input
              placeholder='E-mail'
              keyboardType='email-address'
              autoCapitalize='none'
            />
            <Input
              placeholder='Senha'
              secureTextEntry
            />
            <Button
              title='Criar e acessar'
            />
          </Center>

          <Button
            onPress={handleGoBack}
            title='Voltar par o login'
            variant='outline'
          />
        </Box>
      </VStack>
    </ScrollView>
  )
}