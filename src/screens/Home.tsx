import React, { useState } from 'react'
import { FlatList, HStack, Heading, Text, VStack } from 'native-base'
import HomeHeader from '@components/HomeHeader'
import Group from '@components/Group'
import ExerciseCard from '@components/ExerciseCard'

export default function Home() {
  const [groups, setGroups] = useState(['costas', 'ombro', 'bíceps', 'perna', 'tríceps'])
  const [exercises, setExercises] = useState(['Remada Curvada', 'Puxada Alta', 'Puxada Frontal'])
  const [groupSelected, setGroupSelected] = useState('costas')
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
        maxHeight={10}
      />
      <VStack flex={1} px={8}>
        <HStack justifyContent='space-between' mb={5}>
          <Heading color='gray.200' fontSize='md'>
            Exercícios
          </Heading>
          <Text color='gray.200' fontSize='sm'>
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <ExerciseCard name={item} />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  )
}