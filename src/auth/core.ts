import {NextFunction, Request, Response} from "express";
import {DecodedIdToken, getAuth, UserRecord} from "firebase-admin/auth";

/**
 * Verifies authentication that came with http API request
 * @param req
 * @param res
 * @param next
 */
export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await verifyIdToken(req.headers.authorization)
    next()
  } catch (error) {
    res.status(403).send(`Unauthorized! ${error}`)
  }
}
export const verifyIdToken = async (idToken: string | undefined): Promise<void> => {

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