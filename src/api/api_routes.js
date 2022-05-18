/*
 * Copyright (c) 2022.
 * @author Ronald Tchuekou
 * @email ronaldtchuekou@gmail.com
 */

const API_ROUTES = {
   SOCKET_URI: 'https://api.bigoodee.com',
   SIGNUP: '/auth/signup',
   SIGNING: '/auth/signin',
   SIGN_IN_WITH_FACEBOOK: '/auth/create-facebook-user',
   VERIFY_USER_EMAIL: '/user',
   RESET_USER_PASSWORD: '/user/update-password',
   USER_PROFILE: '/auth/profile',
   UPDATE_PROFILE: '/auth/update',
   UPDATE_PASS: '/auth/updatepass',
   UPDATE_NOTIFY_TOKEN: '/auth/update/notify_token',
   UPDATE_USER_IMG: '/auth/updateimage',
   GET_COIFFEUSE_PRESTATIONS: '/coiffeuse/prestation',
   GET_COIFFEUSE_GALERIE: '/coiffeuse/galerie',
   GET_PRESTATIONS: '/prestation',
   GET_PLANNING: '/planning',
   GET_DISPO: '/dispo',
   GET_SEARCH: '/search',
   GET_PLAGE: '/plage',
   GET_VILLE: '/ville',
   GET_FILES: '/files',
   GET_LIKE: '/like',
   GET_AVIS: '/avis',
   GET_CHAT: '/chat',
   PAYMENT: '/payment',
   COUPON: '/coupon',
   GET_RESERVATION: '/reservation',
   GET_NOTIFICATION: '/notification',
   GET_CONTACT_MESSAGE: '/contact-message',
   SET_USER_TOKEN: '/auth/user-token'
}

export default API_ROUTES
