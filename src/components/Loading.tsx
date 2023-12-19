import { View, Text } from 'react-native'
import React from 'react'
import { Center, Spinner } from 'native-base'

export default function Loading() {
  return (
    <Center flex={1}>
      <Spinner />
    </Center>
  )
}