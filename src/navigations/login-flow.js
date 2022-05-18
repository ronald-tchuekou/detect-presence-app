import { createStackNavigator } from 'react-navigation-stack'
import { LoginScreen } from '../screens'

const LoginFlow = createStackNavigator({
   LoginScreen: LoginScreen
}, {
   initialRouteName: 'LoginScreen'
})

export default LoginFlow
