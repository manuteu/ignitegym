import React, { useState } from 'react'
import { Heading, SectionList, Text } from 'native-base'
import { VStack } from 'native-base'
import ScreenHeader from '@components/ScreenHeader'
import HistoryCard from '@components/HistoryCard'

export default function History() {
  const [exercises, setExercises] = useState([
    {
      title: '22.22.22',
      data: ['maco', 'saco', 'daco']
    },
    {
      title: '22.22.23',
      data: ['maco', 'saco', 'daco']
    }
  ])
  return (
    <VStack flex={1}>
      <ScreenHeader title='Histório de Exercícios' />
      <SectionList
        sections={exercises}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <HistoryCard />
        )}
        renderSectionHeader={({ section }) => (
          <Heading color='gray.200' fontSize='md' mt={10} mb={3} fontFamily='heading'>
            {section.title}
          </Heading>
        )}
        px={8}
        contentContainerStyle={[].length === 0 && { flex: 1, justifyContent: 'center' }}
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