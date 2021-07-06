import React from "react"
import {
  Button,
  useToast,
  VStack,
  Center,
  NativeBaseProvider,
} from "native-base"

export const Example = () => {
  const toast = useToast()
  
  return (
    
      <Button
        onPress={() =>
          toast.show({
            title: "Network connection restored",
            status: "info",
            description:
              "This is to inform you that your network connectivity is restored",
          })
        }>
        Info
      </Button>

    
  )
}

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <Example />
      </Center>
    </NativeBaseProvider>
  )
}
