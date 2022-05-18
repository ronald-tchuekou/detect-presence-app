import React from "react"
import {View, Text} from "react-native"
import STYLES from "../../themes/style";
import SIZES from "../../themes/sizes";

const HomeScreen = ({}) => {
   return (
      <View style={STYLES.row_center}>
         <Text style={{fontStyle: SIZES.H1}}>Teacher home page !</Text>
      </View>
   )
}

export {HomeScreen}
