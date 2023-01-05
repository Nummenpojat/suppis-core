import {getAuth} from "firebase-admin/auth";

export const removeAdminFromUser = async (email: string) => {
  try {

    // Gets user uid with email to have correct params for setting custom claims
    const user = await getAuth().getUserByEmail(email)

    if (!user.customClaims?.admin) {
      throw `${email} is not admin`
    }

    // Set custom claims to user
    await getAuth().setCustomUserClaims(user.uid, {
      admin: false
    })

  } catch (error: any) {
    if (error.message != undefined) {
      throw error.message
    }
    throw error
  }
}