import React from "react"
import {SafeAreaView, StatusBar, Platform} from 'react-native'
import COLORS from '../themes/colors'

const AppStatusBar = ({children, hidden = false, bgColor = COLORS.PRIMARY, barStyle = 'light-content'}) => {
   return (
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.WHITE}}>
         <StatusBar
            animated
            hidden={hidden}
            backgroundColor={bgColor}
            barStyle={Platform.OS === 'ios' ? 'default' : barStyle}
         />
         {children}
      </SafeAreaView>
   )
}

export default AppStatusBar
