import React from 'react'
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import SIZES from '../../themes/sizes'
import { AppStatusBar, ModalLoader } from '../../components'
import COLORS from '../../themes/colors'
import { MaterialIcons } from '@expo/vector-icons'
import STYLES from '../../themes/style'
import { Agenda } from 'react-native-calendars'
import moment from 'moment'
import 'moment/locale/fr'
import { Context as PlanningContext } from '../../contexts/planningContext'
import { Context as AuthContext } from '../../contexts/authContext'

moment.locale('fr')

const ProgramCourseScreen = ({ navigation }) => {
   const loader_ref = React.useRef(null)

   const [currentDate, setCurrentDate] = React.useState('2022-05-18')
   const [calendar_items, setCalendarItems] = React.useState({})

   const { fetchPlanning } = React.useContext(PlanningContext)
   const { state: { currentUser } } = React.useContext(AuthContext)

   React.useEffect(() => {
      loadItems()
   }, [])

   function close() {
      navigation.pop()
   }

   function loadItems() {
      loader_ref.current.show()
      fetchPlanning(currentUser.personnel_id, (error, res) => {
         loader_ref.current.dismiss()
         if (error) {
            console.log(error)
            return
         }
         console.log(res)
         let result = {}
         res.forEach(item => {
            const date = moment(item.date).format('YYYY-MM-DD')
            const content = result[date]
            if (content) {
               result = {
                  ...result,
                  [date]: [...result[date], item]
               }
            } else {
               result = {
                  ...result,
                  [date]: [item]
               }
            }
         })
         console.log('Data : ', result)
         setCalendarItems(result)
      })
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
            backgroundColor: reservation.status === 'WAITING' ? COLORS.WARNING :
            reservation.status === 'IN_COURSE' ? COLORS.PRIMARY : COLORS.SUCCESS,
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
               {
                  reservation.status === 'WAITING' ? 'En attente' :
                  reservation.status === 'IN_COURSE' ? 'En cours' : 'Complet'
               }
            </Text>
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
            <Text style={STYLES.title} numberOfLines={1}>Programmes de cours</Text>
         </View>
         <Text style={styles.header_title}>{moment(currentDate).format('MMMM YYYY')}</Text>
         <View style={{ flex: 1 }}>
            <Agenda
               testID={'agenda'}
               items={calendar_items}
               loadItemsForMonth={() => false}
               selected={moment().format('YYYY-MM-DD')}
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

ProgramCourseScreen.navigationOptions = () => ({
   headerShown: false
})

export default ProgramCourseScreen
