import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import AuthFlow from './src/navigations/auth-flow'
import { Provider as AuthProvider } from './src/contexts/authContext'
import AgentFlow from './src/navigations/agent-flow'
import TeacherFlow from './src/navigations/teacher-flow'

const baseNavigator = createSwitchNavigator({
   AuthFlow: AuthFlow,
   AgentFlow: AgentFlow,
   TeacherFlow: TeacherFlow
})

const App = createAppContainer(baseNavigator)

export default () => {
   return (
      <AuthProvider>
         <App />
      </AuthProvider>
   )
}
