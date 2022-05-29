import React from 'react'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import STYLES from '../../themes/style'
import { AppStatusBar, AppTextInput, ModalLoader, Space } from '../../components'
import COLORS from '../../themes/colors'
import { Ionicons } from '@expo/vector-icons'
import { Context as AuthContext } from '../../contexts/authContext'
import SIZES from '../../themes/sizes'
import { ToastMessage } from '../../utils'
import Validator from 'validator'

const LoginScreen = ({ navigation }) => {
   const loader_ref = React.useRef(null)

   const {
      state: { formData },
      setFormDataField,
      signIn
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
      const email = getValue('email', '').trim()
      const password = getValue('password', '').trim()

      if (email === '' || password === '') {
         ToastMessage('Veuillez renseigner votre adresse e-mail et votre mot de passe.')
         return
      }

      if (!Validator.isEmail(email)) {
         ToastMessage('Votre adresse e-mail n\'est pas valide.')
         return
      }

      const data = {
         email: email,
         password: password
      }

      loader_ref.current.show()
      signIn(data, (err, res) => {
         loader_ref.current.dismiss()
         if (err) {
            console.log('Error on sign in the user : ', err)
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
            <Text style={STYLES.page_title}>Connexion</Text>
            <Space />
            <Space />
            <Space />
            <AppTextInput
               label={'Adresse e-mail'}
               type={'email-address'}
               onChange={(val) => setValue('email', val)}
               value={getValue('email', '')}
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
               onPress={submit}
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
            <ModalLoader ref={loader_ref} />
         </View>
      </AppStatusBar>
   )
}

LoginScreen.navigationOptions = () => ({
   headerShown: false
})

export default LoginScreen
