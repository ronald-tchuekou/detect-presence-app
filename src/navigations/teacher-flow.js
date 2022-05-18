import { createStackNavigator } from 'react-navigation-stack'
import { TeacherHomeScreen } from '../screens'

const TeacherFlow = createStackNavigator({
   HomeScreen: TeacherHomeScreen
}, {
   initialRouteName: 'HomeScreen'
})

export default TeacherFlow
