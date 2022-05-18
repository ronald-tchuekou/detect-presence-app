import {createStackNavigator} from 'react-navigation-stack'
import {TeacherHomeScreen} from "../screens"

const EnseignantFlow = createStackNavigator({
   HomeScreen: TeacherHomeScreen
}, {
   initialRouteName: "HomeScreen"
})

export default EnseignantFlow
