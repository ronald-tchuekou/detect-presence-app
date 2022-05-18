import React from 'react'
import { Text, View } from 'react-native'
import STYLES from '../../themes/style'
import SIZES from '../../themes/sizes'
import { AppStatusBar } from '../../components'

const HomeScreen = ({}) => {
   return (
      <AppStatusBar>
         <View style={STYLES.row_center}>
            <Text style={{ fontSize: SIZES.H1 }}>Teacher home page !</Text>
         </View>
      </AppStatusBar>
   )
}

export { HomeScreen }
