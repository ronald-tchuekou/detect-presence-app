import React from 'react'
import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AppStatusBar, Space } from '../../components'
import COLORS from '../../themes/colors'
import STYLES from '../../themes/style'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import SIZES from '../../themes/sizes'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

const FinanceStateScreen = ({ navigation }) => {

   const items = [
      { label: 'Pour ce mois', amount: '120,000', state: 'En cours de calcul' },
      { label: 'Le mois passé', amount: '120,000', state: 'Payé' },
      { label: 'Jan. 2022', amount: '120,000', state: 'Payé' },
      { label: 'Dec. 2021', amount: '120,000', state: 'Payé' },
      { label: 'Non. 2021', amount: '120,000', state: 'Non payé' },
      { label: 'Jan. 2022', amount: '120,000', state: 'Payé' },
      { label: 'Dec. 2021', amount: '120,000', state: 'Payé' },
      { label: 'Non. 2021', amount: '120,000', state: 'Non payé' },
      { label: 'Jan. 2022', amount: '120,000', state: 'Payé' },
      { label: 'Dec. 2021', amount: '120,000', state: 'Payé' },
      { label: 'Non. 2021', amount: '120,000', state: 'Non payé' },
      { label: 'Jan. 2022', amount: '120,000', state: 'Payé' },
      { label: 'Dec. 2021', amount: '120,000', state: 'Payé' },
      { label: 'Non. 2021', amount: '120,000', state: 'Non payé' },
      { label: 'Jan. 2022', amount: '120,000', state: 'Payé' },
      { label: 'Dec. 2021', amount: '120,000', state: 'Payé' },
      { label: 'Non. 2021', amount: '120,000', state: 'Non payé' },
      { label: 'Jan. 2022', amount: '120,000', state: 'Payé' },
      { label: 'Dec. 2021', amount: '120,000', state: 'Payé' },
      { label: 'Non. 2021', amount: '120,000', state: 'Non payé' },
      { label: 'Jan. 2022', amount: '120,000', state: 'Payé' },
      { label: 'Dec. 2021', amount: '120,000', state: 'Payé' },
      { label: 'Non. 2021', amount: '120,000', state: 'Non payé' }
   ]

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
            <Text style={STYLES.title} numberOfLines={1}>Etat des finances</Text>
         </View>
         <TouchableOpacity style={{
            borderWidth: 1,
            borderColor: COLORS.DARK_200,
            paddingHorizontal: SIZES.SMALL_PADDING,
            paddingVertical: 5,
            borderRadius: SIZES.SMALL_PADDING,
            backgroundColor: '#eee',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 50
         }}>
            <Text style={{
               fontSize: SIZES.H6,
               color: COLORS.DARK_500
            }}>Cette année</Text>
            <FontAwesome name={'caret-down'} size={24} color={COLORS.DARK_200} />
         </TouchableOpacity>
         <Space />
         <Space />
         <ScrollView style={{ flex: 1 }}>
            {items.map((item, index) => <FinanceItem key={index} item={item} />)}
         </ScrollView>
      </AppStatusBar>
   )
}

const FinanceItem = ({ item }) => {

   const [show, setShow] = React.useState(false)

   const height = useSharedValue(0)

   const heightStyle = useAnimatedStyle(() => {
      return {
         height: withTiming(height.value, { duration: 300 })
      }
   })

   React.useEffect(() => {
      height.value = show ? 300 : 0
   }, [show])

   const styles = StyleSheet.create({
      line: {
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
         paddingVertical: 4
      },
      container: {
         borderWidth: 1,
         borderColor: COLORS.DARK_200,
         paddingHorizontal: SIZES.SMALL_PADDING,
         paddingVertical: 7,
         marginBottom: SIZES.SMALL_MARGIN,
         marginHorizontal: SIZES.SMALL_MARGIN,
         borderRadius: 10
      },
      label: {
         fontSize: SIZES.H7,
         color: COLORS.DARK_500
      },
      prise: {
         fontSize: SIZES.H7,
         color: COLORS.SECOND,
         fontWeight: 'bold'
      },
      badge: {
         backgroundColor: item.state === 'En cours de calcul' ?
            COLORS.SECOND_15 : item.state === 'Payé' ?
               COLORS.SUCCESS_15 : COLORS.ERROR_15,
         color: item.state === 'En cours de calcul' ?
            COLORS.SECOND : item.state === 'Payé' ?
               COLORS.SUCCESS : COLORS.ERROR,
         borderWidth: 1,
         fontSize: 10,
         width: 100,
         textAlign: 'center',
         fontWeight: 'bold',
         borderColor: item.state === 'En cours de calcul' ?
            COLORS.SECOND_50 : item.state === 'Payé' ?
               COLORS.SUCCESS_50 : COLORS.ERROR_50,
         paddingHorizontal: 8,
         paddingVertical: 5,
         borderRadius: 20
      },
      subContent: {
         height: 0,
         borderTopWidth: show ? 1 : 0,
         borderTopColor: COLORS.DARK_200,
         marginTop: show ? 5 : 0,
         flex: 1,
         overflow: 'hidden'
      }
   })

   return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => setShow(s => !s)}>
         <View style={styles.container}>
            <View style={styles.line}>
               <Text style={styles.label}>{item.label}</Text>
               <Text style={styles.prise}>{item.amount + ' XFA'}</Text>
               <Text style={styles.badge}>{item.state}</Text>
            </View>
            <Animated.View style={[styles.subContent, heightStyle]}>
               {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, index) => (
                  <View key={'index' + index} style={{
                     flexDirection: 'row',
                     justifyContent: 'space-between',
                     alignItems: 'center',
                     paddingVertical: 4
                  }}>
                     <Text style={{
                        fontSize: 12,
                        color: COLORS.DARK_500
                     }}>10 Jan. 2022</Text>
                     <Text style={{
                        fontSize: 12,
                        color: COLORS.PRIMARY
                     }}>2h de SVT en Tle C1</Text>
                     <Text style={{
                        fontSize: 12,
                        color: COLORS.SUCCESS
                     }}>6500 XFA</Text>
                  </View>
               ))}
            </Animated.View>
         </View>
      </TouchableOpacity>
   )
}

FinanceStateScreen.navigationOptions = () => ({
   headerShown: false
})

export default FinanceStateScreen
