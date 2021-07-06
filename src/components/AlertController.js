import React from 'react'
import { View} from 'react-native'
import {Text,Button,IconButton,Alert,Collapse,CloseIcon,Box} from 'native-base';

export default function AlertController({show,alert,LogOut,setShow}) {
    return (
        <View>
             <Box w="100%">
                <Collapse isOpen={show}>
                    <Alert
                        status={alert.status}
                        action={
                            <IconButton
                            icon={<CloseIcon color="red.400" size="xs" />}
                            onPress={() =>  setShow(false)}
                            />
                        }
                        actionProps={{
                            alignSelf: "center",
                        }}
                    >
                    <Alert.Icon />
                        <Alert.Title>{alert.title}</Alert.Title>
                        <Alert.Description>{alert.description}</Alert.Description>
                    </Alert>
                    <Button  size={"sm"}  onPress={() => { LogOut()}} my={2} mx="auto"> Oui </Button>
                </Collapse>
            </Box>
        </View>
    )
}
