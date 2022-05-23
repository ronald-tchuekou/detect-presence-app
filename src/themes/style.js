import { StyleSheet } from 'react-native'
import COLORS from './colors'
import SIZES from './sizes'

const STYLES = StyleSheet.create({
   container: {
      backgroundColor: COLORS.WHITE,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   },
   page_title: {
      width: '100%',
      textAlign: 'center',
      fontSize: SIZES.H3,
      fontWeight: 'bold',
      color: COLORS.DARK_500
   },
   title: {
      fontSize: SIZES.H5,
      fontWeight: 'bold',
      color: COLORS.DARK_500,
      paddingHorizontal: SIZES.SMALL_PADDING,
      flex: 1
   },
   subtitle: {
      fontSize: SIZES.H6,
      fontWeight: '400',
      paddingVertical: SIZES.DEFAULT_PADDING
   },
   default_text: {
      fontSize: SIZES.H7,
      fontWeight: '300',
      color: COLORS.DARK_300
   },
   text: {
      fontSize: SIZES.H7,
      fontWeight: '300',
      color: COLORS.DARK_300,
      marginBottom: SIZES.DEFAULT_MARGIN
   },
   text_m: {
      fontSize: SIZES.H5,
      fontWeight: '600',
      color: COLORS.DARK_500
   },
   text_center: {
      textAlign: 'center'
   },
   default_padding: {
      padding: SIZES.DEFAULT_PADDING
   },
   pagination: {
      display: 'flex',
      flexDirection: 'row',
      paddingVertical: SIZES.MEDIUM_PADDING
   },
   button_primary: {
      borderWidth: 1,
      borderColor: COLORS.PRIMARY,
      backgroundColor: COLORS.PRIMARY,
      paddingVertical: SIZES.SMALL_PADDING,
      paddingHorizontal: SIZES.DEFAULT_PADDING,
      borderRadius: 10,
      color: COLORS.WHITE,
      overflow: 'hidden'
   },
   button_text_primary: {
      color: COLORS.WHITE,
      fontSize: SIZES.H7,
      textAlign: 'center'
   },
   button_primary_outline: {
      borderWidth: 1,
      borderColor: COLORS.PRIMARY,
      backgroundColor: COLORS.WHITE,
      paddingVertical: SIZES.SMALL_PADDING,
      paddingHorizontal: SIZES.DEFAULT_PADDING,
      borderRadius: 10
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
      alignItems: 'center',
      width: '100%'
   },
   row_end: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: '100%'
   },
   row_start: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%'
   },
   text_sm: {
      fontSize: 12,
      color: COLORS.DARK_300
   },
   header_container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: SIZES.DEFAULT_PADDING,
      paddingVertical: SIZES.SMALL_PADDING
   },
   close_button: {
      overflow: 'hidden',
      borderRadius: 200,
      flex: 0
   },
   button_icon: {
      padding: SIZES.SMALL_PADDING,
      borderRadius: 200
   }
})

export default STYLES
