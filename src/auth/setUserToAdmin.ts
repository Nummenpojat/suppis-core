import {Request} from "express";
import {getAuth} from "firebase-admin/auth";

/**
 * Sets user to admin
 * @param email
 */
export const setUserToAdmin = async (email: string) => {
  try {
    if (email == "" && email == undefined) {
      throw "Server didn't receive valid email"
    }

    // Gets user uid with email to have correct params for setting custom claims
    const user = await getAuth().getUserByEmail(email)

    // Checks that user is not yet admin
    if (user.customClaims?.admin) {
      throw `${email} is already admin`
    }

    // Set custom claims to user
    await getAuth().setCustomUserClaims(user.uid, {
      admin: true
    })

  } catch (error: any) {
    if (error.message != undefined) {
      throw error.message
    }
    throw error
  }
}