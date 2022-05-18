import {createStackNavigator} from 'react-navigation-stack'
import {AgentHomeScreen} from "../screens"

const PersonnelFlow = createStackNavigator({
   HomeScreen: AgentHomeScreen
}, {
   initialRouteName: "HomeScreen"
})

export default PersonnelFlow
