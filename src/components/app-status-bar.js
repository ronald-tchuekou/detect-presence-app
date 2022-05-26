import React from 'react'
import { Platform, SafeAreaView, StatusBar, View } from 'react-native'
import COLORS from '../themes/colors'

const AppStatusBar = ({ children, hidden = false, bgColor = COLORS.PRIMARY, barStyle = 'light-content' }) => {
   if (Platform.OS === 'ios')
      return (
         <View style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
            <StatusBar
               animated
               hidden={hidden}
               backgroundColor={bgColor}
               barStyle={Platform.OS === 'ios' ? 'dark-content' : barStyle}
            />
            {children}
         </View>
      )
   return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.WHITE }}>
         <StatusBar
            animated
            hidden={hidden}
            backgroundColor={bgColor}
            barStyle={Platform.OS === 'ios' ? 'dark-content' : barStyle}
         />
         {children}
      </SafeAreaView>
   )
}

export default AppStatusBar
