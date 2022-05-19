import React from 'react'
import { Text, View } from 'react-native'
import STYLES from '../../themes/style'
import SIZES from '../../themes/sizes'
import { AppStatusBar } from '../../components'
import COLORS from '../../themes/colors'

const HomeScreen = ({}) => {
   return (
      <AppStatusBar bgColor={COLORS.PRIMARY} barStyle={'light-content'}>
         <View style={STYLES.row_center}>
            <Text style={{ fontSize: SIZES.H1 }}>Personnels home page !</Text>
         </View>
      </AppStatusBar>
   )
}

export default HomeScreen
