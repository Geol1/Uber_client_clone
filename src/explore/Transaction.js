import * as React from 'react';
import {
  Button,
  View,
  Text,
  SafeAreaView
} from 'react-native';

const SecondPage = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
         
          <Button
            title="Go to Third Page"
            onPress={
              () => navigation.navigate('HistoriqueTransaction')
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default SecondPage;