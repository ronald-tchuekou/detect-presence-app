import { createStackNavigator } from 'react-navigation-stack'
import { StartScreen } from '../screens'

const StartFlow = createStackNavigator({
   StartScreen: StartScreen
}, {
   initialRouteName: 'StartScreen'
})

export default StartFlow
