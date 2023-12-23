import { Image, IImageProps } from 'native-base'
import React from 'react'

type Props = IImageProps & {
  size: number;
}

export default function UserPhoto({ size, ...rest }: Props) {
  return (
    <Image width={size} height={size} rounded='full' borderWidth={2} borderColor='gray.400' {...rest} />
  )
}