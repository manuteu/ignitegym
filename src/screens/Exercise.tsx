import React, { useEffect, useState } from 'react'
import { HStack, Heading, Icon, Text, VStack, Image, Box, ScrollView, useToast } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import BodySvg from '@assets/body.svg'
import SeriesSvg from '@assets/series.svg'
import RepetitionsSvg from '@assets/repetitions.svg'
import Button from '@components/Button'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { ExerciseDTO } from '@dtos/ExerciseDTO'
import Loading from '@components/Loading'

type RouteParamsProps = {
  exerciseId: string;
}

export default function Exercise() {
  const [isLoading, setIsLoading] = useState(true)
  const [registred, setRegistred] = useState(false)
  const { goBack, navigate } = useNavigation<AppNavigatorRoutesProps>()
  const { params } = useRoute()
  const { exerciseId } = params as RouteParamsProps
  const toast = useToast()

  const [exerciseDetail, setExerciseDetail] = useState<ExerciseDTO>({} as ExerciseDTO)

  const handleGoBack = () => {
    goBack()
  }

  const fetchExerciseDetails = async () => {
    setIsLoading(true)
    try {
      const { data } = await api.get(`/exercises/${exerciseId}`)
      setExerciseDetail(data)

    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível carregar os detalhes do exercício.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleExerciseHistoryRegister = async () => {
    setRegistred(true)
    try {
      await api.post(`/history`, {
        exercise_id: exerciseId
      })

      toast.show({
        title: 'Parabéns! Exercício registrado no seu histórico',
        placement: 'top',
        bgColor: 'green.500'
      })

      navigate('history')

    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível registrar o exercício.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setRegistred(false)
    }
  }

  useEffect(() => {
    fetchExerciseDetails()
  }, [exerciseId])

  return (
    <VStack flex={1}>

      <VStack px={8} bg='gray.600' pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name='arrow-left' color='green.500' size={6} />
        </TouchableOpacity>

        <HStack justifyContent='space-between' mt={4} mb={8} alignItems='center' >
          <Heading color='gray.100' fontSize='lg' flexShrink={1} fontFamily='heading'>
            {exerciseDetail.name}
          </Heading>

          <HStack alignItems='center'>
            <BodySvg />
            <Text color='gray.200' ml={1} textTransform='capitalize'>Costas</Text>
          </HStack>
        </HStack>
      </VStack>

      {isLoading ? <Loading /> : (
        <ScrollView>
          <VStack p={8}>
            {exerciseDetail.demo && (
              <Box rounded='lg' mb={3} overflow='hidden'>
                <Image
                  w='full'
                  h={80}
                  source={{ uri: `${api.defaults.baseURL}/exercise/demo/${exerciseDetail.demo}` }}
                  alt='Nome do Exercício'
                  resizeMode='cover'
                />
              </Box>
            )}

            <Box bg='gray.600' rounded='md' pb={4} px={4}>
              <HStack alignItems='center' justifyContent='space-around' mb={6} mt={5}>
                <HStack alignItems='center'>
                  <SeriesSvg />

                  <Text color='gray.200' ml={2}>{exerciseDetail.series} séries</Text>
                </HStack>

                <HStack alignItems='center'>
                  <RepetitionsSvg />

                  <Text color='gray.200' ml={2}>{exerciseDetail.repetitions} repetições</Text>
                </HStack>
              </HStack>

              <Button
                title='Marcar como realizado'
                onPress={handleExerciseHistoryRegister}
                isLoading={registred}
              />
            </Box>
          </VStack>
        </ScrollView>
      )}
    </VStack>
  )
}