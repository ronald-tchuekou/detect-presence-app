import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import AuthFlow from './src/navigations/auth-flow'
import { Provider as AuthProvider } from './src/contexts/authContext'
import { Provider as PlanningProvider } from './src/contexts/planningContext'
import PersonnelFlow from './src/navigations/personnel-flow'
import EnseignantFlow from './src/navigations/enseignant-flow'
import './src/calendar-local-config'
import StartFlow from './src/navigations/start-flow'
import * as Notifications from "expo-notifications"

const baseNavigator = createSwitchNavigator({
   StartFlow: StartFlow,
   AuthFlow: AuthFlow,
   PersonnelFlow: PersonnelFlow,
   EnseignantFlow: EnseignantFlow
}, {
   initialRouteName: 'StartFlow'
})

Notifications.setNotificationHandler({
   handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false
   })
})

const App = createAppContainer(baseNavigator)

export default () => {
   const notificationListener = React.useRef(null);
   const responseListener = React.useRef(null);

   React.useEffect(() => {
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
         console.log('Received Notification listener : ', notification)
      })
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
         console.log('Received Notification response : ', response)
      })
      return () => {
         notificationListener.current && Notifications.removeNotificationSubscription(notificationListener.current);
         responseListener.current && Notifications.removeNotificationSubscription(responseListener.current);
      }
   }, [])
   return (
      <AuthProvider>
         <PlanningProvider>
            <App />
         </PlanningProvider>
      </AuthProvider>
   )
}
