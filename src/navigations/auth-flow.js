import {createStackNavigator} from 'react-navigation-stack'
import { LoginScreen } from '../screens'
import PassForgotScreen from '../screens/auth/PassForgotScreen'
import ResetPassScreen from '../screens/auth/ResetPassScreen'

const AuthFlow = createStackNavigator({
   LoginScreen: LoginScreen,
   PassForgotScreen: PassForgotScreen,
   ResetPassScreen: ResetPassScreen
}, {
   initialRouteName: "LoginScreen"
})

export default AuthFlow
