import {createStackNavigator} from 'react-navigation-stack'
import {TeacherHomeScreen} from "../screens"
import ProgramCourseScreen from '../screens/teacher/ProgramCourseScreen'
import FinanceStateScreen from '../screens/teacher/FinanceStateScreen'
import CourseSessionScreen from '../screens/teacher/CourseSessionScreen'
import PresenceStateScreen from '../screens/teacher/PresenceStateScreen'

const EnseignantFlow = createStackNavigator({
   HomeScreen: TeacherHomeScreen,
   ProgramCourseScreen: ProgramCourseScreen,
   FinanceStateScreen: FinanceStateScreen,
   CourseSessionScreen: CourseSessionScreen,
   PresenceStateScreen: PresenceStateScreen
}, {
   initialRouteName: "HomeScreen"
})

export default EnseignantFlow
