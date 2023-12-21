import React from 'react'
import { VStack, Image, Text, Center, Heading, ScrollView, Box } from 'native-base'
import LogoSvg from '@assets/logo.svg'
import BackgroundImg from '@assets/background.png'
import Input from '@components/Input'
import Button from '@components/Button'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'
import { useNavigation } from '@react-navigation/native'

export default function SignIn() {

  const { navigate } = useNavigation<AuthNavigatorRoutesProps>()

  const handleNewAccount = () => {
    navigate('signUp')
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack
        bgColor={'gray.700'}
        pb={16}
        flex={1}
      >
        <Image
          source={BackgroundImg}
          alt='Pessoas treinando'
          resizeMode='contain'
          position="absolute"
        />
        <Box flex={1} justifyContent='space-around' px={10}>
          <Center mt={10}>
            <LogoSvg />
            <Text color='gray.100' fontSize='sm'>
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
              Acesse sua conta
            </Heading>
            <Input
              placeholder='E-mail'
              keyboardType='email-address'
              autoCapitalize='none'
            />
            <Input
              placeholder='Senha'
              secureTextEntry
            />
            <Button title='Acessar' />
          </Center>
          <Center>
            <Text
              color='gray.100'
              fontSize='sm'
              mb={3}
              fontFamily='body'
            >
              Ainda não tem acesso?
            </Text>

            <Button title='Criar conta' variant='outline' onPress={handleNewAccount} />
          </Center>
        </Box>
      </VStack>
    </ScrollView>
  )
}