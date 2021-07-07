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
              placement: "top",
          })
        }>
        Info
      </Button>

    
  )
}

export default () => {
  return (
      <Center>
        <Example />
      </Center>
  )
}
