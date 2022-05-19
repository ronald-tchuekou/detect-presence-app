import React from 'react'
import { AppStatusBar, AppTextInput, Space } from '../../components'
import COLORS from '../../themes/colors'
import { Pressable, Text, View } from 'react-native'
import STYLES from '../../themes/style'
import SIZES from '../../themes/sizes'
import { Ionicons } from '@expo/vector-icons'
import { Context as AuthContext } from '../../contexts/authContext'

const ResetPassScreen = ({ navigation }) => {

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
            <Text style={STYLES.page_title}>Réinitialiser le mot de passe</Text>
            <Space />
            <Space />
            <Space />
            <Text style={{
               fontSize: SIZES.H6,
               color: COLORS.DARK_300,
               textAlign: 'center'
            }}>
               Completer ce formulaire pour réinitialiser votre mot de passe
            </Text>
            <Space />
            <AppTextInput
               secure
               label={'Nouveau mot de passe'}
               onChange={(val) => setValue('new_password', val)}
               value={getValue('new_password', '')}
               iconLeft={() => <Ionicons name={'lock-closed'} size={30} color={COLORS.DARK_300} />}
            />
            <Space />
            <AppTextInput
               secure
               label={'Confirmation'}
               onChange={(val) => setValue('confirm_password', val)}
               value={getValue('confirm_password', '')}
               iconLeft={() => <Ionicons name={'lock-closed'} size={30} color={COLORS.DARK_300} />}
            />
            <Space />
            <Space />
            <Space />
            <Pressable
               onPress={() => {
                  navigation.navigate('PersonnelFlow')
               }}
               android_ripple={{
                  color: 'rgba(255,255,255,0.53)'
               }}
               style={STYLES.button_primary}>
               <Text style={STYLES.button_text_primary}>Enregistrer</Text>
            </Pressable>
            <Space />
            <Space />
            <Space />
         </View>
      </AppStatusBar>
   )
}

ResetPassScreen.navigationOptions = () => ({
   headerShown: false
})

export default ResetPassScreen
