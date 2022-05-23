import React from 'react'
import { TextInput, TouchableOpacity, View } from 'react-native'
import SIZES from '../themes/sizes'
import COLORS from '../themes/colors'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

export const AppTextInput = ({
                                label,
                                value,
                                onChange,
                                type = 'default',
                                autoFocus = false,
                                capitalize = false,
                                secure = false,
                                iconRight,
                                iconLeft,
                                lines = 1,
                                multiline = false,
                                readOnly = true,
                                onPress,
                                maxLength = 300
                             }) => {
   const input_ref = React.useRef(null)
   const capitalization = capitalize === true ? 'words' : capitalize === false ? 'none' : capitalize

   // States
   const [focused, setFocused] = React.useState(false)
   const start_values = {
      top: 15,
      left: iconLeft ? 40 : 10,
      font_size: SIZES.H6,
      z_index: undefined
   }
   const end_values = {
      top: -10,
      left: 10,
      font_size: 13,
      z_index: 80
   }

   const styles = {
      input_container: {
         position: 'relative',
         marginVertical: SIZES.SMALL_MARGIN
      },
      input: {
         borderWidth: 1,
         height: 47,
         borderRadius: 10,
         borderColor: focused ? COLORS.PRIMARY : COLORS.DARK_300,
         paddingRight: iconRight ? 50 : SIZES.DEFAULT_PADDING,
         paddingLeft: iconLeft ? 50 : SIZES.DEFAULT_PADDING,
         fontSize: SIZES.H6,
         color: COLORS.DARK_500
      },
      label_container: {
         position: 'absolute',
         backgroundColor: COLORS.WHITE,
         paddingHorizontal: 5,
         zIndex: 1000,
         top: 17,
         left: 12
      },
      label: {
         fontSize: SIZES.H6,
         color: focused ? COLORS.PRIMARY : COLORS.DARK_300,
         backgroundColor: COLORS.WHITE,
         paddingHorizontal: 5
      },
      left_icon: {
         position: 'absolute',
         top: 0,
         left: 0,
         height: '100%',
         width: 45,
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center'
      },
      right_icon: {
         position: 'absolute',
         top: 0,
         right: 0,
         height: '100%',
         width: 45,
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
         zIndex: 1000
      }
   }

   const animationTop = useSharedValue(start_values.top)
   const animationLeft = useSharedValue(start_values.left)
   const animationFontSize = useSharedValue(start_values.font_size)

   const animateStyleTop = useAnimatedStyle(() => {
      return {
         top: withTiming(animationTop.value, { duration: 200 }),
         left: withTiming(animationLeft.value, { duration: 200 })
      }
   })

   const animateStyleText = useAnimatedStyle(() => {
      return {
         fontSize: withTiming(animationFontSize.value, { duration: 200 })
      }
   })

   React.useEffect(() => {
      if (value && value !== '') {
         animationTop.value = end_values.top
         animationLeft.value = end_values.left
         animationFontSize.value = end_values.font_size
      }
   }, [animationTop, animationFontSize, value])

   function onFocus() {
      setFocused(true)
      animationTop.value = end_values.top
      animationLeft.value = end_values.left
      animationFontSize.value = end_values.font_size
   }

   function onBlur() {
      if (!value || value === '') {
         animationTop.value = start_values.top
         animationLeft.value = start_values.left
         animationFontSize.value = start_values.font_size
      }
      setFocused(false)
   }

   return (
      <View style={styles.input_container}>
         <Animated.View style={[styles.label_container, animateStyleTop]}>
            <TouchableOpacity
               onPress={() => input_ref.current.focus()}
               activeOpacity={1}>
               <Animated.Text style={[styles.label, animateStyleText]}>{label}</Animated.Text>
            </TouchableOpacity>
         </Animated.View>
         {iconLeft ? (
            <View style={styles.left_icon}>{iconLeft()}</View>
         ) : null}
         {iconRight ? (
            <View style={styles.right_icon}>{iconRight()}</View>
         ) : null}
         <TextInput
            onFocus={onFocus}
            onBlur={onBlur}
            onPressIn={onPress}
            ref={input_ref}
            numberOfLines={lines}
            multiline={multiline}
            style={styles.input}
            value={value}
            maxLength={maxLength}
            editable={readOnly}
            autoFocus={autoFocus}
            autoCapitalize={capitalization}
            secureTextEntry={secure}
            onChangeText={onChange}
            keyboardType={type}
         />
      </View>
   )
}
