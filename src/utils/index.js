import AsyncStorage from '@react-native-async-storage/async-storage'

export const storeLocalValue = async (key, value, callback) => {
   try {
      await AsyncStorage.setItem(key, JSON.stringify(value))
      if (callback)
         callback(undefined, value)
   } catch (error) {
      if (callback)
         callback(error, undefined)
   }
}

export const getLocalValue = async (key, callback) => {
   try {
      const value = await AsyncStorage.getItem(key)
      if (callback)
         callback(undefined, value ? JSON.parse(value) : null)
   } catch (error) {
      if (callback)
         callback(error, undefined)
   }
}

