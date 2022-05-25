import React from 'react'
import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import SIZES from '../../themes/sizes'
import { AppStatusBar } from '../../components'
import COLORS from '../../themes/colors'
import STYLES from '../../themes/style'
import { MaterialIcons } from '@expo/vector-icons'
import moment from 'moment'
import { Agenda } from 'react-native-calendars'

const PresenceStateScreen = ({ navigation }) => {

   const [currentDate, setCurrentDate] = React.useState('2022-05-18')
   const [calendar_items, setCalendarItems] = React.useState({
      '2022-05-18': [{ name: 'item 1 - any js object' }],
      '2022-05-19': [{ name: 'item 2 - any js object' }],
      '2022-05-20': [],
      '2022-05-21': [{ name: 'item 3 - any js object' }, { name: 'any js object' }]
   })

   function close() {
      navigation.pop()
   }

   function loadItems() {
      // TODO
   }

   function renderItem(reservation, isFirst) {
      const marginTop = isFirst ? SIZES.DEFAULT_MARGIN : 0

      const _styles = StyleSheet.create({
         badge: {
            position: 'absolute',
            top: -10,
            right: 10,
            paddingHorizontal: 6,
            paddingVertical: 2,
            borderRadius: 10,
            backgroundColor: COLORS.SUCCESS,
            color: 'white',
            fontSize: 9
         }
      })

      return (
         <TouchableOpacity
            testID={'item'}
            style={[styles.item, { marginTop }]}
            onPress={() => {
            }}
         >
            <View style={{
               flex: 1,
               flexDirection: 'row',
               justifyContent: 'space-between',
               alignItems: 'center'
            }}>
               <Text style={{ fontSize: 13, color: COLORS.DARK_500 }}>8h00 - 9h00</Text>
               <Text style={{ fontSize: 13, color: COLORS.DARK_500 }}>SVT</Text>
               <Text style={{ fontSize: 13, color: COLORS.DARK_500 }}>2nd C1</Text>
            </View>
            <Text style={_styles.badge}>Présent</Text>
         </TouchableOpacity>
      )
   }

   function renderEmptyDate() {
      return null
   }

   function rowHasChanged(r1, r2) {
      return r1.name !== r2.name
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
            <Text style={STYLES.title} numberOfLines={1}>Etat de présences</Text>
         </View>
         <Text style={styles.header_title}>{moment(currentDate).format('MMMM YYYY')}</Text>
         <View style={{ flex: 1 }}>
            <Agenda
               testID={'agenda'}
               items={{
                  '2022-05-18': [
                     { name: 'item 1 - any js object' },
                     { name: 'item 1 - any js object' },
                     { name: 'item 1 - any js object' },
                     { name: 'item 1 - any js object' },
                     { name: 'item 1 - any js object' }
                  ],
                  '2022-05-19': [
                     { name: 'item 2 - any js object' },
                     { name: 'item 2 - any js object' },
                     { name: 'item 2 - any js object' }
                  ],
                  '2022-05-20': [],
                  '2022-05-21': [
                     { name: 'item 1 - any js object' },
                     { name: 'item 1 - any js object' },
                     { name: 'item 1 - any js object' },
                     { name: 'item 1 - any js object' },
                     { name: 'item 1 - any js object' }
                  ]
               }}
               loadItemsForMonth={loadItems}
               selected={'2022-05-18'}
               renderItem={renderItem}
               renderEmptyDate={renderEmptyDate}
               rowHasChanged={rowHasChanged}
               showClosingKnob={true}
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
   },
   item: {
      flex: 1,
      borderWidth: 1,
      borderColor: COLORS.DARK_200,
      borderRadius: 10,
      padding: 10,
      position: 'relative',
      marginRight: SIZES.SMALL_MARGIN,
      marginBottom: SIZES.DEFAULT_MARGIN
   },
   emptyDate: {
      height: 15,
      flex: 1,
      paddingTop: 30
   }
})

PresenceStateScreen.navigationOptions = () => ({
   headerShown: false
})

export default PresenceStateScreen
