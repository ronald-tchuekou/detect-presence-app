import React from 'react'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import STYLES from '../../themes/style'
import { AppStatusBar, AppTextInput, Space } from '../../components'
import COLORS from '../../themes/colors'
import { Ionicons } from '@expo/vector-icons'
import { Context as AuthContext } from '../../contexts/authContext'
import SIZES from '../../themes/sizes'

const LoginScreen = ({ navigation }) => {

   const {
      state: { formData },
      setFormDataField
   } = React.useContext(AuthContext)

   function setValue(key, value) {
      setFormDataField({ key: key, value: value }, () => {
      })
   }

   function getValue(key, default_value) {
      if (formData)
         return formData[key] || default_value
      return default_value
   }

   return (
      <AppStatusBar bgColor={COLORS.WHITE} barStyle={'dark-content'}>
         <View style={{ paddingHorizontal: 20 }}>
            <Space />
            <Space />
            <Space />
            <Space />
            <Space />
            <Space />
            <Text style={STYLES.page_title}>Connexion</Text>
            <Space />
            <Space />
            <Space />
            <AppTextInput
               label={'Nom d\'utilisateur'}
               onChange={(val) => setValue('username', val)}
               value={getValue('username', '')}
               iconLeft={() => <Ionicons name={'person'} size={30} color={COLORS.DARK_300} />}
            />
            <Space />
            <AppTextInput
               secure
               label={'Mot de passe'}
               onChange={(val) => setValue('password', val)}
               value={getValue('password', '')}
               iconLeft={() => <Ionicons name={'lock-closed'} size={30} color={COLORS.DARK_300} />}
            />
            <Space />
            <Space />
            <Pressable
               onPress={() => {
                  navigation.navigate('EnseignantFlow')
               }}
               android_ripple={{
                  color: 'rgba(255,255,255,0.53)'
               }}
               style={STYLES.button_primary}>
               <Text style={STYLES.button_text_primary}>Se connecter</Text>
            </Pressable>
            <Space />
            <Space />
            <Space />
            <Space />
            <TouchableOpacity onPress={() => {
               navigation.navigate('PassForgotScreen')
            }}>
               <Text style={{
                  fontSize: SIZES.H7,
                  color: COLORS.ERROR,
                  textAlign: 'center',
                  padding: SIZES.DEFAULT_PADDING
               }}>J'ai oublié mon mot de passe !</Text>
            </TouchableOpacity>
            <Space />
            <Space />
            <Space />
            <Space />
         </View>
      </AppStatusBar>
   )
}

LoginScreen.navigationOptions = () => ({
   headerShown: false
})

export default LoginScreen
