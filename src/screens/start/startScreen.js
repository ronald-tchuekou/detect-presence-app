import React from 'react'
import { Context as AuthContext } from '../../contexts/authContext'
import { getLocaleValue, registerForPushNotificationsAsync } from '../../utils'
import { ENV } from '../../api/env'
import { Image, View } from 'react-native'
import { splash_screen } from '../../themes/images'

const StartScreen = ({ navigation }) => {
   const {
      state: {currentUserToken, currentUser},
      setUser,
      setNotificationToken
   } = React.useContext(AuthContext)

   React.useEffect(() => {
      checkUser().then(() => {
      })
   }, [])

   const checkUser = () => {
      return getLocaleValue(ENV.user_key, (error, value) => {
         if (value) {
            setUser(value, async () => {
               await generationNotificationToken(value)
               if (value.role === 'Agent')
                  navigation.navigate('PersonnelFlow')
               else if (value.role === 'Enseignant')
                  navigation.navigate('EnseignantFlow')
            })
         } else {
            navigation.navigate('AuthFlow')
         }
      })
   }

   async function generationNotificationToken(user) {
      try {
         const token = await registerForPushNotificationsAsync()
         console.log('User token : ', token)
         if (token) {
            const data = {
               token: user.token,
               id: user.personnel_id,
               notify_token: token
            }
            setNotificationToken(data, (err, res) => {
               if (err) {
                  console.log('Error when update user notification token : ', err)
                  return
               }
               if (res)
                  console.log('User update notification token : ', res)
            })
         }
      } catch (e) {
         console.log('Error when generate the notify token : ', e)
      }
   }

   return (
      <View style={{
         width: '100%',
         height: '100%',
         flex: 1,
         alignItems: 'center',
         justifyContent: 'center'
      }}>
         <Image
            source={splash_screen}
            resizeMode={'contain'}
            style={{
               margin: 'auto',
               height: '100%'
            }}
         />
      </View>
   )
}

StartScreen.navigationOptions = () => ({
   headerShown: false
})

export default StartScreen
