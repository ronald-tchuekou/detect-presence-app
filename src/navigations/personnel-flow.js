import { createStackNavigator } from 'react-navigation-stack'
import { AgentHomeScreen } from '../screens'
import FinanceStateScreen from '../screens/teacher/FinanceStateScreen'
import PresenceStateScreen from '../screens/teacher/PresenceStateScreen'

const PersonnelFlow = createStackNavigator({
   HomeScreen: AgentHomeScreen,
   FinanceScreen: FinanceStateScreen,
   PresenceScreen: PresenceStateScreen
}, {
   initialRouteName: 'HomeScreen'
})

export default PersonnelFlow
