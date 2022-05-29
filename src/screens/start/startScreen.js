import React from 'react'
import { AppStatusBar } from '../../components'
import COLORS from '../../themes/colors'
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
         if (value) {
            setUser(value, () => {
               if (value.role === 'Agent')
                  navigation.navigate('PersonnelFlow')
               else if (value.role === 'Enseignant')
                  navigation.navigate('EnseignantFlow')
            })
         }else{
            navigation.navigate('AuthFlow')
         }
      })
   }

   return (
      <AppStatusBar bgColor={COLORS.WHITE} barStyle={'dark-content'}>
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
                  width: '100%'
               }}
            />
         </View>
      </AppStatusBar>
   )
}

StartScreen.navigationOptions = () => ({
   headerShown: false
})

export default StartScreen
