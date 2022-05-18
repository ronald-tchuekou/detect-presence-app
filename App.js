import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import AuthFlow from './src/navigations/auth-flow'
import { Provider as AuthProvider } from './src/contexts/authContext'
import PersonnelFlow from './src/navigations/personnel-flow'
import EnseignantFlow from './src/navigations/enseignant-flow'

const baseNavigator = createSwitchNavigator({
   AuthFlow: AuthFlow,
   PersonnelFlow: PersonnelFlow,
   EnseignantFlow: EnseignantFlow
})

const App = createAppContainer(baseNavigator)

export default () => {
   return (
      <AuthProvider>
         <App />
      </AuthProvider>
   )
}
