import React from 'react'
import { Center, Text, VStack } from 'native-base'
import HomeHeader from '@components/HomeHeader'

export default function Home() {
  return (
    <VStack flex={1}>
      <HomeHeader />
      {/* <Text color='white'>Home</Text> */}
    </VStack>
  )
}