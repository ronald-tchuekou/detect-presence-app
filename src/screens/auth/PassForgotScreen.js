import React from 'react'
import COLORS from '../../themes/colors'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import STYLES from '../../themes/style'
import SIZES from '../../themes/sizes'
import { AppStatusBar, AppTextInput, ModalLoader, Space } from '../../components'
import { MaterialIcons } from '@expo/vector-icons'
import { Context as AuthContext } from '../../contexts/authContext'
import { ToastMessage } from '../../utils'
import validator from 'validator'

const PassForgotScreen = ({ navigation }) => {
   const loader_ref = React.useRef(null)

   const {
      state: { formData },
      setFormDataField,
      verifyUserEmail
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

   function submit(){
      const email = getValue('reset_mail', '').trim()

      if(email === ''){
         ToastMessage('Veuillez indiquer l\'adresse e-mail de récupération de mot de passe.')
         return
      }

      if(!validator.isEmail(email)){
         ToastMessage('Votre adresse e-mail de récupération n\'est pas valide.')
         return
      }

      loader_ref.current.show()
      verifyUserEmail({ email }, (err, res) => {
         loader_ref.current.dismiss()
         if(err){
            console.log(err)
            if(err.message)
               ToastMessage(err.message)
            return
         }
         if(res){
            navigation.navigate('ResetPassScreen', {email: res.email, user_id: res.personnel_id})
         }else{
            ToastMessage('Une erreur lors de la vérification de votre adresse e-mail.')
         }
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
            <Text style={STYLES.page_title}>Mot de passe oublié</Text>
            <Space />
            <Space />
            <Space />
            <Text style={{
               fontSize: SIZES.H6,
               color: COLORS.DARK_300,
               textAlign: 'center'
            }}>
               Pour modifier votre mot de passe, veuillez indiquer votre mail enregistré lors de la création de votre
               compte.
            </Text>
            <Space />
            <AppTextInput
               type={'email-address'}
               label={'Mail de récupération'}
               onChange={(val) => setValue('reset_mail', val)}
               value={getValue('reset_mail', '')}
               iconLeft={() => <MaterialIcons name='alternate-email' size={30} color={COLORS.DARK_300} />}
            />
            <Space />
            <Space />
            <Pressable
               onPress={submit}
               android_ripple={{
                  color: 'rgba(255,255,255,0.53)'
               }}
               style={STYLES.button_primary}>
               <Text style={STYLES.button_text_primary}>Envoyer</Text>
            </Pressable>
            <Space />
            <Space />
            <Space />
            <Space />
            <TouchableOpacity onPress={() => {
               navigation.navigate('LoginScreen')
            }}>
               <Text style={{
                  fontSize: SIZES.H7,
                  color: COLORS.ERROR,
                  textAlign: 'center',
                  padding: SIZES.DEFAULT_PADDING
               }}>Je me rappel de mon mot de passe !</Text>
            </TouchableOpacity>
            <Space />
            <Space />
            <ModalLoader ref={loader_ref} />
         </View>
      </AppStatusBar>
   )
}

PassForgotScreen.navigationOptions = () => ({
   headerShown: false
})

export default PassForgotScreen
