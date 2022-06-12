import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { AppStatusBar, ModalLoader, Space } from '../../components'
import COLORS from '../../themes/colors'
import STYLES from '../../themes/style'
import { MaterialIcons } from '@expo/vector-icons'
import { Context as AuthContext } from '../../contexts/authContext'
import { Context as PlanningContext } from '../../contexts/planningContext'
import SIZES from '../../themes/sizes'
import moment from 'moment'

const CourseSessionScreen = ({ navigation }) => {
   const loader_ref = React.useRef(null)

   function close() {
      navigation.pop()
   }

   const [planning, setPlanning] = React.useState({})

   const {state: {currentUserToken}} = React.useContext(AuthContext)
   const {fetchCurrentPlanning} = React.useContext(PlanningContext)

   React.useEffect(() => {
      loader_ref.current.show()
      fetchCurrentPlanning(currentUserToken, (err, res) => {
         loader_ref.current.dismiss()
         if(err){
            console.log(err)
            return
         }
         setPlanning(res)
      })
   }, [])

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
         {!planning.planning_id ? (
            <View style={{padding: SIZES.DEFAULT_PADDING, marginVertical: SIZES.LARGE_PADDING}}>
               <Text style={{
                  fontSize: SIZES.H5,
                  color: COLORS.ERROR,
                  textAlign: 'center'
               }}>Aucune session en cours pour le moment !</Text>
            </View>
         ):(
            <View style={{ padding: SIZES.DEFAULT_PADDING }}>
               <View style={styles.line}>
                  <Text style={styles.label}>Classe :</Text>
                  <Text style={styles.value}>{planning.classe}</Text>
               </View>
               <View style={styles.line}>
                  <Text style={styles.label}>Taux horaire :</Text>
                  <Text style={styles.value}>{planning.taux_horaire}</Text>
               </View>
               <View style={styles.line}>
                  <Text style={styles.label}>Matière dispensé :</Text>
                  <Text style={styles.value}>{planning.matiere}</Text>
               </View>
               <View style={styles.line}>
                  <Text style={styles.label}>Date et heure de debut :</Text>
                  <Text style={styles.value}>
                     {moment(planning.start_date)
                        .format('YYYY-MM-DD')} à {moment(planning.start_date)
                     .format('HH:mm')}
                  </Text>
               </View>
            </View>
         )}
         <View style={{height: 0, width: 0}}>
            <ModalLoader ref={loader_ref}/>
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
