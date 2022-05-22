import React from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import SIZES from '../../themes/sizes'
import { AppStatusBar, Space } from '../../components'
import COLORS from '../../themes/colors'
import { Feather, Ionicons } from '@expo/vector-icons'
import { cours_session, financial_state, presence_state, profile2, program_course } from '../../themes/images'
import { ProfileModal } from '../../components/profile.modal'

const HomeScreen = ({navigation}) => {
   const profile_modal_ref = React.useRef(null)

   const goTo = path => navigation.navigate(path)

   function openModal(){
      if(profile_modal_ref){
         profile_modal_ref.current.open()
      }
   }

   return (
      <AppStatusBar bgColor={COLORS.PRIMARY} barStyle={'light-content'}>
         <ScrollView style={{ flex: 1 }}>
            <View style={styles.header_container}>
               <View style={styles.header_background} />
               <View style={styles.header_content}>
                  <View style={styles.header_button_container}>
                     <Pressable android_ripple={{
                        color: 'rgba(255, 255, 255, 0.15)'
                     }} style={styles.header_button}>
                        <Feather name='image' size={35} color='white' />
                     </Pressable>
                  </View>
                  <View style={styles.image_container}>
                     <Image source={profile2} resizeMode={'contain'} style={{ width: '100%', height: '100%' }} />
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
            </View>
            <Space />
            <Space />
            <Space />
            <Space />
            <Space />
            <View style={{
               justifyContent: 'center',
               alignItems: 'center',
               width: '100%'
            }}>
               <View style={styles.line}>
                  <ButtonCard
                     onPress={() => goTo("ProgramCourseScreen")}
                     label={'Programmes de cours'}
                     image={program_course} />
                  <ButtonCard
                     onPress={() => goTo("FinanceStateScreen")}
                     label={'Etat des finances'}
                     image={financial_state} />
               </View>
               <View style={styles.line}>
                  <ButtonCard
                     onPress={() => goTo("CourseSessionScreen")}
                     label={'Session de cours'}
                     image={cours_session} />
                  <ButtonCard
                     onPress={() => goTo("PresenceStateScreen")}
                     label={'Etat de présence'}
                     image={presence_state} />
               </View>
            </View>
            <Space />
            <Space />
            <Space />
            <Space />
            <Space />
            <ProfileModal ref={profile_modal_ref}/>
         </ScrollView>
      </AppStatusBar>
   )
}

const ButtonCard = ({ image, label, onPress }) => {
   const button_styles = StyleSheet.create({
      container1: {
         borderRadius: SIZES.DEFAULT_MARGIN,
         overflow: 'hidden',
         flex: 1,
         width: '100%',
         borderWidth: 1,
         borderColor: COLORS.DARK_200,
         margin: SIZES.SMALL_MARGIN
      },
      container: {
         borderRadius: SIZES.DEFAULT_MARGIN,
         padding: SIZES.DEFAULT_PADDING,
         flex: 1,
         width: '100%'
      }
   })

   return (
      <View style={button_styles.container1}>
         <Pressable
            onPress={onPress}
            android_ripple={{
               color: 'rgba(25, 25, 25, 0.15)'
            }}
            style={button_styles.container}>
            <Image
               source={image}
               style={{
                  width: '100%',
                  height: 150
               }}
               resizeMode={'contain'} />
            <Text style={{
               fontSize: SIZES.H6,
               color: COLORS.PRIMARY,
               fontWeight: '600',
               textAlign: 'center'
            }}>{label}</Text>
         </Pressable>
      </View>
   )
}

const styles = StyleSheet.create({
   header_container: {
      position: 'relative',
      height: 250
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
      alignItems: 'center'
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
   },
   line: {
      flexDirection: 'row',
      width: '100%',
      maxWidth: 550,
      paddingHorizontal: SIZES.DEFAULT_PADDING
   }
})

HomeScreen.navigationOptions = () => ({
   headerShown: false
})

export default HomeScreen
