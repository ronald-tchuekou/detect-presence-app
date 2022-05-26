import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { Feather, Ionicons } from '@expo/vector-icons'
import { profile2 } from '../themes/images'
import COLORS from '../themes/colors'
import SIZES from '../themes/sizes'
import { pickImage } from '../utils'
import { ProfileModal } from './profile.modal'

export const HomeHeader = () => {
   const profile_modal_ref = React.useRef(null)

   const [user_profile, setUserProfile] = React.useState(null)

   function openModal() {
      if (profile_modal_ref) {
         profile_modal_ref.current.open()
      }
   }

   async function pickImageToGalerie() {
      return pickImage((err, res) => {
         if (err) {
            console.log(err)
            return
         }
         if (res)
            saveImage(res)
      })
   }

   function saveImage(imagePath) {
      // Todo
      if (imagePath)
         setUserProfile(imagePath.uri)
   }

   return (
      <View style={styles.header_container}>
         <View style={styles.header_background} />
         <View style={styles.header_content}>
            <View style={styles.header_button_container}>
               <Pressable onPress={pickImageToGalerie} android_ripple={{
                  color: 'rgba(255, 255, 255, 0.15)'
               }} style={styles.header_button}>
                  <Feather name='image' size={35} color='white' />
               </Pressable>
            </View>
            <View style={styles.image_container}>
               <Image source={user_profile ? { uri: user_profile } : profile2} resizeMode={'contain'}
                      style={{ width: '100%', height: '100%' }} />
            </View>
            <View style={styles.header_button_container}>
               <Pressable onPress={openModal} android_ripple={{
                  color: 'rgba(255, 255, 255, 0.15)'
               }} style={styles.header_button}>
                  <Ionicons name='person' size={35} color='white' />
               </Pressable>
            </View>
         </View>
         <Text style={styles.header_name}>Ronald Tchuekou</Text>
         <Text style={styles.header_role}>Enseignant</Text>
         <View style={{ height: 0, width: 0, overflow: 'hidden' }}>
            <ProfileModal ref={profile_modal_ref} />
         </View>
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
      height: 150,
      width: 150,
      backgroundColor: COLORS.DARK_200,
      borderRadius: 3000,
      marginVertical: SIZES.SMALL_PADDING,
      marginHorizontal: SIZES.DEFAULT_MARGIN,
      overflow: 'hidden'
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
