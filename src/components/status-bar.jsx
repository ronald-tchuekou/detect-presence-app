import React from 'react'
import { SafeAreaView, StatusBar, Platform } from 'react-native'
import COLORS from '../themes/colors'

const AppStatusBar = ({ children, hidden = false }) => {
   return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
         <StatusBar hidden={hidden} animated backgroundColor={COLORS.PRIMARY} barStyle={Platform.OS === 'ios' ? 'default' : 'light-content'} />
         {children}
      </SafeAreaView>
   )
}

export default AppStatusBar
