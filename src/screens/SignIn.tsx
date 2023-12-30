import React, { useState } from 'react'
import { VStack, Image, Text, Center, Heading, ScrollView, Box, useToast } from 'native-base'
import LogoSvg from '@assets/logo.svg'
import BackgroundImg from '@assets/background.png'
import Input from '@components/Input'
import Button from '@components/Button'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'
import { useNavigation } from '@react-navigation/native'
import { Controller, useForm } from 'react-hook-form'
import { useAuth } from '@hooks/useAuth'
import { AppError } from '@utils/AppError'

type FormData = {
  email: string;
  password: string;
}

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false)

  const { navigate } = useNavigation<AuthNavigatorRoutesProps>()
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>()
  const { signIn } = useAuth()
  const toast = useToast()

  const handleNewAccount = () => {
    navigate('signUp')
  }

  const handleSignin = async ({ email, password }: FormData) => {
    setIsLoading(true)
    try {
      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : 'Não foi possível entrar. Tente novamente mais tarde.'
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })

      setIsLoading(false)
    }
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
            <Controller
              control={control}
              name='email'
              rules={{ required: 'Informe o e-mail' }}
              render={({ field: { onChange } }) => (
                <Input
                  placeholder='E-mail'
                  keyboardType='email-address'
                  onChangeText={onChange}
                  errorMessage={errors.email?.message}
                  autoCapitalize='none'
                />
              )}
            />

            <Controller
              control={control}
              name='password'
              rules={{ required: 'Informe a senha' }}
              render={({ field: { onChange } }) => (
                <Input
                  placeholder='Senha'
                  secureTextEntry
                  onChangeText={onChange}
                  errorMessage={errors.password?.message}
                />
              )}
            />

            <Button
              title='Acessar'
              onPress={handleSubmit(handleSignin)}
              isLoading={isLoading}
            />
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

            <Button
              title='Criar conta'
              variant='outline'
              onPress={handleNewAccount}
            />
          </Center>
        </Box>
      </VStack>
    </ScrollView>
  )
}