import React, { useCallback, useEffect, useState } from 'react'
import { Heading, Text, useToast, VStack, SectionList } from 'native-base'
import ScreenHeader from '@components/ScreenHeader'
import HistoryCard from '@components/HistoryCard'
import { AppError } from '@utils/AppError'
import { api } from '@services/api'
import { useFocusEffect } from '@react-navigation/native'
import { HistoryByDayDTO } from '@dtos/HistoryByDayDTO'

export default function History() {
  const [isLoading, setIsLoading] = useState(true)
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([])
  const toast = useToast()

  const fetchHistory = async () => {
    setIsLoading(true)
    try {
      const { data } = await api.get('/history')
      setExercises(data);

    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível registrar o exercício.';

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
      <SectionList
        sections={exercises}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <HistoryCard data={item}/>
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
    </VStack>
  )
}