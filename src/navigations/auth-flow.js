import { createStackNavigator } from 'react-navigation-stack'
import { LoginScreen, PassForgotScreen, ResetPassScreen } from '../screens'

const AuthFlow = createStackNavigator({
   LoginScreen: LoginScreen,
   PassForgotScreen: PassForgotScreen,
   ResetPassScreen: ResetPassScreen
}, {
   initialRouteName: 'LoginScreen'
})

export default AuthFlow
