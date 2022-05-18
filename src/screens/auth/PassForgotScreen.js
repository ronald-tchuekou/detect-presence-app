import React from 'react'
import COLORS from '../../themes/colors'
import { Text, View } from 'react-native'
import STYLES from '../../themes/style'
import SIZES from '../../themes/sizes'
import { AppStatusBar } from '../../components'

const PassForgotScreen = () => {
   return (
      <AppStatusBar bgColor={COLORS.WHITE} barStyle={'dark-content'}>
         <View style={STYLES.row_center}>
            <Text style={{ fontSize: SIZES.H1 }}>Password forgot !</Text>
         </View>
      </AppStatusBar>
   )
}

PassForgotScreen.navigationOptions = () => ({
   headerShown: false
})

export default PassForgotScreen
