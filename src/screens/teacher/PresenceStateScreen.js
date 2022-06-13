import React from 'react'
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import SIZES from '../../themes/sizes'
import { AppStatusBar, ModalLoader } from '../../components'
import COLORS from '../../themes/colors'
import STYLES from '../../themes/style'
import { MaterialIcons } from '@expo/vector-icons'
import moment from 'moment'
import { Agenda } from 'react-native-calendars'
import { Context as PlanningContext } from '../../contexts/planningContext'
import { Context as AuthContext } from '../../contexts/authContext'
import sortBy from 'lodash.sortby'

const PresenceStateScreen = ({ navigation }) => {
   const loader_ref = React.useRef(null)

   const [currentDate, setCurrentDate] = React.useState(new Date().toString())
   const [calendar_items, setCalendarItems] = React.useState({})

   const { fetchPlanning } = React.useContext(PlanningContext)
   const { state: { currentUser } } = React.useContext(AuthContext)

   React.useEffect(() => {
      loadItems()
   }, [])

   const close = React.useCallback(() => navigation.pop(), [])

   const loadItems = React.useCallback(() => {
      loader_ref.current.show()
      fetchPlanning(currentUser.personnel_id, (error, res) => {
         loader_ref.current.dismiss()
         if (error) {
            console.log(error)
            return
         }
         let result = {}
         res.forEach(item => {
            const date = moment(item.date).format('YYYY-MM-DD')
            const content = result[date]
            if (content) {
               result = {
                  ...result,
                  [date]: sortBy([...result[date], item], 'begin')
               }
            } else {
               result = {
                  ...result,
                  [date]: [item]
               }
            }
         })
         setCalendarItems(result)
      })
   }, [])

   const renderItem = React.useCallback((reservation, isFirst) => {
      const marginTop = isFirst ? SIZES.DEFAULT_MARGIN : 0

      const isLet = () => moment(moment(reservation.date).format('YYYY-MM-DD'))
         .isBefore(moment(moment().format('YYYY-MM-DD')))

      const _styles = StyleSheet.create({
         badge: {
            position: 'absolute',
            top: -10,
            right: 10,
            paddingHorizontal: 6,
            paddingVertical: 2,
            borderRadius: 10,
            backgroundColor: reservation.status === 'WAITING' ? (
               isLet() ? COLORS.ERROR : COLORS.WARNING
            ) : reservation.status === 'IN_COURSE' ? COLORS.PRIMARY : COLORS.SUCCESS,
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
               <Text style={{ fontSize: 13, color: COLORS.DARK_500 }}>
                  {moment('2022-10-10 ' + reservation.begin)
                     .format('HH:mm')} - {moment('2022-10-10 ' + reservation.end)
                  .format('HH:mm')}
               </Text>
               <Text style={{ fontSize: 13, color: COLORS.DARK_500 }}>{reservation.matiere}</Text>
               <Text style={{ fontSize: 13, color: COLORS.DARK_500 }}>{reservation.classe_code}</Text>
            </View>
            <Text style={_styles.badge}>
               {reservation.status === 'WAITING' ? (isLet() ? 'Absent' : 'En attente') :
                  reservation.status === 'IN_COURSE' ? 'En cours' : 'Complet'}
            </Text>
         </TouchableOpacity>
      )
   }, [])

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
            <Text style={STYLES.title} numberOfLines={1}>Etat de présence</Text>
         </View>
         <Text style={styles.header_title}>{moment(currentDate).format('MMMM YYYY')}</Text>
         <View style={{ flex: 1 }}>
            <Agenda
               testID={'agenda'}
               items={calendar_items}
               loadItemsForMonth={() => false}
               selected={moment().format('YYYY-MM-DD')}
               onDayPress={(date) => setCurrentDate(date.dateString)}
               renderItem={renderItem}
               pastScrollRange={10}
               futureScrollRange={10}
               refreshing={false}
               refreshControl={null}
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
         <View style={{ height: 0, width: 0 }}>
            <ModalLoader ref={loader_ref} />
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
