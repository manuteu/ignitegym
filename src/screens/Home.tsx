import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, HStack, Heading, Text, VStack, useToast } from 'native-base'
import HomeHeader from '@components/HomeHeader'
import Group from '@components/Group'
import ExerciseCard from '@components/ExerciseCard'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { api } from '@services/api'
import { AppError } from '@utils/AppError'
import { ExerciseDTO } from '@dtos/ExerciseDTO'
import Loading from '@components/Loading'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [groups, setGroups] = useState<string[]>([])
  const [exercises, setExercises] = useState<ExerciseDTO[]>([])
  const [groupSelected, setGroupSelected] = useState('antebraço')
  const toast = useToast()
  const { navigate } = useNavigation<AppNavigatorRoutesProps>()

  const handleOpenExerciseDetails = (exerciseId: string) => {
    navigate('exercise', { exerciseId })
  }

  const fetchGroups = async () => {
    try {
      const { data } = await api.get('/groups')
      setGroups(data)

    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível carregar os grupos musculares.';

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  const fetchExerciseByGroup = async () => {
    setIsLoading(true)
    try {
      const { data } = await api.get(`/exercises/bygroup/${groupSelected}`)
      setExercises(data)

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

  useEffect(() => {
    fetchGroups()
  }, [])

  useFocusEffect(useCallback(() => {
    fetchExerciseByGroup()
  }, [groupSelected]))

  return (
    <VStack flex={1}>
      <HomeHeader />
      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected.toUpperCase() === item.toUpperCase()}
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
        minH={10}
      />

      {isLoading ? <Loading /> : (
        <VStack flex={1} px={8}>
          <HStack justifyContent='space-between' mb={5}>
            <Heading color='gray.200' fontSize='md' fontFamily='heading'>
              Exercícios
            </Heading>
            <Text color='gray.200' fontSize='sm'>
              {exercises.length}
            </Text>
          </HStack>

          <FlatList
            data={exercises}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <ExerciseCard data={item} onPress={() => handleOpenExerciseDetails(item.id)} />
            )}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{ paddingBottom: 20 }}
          />
        </VStack>
      )}
    </VStack>
  )
}