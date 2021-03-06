import React from 'react'
import { Alert, Image, Pressable, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons'
import { profile2 } from '../themes/images'
import COLORS from '../themes/colors'
import SIZES from '../themes/sizes'
import { pickImage, registerForPushNotificationsAsync, storeLocaleValue, ToastMessage } from '../utils'
import { ProfileModal } from './profile.modal'
import { Context as AuthContext } from '../contexts/authContext'
import { ENV } from '../api/env'
import { ModalLoader } from './loader'

export const HomeHeader = ({ navigation }) => {
   const profile_modal_ref = React.useRef(null)
   const loader_ref = React.useRef(null)

   const {
      state: { currentUser, currentUserToken },
      signOut,
      setUserImage,
      verifyUserEmail,
      setNotificationToken
   } = React.useContext(AuthContext)

   const full_name = currentUser ? currentUser.firstname + ' ' + currentUser.lastname : ''

   React.useEffect(() => {
      if (currentUser && currentUser.email) {
         generationNotificationToken(currentUser).then(() => {
         })
         verifyUserEmail(currentUser, async (err, res) => {
            await storeLocaleValue(ENV.user_key, { ...res, token: currentUserToken })
         })
      }
   }, [currentUser])

   function openModal() {
      if (profile_modal_ref) {
         profile_modal_ref.current.open()
      }
   }

   function logout() {
      Alert.alert(
         'Confirmation',
         'Voulez-vous vraiment vous déconnecter ?',
         [
            {
               text: 'Déconnexion',
               onPress: () => signOut(() => {
                  navigation.navigate('AuthFlow')
               })
            },
            {
               text: 'Annuler',
               onPress: () => {
               }
            }
         ]
      )
   }

   async function generationNotificationToken(user) {
      try {
         const token = await registerForPushNotificationsAsync()
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

   const pickImageToGalerie = React.useCallback(async () => {
      return pickImage((err, res) => {
         if (err) {
            console.log(err)
            return
         }
         if (res)
            saveImage(res)
      })
   }, [])

   const saveImage = React.useCallback((imagePath) => {
      const ext = imagePath.uri.split('.').pop()
      const file = {
         uri: imagePath.uri,
         name: new Date().getTime() + '.' + ext,
         type: `image/${ext}`
      }

      // Create formData with the file field.
      const formData = new FormData()
      formData.append('file', file)

      loader_ref.current.show()
      setUserImage(currentUserToken, formData, currentUser, (err, res) => {
         loader_ref.current.dismiss()
         if (err) {
            console.log(err)
            if (err.message)
               ToastAndroid.show(err.message, ToastAndroid.LONG)
            else
               ToastMessage('Une erreur lors de la mise à jour du profil.')
            return
         }
         console.log('Get image response : ', res)
         ToastAndroid.show('Votre image à été ajoutée avec succès !', ToastAndroid.LONG)
      })
   }, [])

   const getImagePath = React.useCallback(() =>
         `${ENV.base.url}/files?bucket=avatars&filename=${currentUser.image_profile}`
      , [currentUser]
   )

   return (
      <View style={styles.header_container}>
         <View style={styles.header_background} />
         <View style={styles.header_content}>
            <View style={styles.header_button_container}>
               <Pressable onPress={logout} android_ripple={{
                  color: 'rgba(255, 255, 255, 0.15)'
               }} style={styles.header_button}>
                  <AntDesign name='logout' size={35} color={COLORS.ERROR} />
               </Pressable>
            </View>
            <View style={styles.image_container}>
               {currentUser && currentUser.image_profile ? (
                  <Image
                     source={{ uri: getImagePath() }}
                     onError={(error) => {
                        console.log(error)
                        ToastMessage('Votre image de profile ne peux pas s\'afficher ! ' + error.type)
                     }}
                     style={{ width: '100%', height: '100%' }}
                     resizeMode={'contain'}
                  />
               ) : (
                  <Image
                     source={profile2}
                     style={{ width: '100%', height: '100%' }}
                     resizeMode={'contain'}
                  />
               )}
               <View style={styles.image_button_edit}>
                  <Pressable onPress={pickImageToGalerie} android_ripple={{
                     color: 'rgba(255, 255, 255, 0.15)'
                  }} style={styles.header_button}>
                     <Feather name='image' size={35} color='white' />
                  </Pressable>
               </View>
            </View>
            <View style={styles.header_button_container}>
               <Pressable onPress={openModal} android_ripple={{
                  color: 'rgba(255, 255, 255, 0.15)'
               }} style={styles.header_button}>
                  <Ionicons name='person' size={35} color='white' />
               </Pressable>
            </View>
         </View>
         <Text style={styles.header_name}>{full_name}</Text>
         <Text style={styles.header_role}>{currentUser ? currentUser.role : ''}</Text>
         <View style={{ height: 0, width: 0, overflow: 'hidden' }}>
            <ProfileModal ref={profile_modal_ref} />
         </View>
         <ModalLoader ref={loader_ref} />
      </View>
   )
}

const styles = StyleSheet.create({
   header_container: {
      position: 'relative',
      height: 270
   },
   header_background: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      backgroundColor: COLORS.PRIMARY,
      borderBottomLeftRadius: 20000,
      borderBottomRightRadius: 20000
   },
   header_content: {
      paddingHorizontal: SIZES.SMALL_PADDING,
      paddingTop: SIZES.SMALL_PADDING,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20
   },
   header_button_container: {
      overflow: 'hidden',
      borderRadius: 200
   },
   header_button: {
      padding: SIZES.SMALL_PADDING,
      borderRadius: 200
   },
   image_container: {
      position: 'relative',
      height: 150,
      width: 150,
      backgroundColor: COLORS.DARK_200,
      borderRadius: 3000,
      marginVertical: SIZES.SMALL_PADDING,
      marginHorizontal: SIZES.DEFAULT_MARGIN,
      overflow: 'hidden'
   },
   image_button_edit: {
      position: 'absolute',
      bottom: -10,
      right: 30,
      borderRadius: 500,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: COLORS.WHITE,
      backgroundColor: 'rgba(0,0,0,0.25)'

   },
   header_name: {
      color: COLORS.WHITE,
      fontSize: SIZES.H5,
      textAlign: 'center'
   },
   header_role: {
      fontSize: SIZES.H7,
      color: COLORS.SECOND,
      textAlign: 'center'
   }
})
