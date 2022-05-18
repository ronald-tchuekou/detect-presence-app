import { createStackNavigator } from 'react-navigation-stack'
import { AgentHomeScreen } from '../screens'

const AgentFlow = createStackNavigator({
   HomeScreen: AgentHomeScreen
}, {
   initialRouteName: 'HomeScreen'
})

export default AgentFlow
