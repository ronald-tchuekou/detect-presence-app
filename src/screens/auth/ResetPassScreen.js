import React from 'react'
import { AppStatusBar, AppTextInput, ModalLoader, Space } from '../../components'
import COLORS from '../../themes/colors'
import { Pressable, Text, View } from 'react-native'
import STYLES from '../../themes/style'
import SIZES from '../../themes/sizes'
import { Ionicons } from '@expo/vector-icons'
import { Context as AuthContext } from '../../contexts/authContext'
import { ToastMessage } from '../../utils'

const ResetPassScreen = ({ navigation }) => {
   const loader_ref = React.useRef(null)

   const email = navigation.getParam('email')
   const user_id = navigation.getParam('user_id')

   const {
      state: { formData },
      setFormDataField,
      resetUserPassword
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

   function submit() {
      const new_password = getValue('new_password', '').trim()
      const confirmation = getValue('confirm_password', '').trim()

      if (new_password === '' || confirmation === '') {
         ToastMessage('Veuillez renseigner votre nouveau mot de passe et sa confirmation.')
         return
      }

      if (new_password !== confirmation) {
         ToastMessage('Votre mot de passe de confirmation est n\'est pas correct.')
         return
      }

      if (new_password.length < 8) {
         ToastMessage('Votre mot de passe doit avoir au moins 8 caractères.')
         return
      }

      const data = {
         password: new_password,
         user_id,
         email
      }

      loader_ref.current.show()
      resetUserPassword(data, (err, res) => {
         loader_ref.current.dismiss()
         if (err) {
            console.log(err)
            if (err.message)
               ToastMessage(err.message)
            return
         }

         if (!res) {
            ToastMessage('Une erreur inconnue lors de la connexion')
            return
         }
         if (res.role === 'Agent')
            navigation.navigate('PersonnelFlow')
         else if (res.role === 'Enseignant')
            navigation.navigate('EnseignantFlow')
      })
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
               onPress={submit}
               android_ripple={{
                  color: 'rgba(255,255,255,0.53)'
               }}
               style={STYLES.button_primary}>
               <Text style={STYLES.button_text_primary}>Enregistrer</Text>
            </Pressable>
            <Space />
            <Space />
            <Space />
            <ModalLoader ref={loader_ref} />
         </View>
      </AppStatusBar>
   )
}

ResetPassScreen.navigationOptions = () => ({
   headerShown: false
})

export default ResetPassScreen
