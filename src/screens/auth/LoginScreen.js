import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import SIZES from '../../themes/sizes'
import STYLES from '../../themes/style'
import { AppStatusBar } from '../../components'
import COLORS from '../../themes/colors'

const LoginScreen = ({ navigation }) => {
   return (
      <AppStatusBar bgColor={COLORS.WHITE} barStyle={'dark-content'}>
         <View style={{ justifyContent: 'center', flexDirection: 'column', paddingHorizontal: 20 }}>
            <Text style={{ fontSize: SIZES.H1 }}>Login page !</Text>
            <TouchableOpacity onPress={() => {
               navigation.navigate('PassForgotScreen')
            }}>
               <View style={[STYLES.button_primary, { margin: 10 }]}>
                  <Text>Forgot password</Text>
               </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
               navigation.navigate('ResetPassScreen')
            }}>
               <View style={[STYLES.button_primary, { margin: 10 }]}>
                  <Text>Reset password</Text>
               </View>
            </TouchableOpacity>
         </View>
      </AppStatusBar>
   )
}

LoginScreen.navigationOptions = () => ({
   headerShown: false
})

export default LoginScreen
