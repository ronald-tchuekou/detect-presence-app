import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import SIZES from '../../themes/sizes'
import { AppStatusBar, HomeHeader, Space } from '../../components'
import COLORS from '../../themes/colors'
import { financial_state, presence_state } from '../../themes/images'
import { ButtonCard } from '../teacher/HomeScreen'

const HomeScreen = ({ navigation }) => {
   function goTo(path) {
      return navigation.navigate(path)
   }

   return (
      <AppStatusBar bgColor={COLORS.PRIMARY} barStyle={'light-content'}>
         <ScrollView style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
            <HomeHeader />
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
                     onPress={() => goTo('FinanceScreen')}
                     label={'Etat des finances'}
                     image={financial_state} />
                  <ButtonCard
                     onPress={() => goTo('PresenceScreen')}
                     label={'Etat de présence'}
                     image={presence_state} />
               </View>
            </View>
            <Space />
            <Space />
            <Space />
            <Space />
            <Space />
         </ScrollView>
      </AppStatusBar>
   )
}

const styles = StyleSheet.create({
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
