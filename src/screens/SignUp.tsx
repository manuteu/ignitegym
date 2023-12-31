import React, { useState } from 'react'
import { VStack, Image, Text, Center, Heading, ScrollView, Box, Toast, useToast } from 'native-base'
import LogoSvg from '@assets/logo.svg'
import BackgroundImg from '@assets/background.png'
import Input from '@components/Input'
import Button from '@components/Button'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { useAuth } from '@hooks/useAuth'

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
}

const signUpScheema = yup.object({
  name: yup.string().required('Informe o nome.'),
  email: yup.string().required('Informe o e-mail.').email('E-mail inválido'),
  password: yup.string().required('Informe a senha.').min(6, 'A senha deve ter pelo menos 6 dígitos.'),
  password_confirm: yup.string().required('Confirme a senha.').oneOf([yup.ref('password')], 'A confirmação da senha não confere.'),
})

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false)

  const { signIn } = useAuth()
  const toast = useToast()
  const { goBack } = useNavigation()
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    resolver: yupResolver(signUpScheema)
  })


  const handleGoBack = () => {
    goBack()
  }
  const handleSignUp = async ({ email, name, password }: FormDataProps) => {
    setIsLoading(true)

    try {
      await api.post('/users', { email, name, password })
      await signIn(email, password);

    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível criar a conta. Tente novamente mais tarde'
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
            <Controller
              control={control}
              name='name'
              render={({ field: { onChange, value, onBlur } }) => (
                <Input
                  placeholder='Nome'
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name='email'
              render={({ field: { onChange, value, onBlur } }) => (
                <Input
                  placeholder='E-mail'
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name='password'
              render={({ field: { onChange, value, onBlur } }) => (
                <Input
                  placeholder='Senha'
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  secureTextEntry
                  errorMessage={errors.password?.message}
                />
              )}
            />
            <Controller
              control={control}
              name='password_confirm'
              render={({ field: { onChange, value, onBlur } }) => (
                <Input
                  placeholder='Confirme a senha'
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  secureTextEntry
                  onSubmitEditing={handleSubmit(handleSignUp)}
                  returnKeyType='send'
                  errorMessage={errors.password_confirm?.message}
                />
              )}
            />

            <Button
              mt={4}
              onPress={handleSubmit(handleSignUp)}
              title='Criar e acessar'
              isLoading={isLoading}
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