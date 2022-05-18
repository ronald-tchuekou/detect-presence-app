import React from 'react'
import { Text, View } from 'react-native'
import SIZES from '../../themes/sizes'
import STYLES from '../../themes/style'
import { AppStatusBar } from '../../components'

const LoginScreen = ({}) => {
   return (
      <AppStatusBar>
         <View style={STYLES.row_center}>
            <Text style={{ fontSize: SIZES.H1 }}>Login page !</Text>
         </View>
      </AppStatusBar>
   )
}

export { LoginScreen }
