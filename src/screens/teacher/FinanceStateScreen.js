import React from 'react'
import { ScrollView, Text } from 'react-native'
import SIZES from '../../themes/sizes'
import { AppStatusBar } from '../../components'
import COLORS from '../../themes/colors'

const FinanceStateScreen = ({ navigation }) => {

   const goTo = path => navigation.navigate(path)

   return (
      <AppStatusBar bgColor={COLORS.PRIMARY} barStyle={'light-content'}>
         <ScrollView style={{ flex: 1 }}>
            <Text style={{
               fontSize: SIZES.H3,
               textAlign: 'center',
               padding: SIZES.DEFAULT_PADDING
            }}>Finance state screen</Text>
         </ScrollView>
      </AppStatusBar>
   )
}

FinanceStateScreen.navigationOptions = () => ({
   headerShown: false
})

export default FinanceStateScreen
