import { createStackNavigator } from 'react-navigation-stack'
import { AgentHomeScreen, FinanceStateScreen, PresenceStateScreen } from '../screens'

const PersonnelFlow = createStackNavigator({
   HomeScreen: AgentHomeScreen,
   FinanceScreen: FinanceStateScreen,
   PresenceScreen: PresenceStateScreen
}, {
   initialRouteName: 'HomeScreen'
})

export default PersonnelFlow
