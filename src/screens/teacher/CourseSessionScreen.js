import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { AppStatusBar, Space } from '../../components'
import COLORS from '../../themes/colors'
import STYLES from '../../themes/style'
import { MaterialIcons } from '@expo/vector-icons'
import SIZES from '../../themes/sizes'

const CourseSessionScreen = ({ navigation }) => {

   function close() {
      navigation.pop()
   }

   return (
      <AppStatusBar bgColor={COLORS.PRIMARY} barStyle={'light-content'}>
         <View style={STYLES.header_container}>
            <View style={STYLES.close_button}>
               <Pressable onPress={close} android_ripple={{
                  color: 'rgba(0, 0, 0, 0.15)'
               }} style={STYLES.button_icon}>
                  <MaterialIcons name='arrow-back-ios' size={30} color={COLORS.DARK_500} />
               </Pressable>
            </View>
            <Text style={STYLES.title} numberOfLines={1}>Session en cours</Text>
         </View>
         <Space />
         <Space />
         <View style={{ padding: SIZES.DEFAULT_PADDING }}>
            <View style={styles.line}>
               <Text style={styles.label}>Classe :</Text>
               <Text style={styles.value}>Tle C1</Text>
            </View>
            <View style={styles.line}>
               <Text style={styles.label}>Taux horaire :</Text>
               <Text style={styles.value}>3250 XFA</Text>
            </View>
            <View style={styles.line}>
               <Text style={styles.label}>Matière dispensé :</Text>
               <Text style={styles.value}>SVT</Text>
            </View>
            <View style={styles.line}>
               <Text style={styles.label}>Date et heure de debut :</Text>
               <Text style={styles.value}>Aujourd'hui à 8h00</Text>
            </View>
         </View>
      </AppStatusBar>
   )
}

const styles = StyleSheet.create({
   line: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 7
   },
   label: {
      fontSize: 14,
      color: COLORS.DARK_300,
      flex: 1
   },
   value: {
      fontSize: 14,
      color: COLORS.DARK_500,
      fontWeight: 'bold',
      flex: 1
   }
})

CourseSessionScreen.navigationOptions = () => ({
   headerShown: false
})

export default CourseSessionScreen
