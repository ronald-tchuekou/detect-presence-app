import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications'
import * as ImagePicker from 'expo-image-picker'
import { Alert, Platform } from 'react-native'
import { ENV } from './api/env'
import COLORS from './themes/colors'
import API_ROUTES from './api/api_routes'

export const storeLocaleValue = async (key, value, callback) => {
   try {
      await AsyncStorage.setItem(key, JSON.stringify(value))
      if (callback)
         callback(undefined, value)
   } catch (error) {
      if (callback)
         callback(error, undefined)
   }
}

export const getLocaleValue = async (key, callback) => {
   try {
      const value = await AsyncStorage.getItem(key)
      if (callback)
         callback(undefined, value ? JSON.parse(value) : null)
   } catch (error) {
      if (callback)
         callback(error, undefined)
   }
}

export const registerForPushNotificationsAsync = async () => {
   const { status: existingStatus } = await Notifications.getPermissionsAsync()
   let finalStatus = existingStatus

   if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
   }

   if (finalStatus !== 'granted') {
      alert('Vous ne serez pas notifié sur les activités émises sur cette application.')
      return
   }

   const token = (await Notifications.getExpoPushTokenAsync()).data

   if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync(ENV.notification_channel_id, {
         name: ENV.notification_channel_id,
         importance: Notifications.AndroidImportance.HIGH,
         description: ENV.notification_channel_id,
         lightColor: COLORS.PRIMARY,
         lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
         sound: 'default',
         showBadge: true,
         audioAttributes: {
            usage: Notifications.AndroidAudioUsage.NOTIFICATION,
            contentType: Notifications.AndroidAudioContentType.MUSIC,
            flags: {
               enforceAudibility: true,
               requestHardwareAudioVideoSynchronization: true
            }
         },
         vibrationPattern: [0, 250, 250, 250],
         enableLights: true,
         enableVibrate: true
      })
   }

   return token
}

export const notifyUser = async (title, subtitle, message, data = {}) => {
   return await Notifications.scheduleNotificationAsync({
      content: {
         title: title,
         subtitle: subtitle,
         body: message,
         data: data,
         priority: 'HIGH',
         color: COLORS.PRIMARY
      },
      trigger: {
         second: 2,
         channelId: ENV.notification_channel_id
      }
   })
}

export const uploadImage = (formData, userToken, bucket) => {
   return new Promise(async (resolve, reject) => {
      try {
         const base_url = ENV.base.url + API_ROUTES.GET_FIlES + '/' + bucket
         const fileResponse = await fetch(base_url, {
            method: 'post',
            body: formData,
            headers: {
               'x-access-token': userToken,
               'Content-Type': 'multipart/form-data'
            }
         })
         const fileJson = await fileResponse.json()
         resolve(fileJson)
      } catch (e) {
         console.log(e)
         reject({ message: 'Une erreur est survenu lors de la transmission du fichier.' })
      }
   })
}

export const pickImage = async (callback) => {
   try {
      const pickImagePermission = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (pickImagePermission.granted) {
         let file_picked = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [5, 5],
            quality: 1,
            exif: true
         })
         if (!file_picked.cancelled && callback)
            callback(undefined, file_picked)
      } else {
         Alert.alert(
            'message d\'avertissement',
            'Pour pouvoir télécharger une image de votre téléphone, vous devez donner la permission à Detect Presence de pouvoir accéder à votre galerie.'
         )
         if (callback)
            callback(undefined, null)
      }
   } catch (e) {
      if (callback)
         callback(e, undefined)
   }
}
