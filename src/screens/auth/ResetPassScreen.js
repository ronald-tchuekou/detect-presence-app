import React from 'react'
import { AppStatusBar } from '../../components'
import COLORS from '../../themes/colors'
import { Text, View } from 'react-native'
import STYLES from '../../themes/style'
import SIZES from '../../themes/sizes'

const ResetPassScreen = () => {
   return (
      <AppStatusBar bgColor={COLORS.WHITE} barStyle={'dark-content'}>
         <View style={STYLES.row_center}>
            <Text style={{ fontSize: SIZES.H1 }}>Reset password !</Text>
         </View>
      </AppStatusBar>
   )
}

ResetPassScreen.navigationOptions = () => ({
   headerShown: false
})

export default ResetPassScreen
