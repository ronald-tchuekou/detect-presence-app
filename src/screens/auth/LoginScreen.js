import React from 'react'
import { Text, View } from 'react-native'
import SIZES from '../../themes/sizes'
import STYLES from '../../themes/style'

const LoginScreen = ({}) => {
   return (
      <View style={STYLES.row_center}>
         <Text style={{ fontSize: SIZES.H1 }}>Login page !</Text>
      </View>
   )
}

export default LoginScreen
