import { createStackNavigator } from 'react-navigation-stack'
import {
   CourseSessionScreen,
   FinanceStateScreen,
   PresenceStateScreen,
   ProgramCourseScreen,
   TeacherHomeScreen
} from '../screens'

const EnseignantFlow = createStackNavigator({
   HomeScreen: TeacherHomeScreen,
   ProgramCourseScreen: ProgramCourseScreen,
   FinanceStateScreen: FinanceStateScreen,
   CourseSessionScreen: CourseSessionScreen,
   PresenceStateScreen: PresenceStateScreen
}, {
   initialRouteName: 'HomeScreen'
})

export default EnseignantFlow
