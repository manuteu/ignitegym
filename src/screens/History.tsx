import React, { useCallback, useState } from 'react'
import { Heading, Text, useToast, VStack, SectionList } from 'native-base'
import ScreenHeader from '@components/ScreenHeader'
import HistoryCard from '@components/HistoryCard'
import { AppError } from '@utils/AppError'
import { api } from '@services/api'
import { useFocusEffect } from '@react-navigation/native'
import { HistoryByDayDTO } from '@dtos/HistoryByDayDTO'
import Loading from '@components/Loading'
import { tagLastExercise } from '../notifications/notificationsTags'

export default function History() {
  const [isLoading, setIsLoading] = useState(true)
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([])
  const toast = useToast()

  const verifyLastExercise = (lastExerciseDate: any) => {
    if (!lastExerciseDate) return
    var actualDate = new Date();
    var lastExercise = new Date(lastExerciseDate);
    var secDiference = actualDate - lastExercise;
    var daysDiference = Math.ceil(secDiference / (1000 * 60 * 60 * 24));

    if (daysDiference) {
      tagLastExercise(daysDiference.toString())
    }
  }

  const fetchHistory = async () => {
    setIsLoading(true)
    try {
      const { data } = await api.get('/history')
      setExercises(data);
      if (data[0].data[0].created_at) {
        verifyLastExercise(data[0].data[0].created_at)
      }
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível carregar os exercícios.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(useCallback(() => {
    fetchHistory()
  }, []))

  return (
    <VStack flex={1}>
      <ScreenHeader title='Histório de Exercícios' />
      {isLoading ? <Loading /> : (
        <SectionList
          sections={exercises}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <HistoryCard data={item} />
          )}
          renderSectionHeader={({ section }) => (
            <Heading color='gray.200' fontSize='md' mt={10} mb={3} fontFamily='heading'>
              {section.title}
            </Heading>
          )}
          px={8}
          contentContainerStyle={exercises.length === 0 && { flex: 1, justifyContent: 'center' }}
          ListEmptyComponent={() => (
            <Text color='gray.100' textAlign='center'>
              Bora treinar frango!
            </Text>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </VStack>
  )
}