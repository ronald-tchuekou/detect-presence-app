import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import SIZES from '../../themes/sizes'
import { AppStatusBar } from '../../components'
import COLORS from '../../themes/colors'
import { MaterialIcons } from '@expo/vector-icons'
import STYLES from '../../themes/style'
import { Agenda } from 'react-native-calendars'
import moment from 'moment'
import 'moment/locale/fr'

moment.locale('fr')

const ProgramCourseScreen = ({ navigation }) => {

   const [currentDate, setCurrentDate] = React.useState('2022-05-18')

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
            <Text style={STYLES.title} numberOfLines={1}>Programmes de cours</Text>
         </View>
         <Text style={styles.header_title}>{moment(currentDate).format('MMMM YYYY')}</Text>
         <View style={{ flex: 1 }}>
            <Agenda
               selected={moment(currentDate).format('YYYY-MM-DD')}
               loadItemsForMonth={info => {
                  setCurrentDate(info.dateString)
               }}
               onCalendarToggled={calendarOpened => {
                  console.log(calendarOpened)
               }}
               pastScrollRange={20}
               futureScrollRange={20}
               onRefresh={() => console.log('Refreshing...')}
               refreshing={false}
               theme={{
                  selectedDayBackgroundColor: COLORS.PRIMARY,
                  selectedDayTextColor: COLORS.WHITE,
                  arrowColor: COLORS.PRIMARY,
                  indicatorColor: COLORS.PRIMARY
               }}
            />
         </View>
      </AppStatusBar>
   )
}

const styles = StyleSheet.create({
   date_header: {
      paddingHorizontal: SIZES.DEFAULT_PADDING
   },
   button_icon_container: {
      overflow: 'hidden',
      borderRadius: 400
   },
   button_icon: {
      padding: 7
   },
   header_title: {
      fontSize: SIZES.H5,
      color: COLORS.DARK_500,
      textAlign: 'center'
   }
})

ProgramCourseScreen.navigationOptions = () => ({
   headerShown: false
})

export default ProgramCourseScreen
