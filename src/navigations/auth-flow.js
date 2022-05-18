import {createStackNavigator} from 'react-navigation-stack'
import { LoginScreen } from '../screens'

const AuthFlow = createStackNavigator({
   LoginScreen: LoginScreen
}, {
   initialRouteName: LoginScreen
})

export default AuthFlow
