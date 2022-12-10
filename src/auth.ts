import {NextFunction, Request, Response} from "express";
import {DecodedIdToken, getAuth, UserRecord} from "firebase-admin/auth";

/**
 * Verifies authentication that came with http API request
 * @param req
 * @param res
 * @param next
 */
export const httpCheckAuth = (req: Request, res: Response, next: NextFunction) => {
  verifyIdToken(req.headers.idtoken)
    .then(() => {
      next()
    })
    .catch((reason) => {
      res.status(403).send(`Unauthorized! ${reason}`)
    })
}

export const verifyIdToken = async (idToken: string | string[] | undefined): Promise<void> => {

  // Verifies that ID token is a string and not something else
  if (typeof idToken == "string") {

    let result: DecodedIdToken

    // Verifies ID token to ensure correct access right to API
    try {
      result = await getAuth().verifyIdToken(idToken)
    } catch (error) {
      throw "idToken was invalid"
    }

    // Gets user to check custom claims
    let user: UserRecord

    try {
      user = await getAuth().getUser(result.uid)
    } catch (error) {
      throw error
    }

    // Verifies that user has correct access rights
    if (result.email == "admin.suppis@nummenpojat.fi" || user.customClaims?.admin) {
      return;
    }
    throw "Your email is not on list of permitted emails"
  }
  throw "idToken wasn't type string"
}

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