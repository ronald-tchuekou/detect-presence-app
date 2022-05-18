import { StyleSheet } from 'react-native'
import COLORS from './colors'
import SIZES from './sizes'

const STYLES = StyleSheet.create({
   container: {
      backgroundColor: COLORS.WHITE,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   title: {
      fontSize: SIZES.H5,
      fontWeight: 'bold',
      color: COLORS.DARK_500
   },
   subtitle: {
      fontSize: SIZES.H6,
      fontWeight: '400',
      paddingVertical: SIZES.DEFAULT_PADDING
   },
   default_text: {
      fontSize: SIZES.H7,
      fontWeight: "300",
      color: COLORS.DARK_300,
   },
   text: {
      fontSize: SIZES.H7,
      fontWeight: "300",
      color: COLORS.DARK_300,
      marginBottom: SIZES.DEFAULT_MARGIN
   },
   text_m: {
      fontSize: SIZES.H5,
      fontWeight: '600',
      color: COLORS.DARK_500,
   },
   text_center: {
      textAlign: 'center',
   },
   default_padding: {
      padding: SIZES.DEFAULT_PADDING,
   },
   pagination: {
      display: 'flex',
      flexDirection: 'row',
      paddingVertical: SIZES.MEDIUM_PADDING,
   },
   button_primary: {
      borderWidth: 1,
      borderColor: COLORS.PRIMARY,
      backgroundColor: COLORS.PRIMARY,
      paddingVertical: SIZES.SMALL_PADDING,
      paddingHorizontal: SIZES.DEFAULT_PADDING,
      borderRadius: 10,
   },
   button_primary_outline: {
      borderWidth: 1,
      borderColor: COLORS.PRIMARY,
      backgroundColor: COLORS.WHITE,
      paddingVertical: SIZES.SMALL_PADDING,
      paddingHorizontal: SIZES.DEFAULT_PADDING,
      borderRadius: 10,
   },
   icon: {
      width: 30,
      height: 30
   },
   row_center: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
   },
   row_around: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
   },
   row_between: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
   },
   row_end: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center'
   },
   row_start: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center'
   },
   text_sm: {
      fontSize: 12,
      color: COLORS.DARK_300,
   }
})

export default STYLES
