import React from 'react'
import { Context as AuthContext } from '../../contexts/authContext'
import { getLocaleValue } from '../../utils'
import { ENV } from '../../api/env'
import { Image, View } from 'react-native'
import { splash_screen } from '../../themes/images'

const StartScreen = ({ navigation }) => {
   const {
      setUser
   } = React.useContext(AuthContext)

   React.useEffect(() => {
      checkUser().then(() => {
      })
   }, [])

   const checkUser = () => {
      return getLocaleValue(ENV.user_key, (error, value) => {
         if (value && value.personnel_id) {
            setUser(value, async () => {
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
