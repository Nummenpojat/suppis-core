import {Request} from "express";
import {getAuth} from "firebase-admin/auth";

/**
 * Sets user to admin
 * @param req
 */
export const setUserToAdmin = async (req: Request) => {

  if (req.body.email != "" && req.body.email) {

    // Gets user uid with email to have correct params for setting custom claims
    await getAuth().getUserByEmail(req.body.email)
      .then(async (user) => {

        // Set custom claims to user
        await getAuth().setCustomUserClaims(user.uid, {
          admin: true
        }).catch((reason) => {
          throw {
            status: 500,
            reason: reason
          }
        })
      })
      .catch((reason) => {
        throw {
          status: 400,
          reason: reason
        }
      })
  } else {
    throw {
      status: 400,
      reason: "Server didn't receive valid email"
    }
  }
}