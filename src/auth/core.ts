import {NextFunction, Request, Response} from "express";
import {getAuth} from "firebase-admin/auth";

/**
 * Verifies authentication that came with http API request
 * @param req
 * @param res
 * @param next
 */
export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  const idToken = req.header("X-Firebase-IdToken")

  // Verifies that ID token is not undefined
  if (idToken == null) {
    res.status(400).send('Bad request! Your request is missing header "X-Firebase-IdToken"')
    return
  }

  try {
    // Verifies ID token to ensure correct access right to API
    const result = await getAuth().verifyIdToken(idToken)

    // Gets user to check custom claims
    const user = await getAuth().getUser(result.uid)

    // Verifies that user has correct access rights
    if (user.email != "admin.suppis@nummenpojat.fi" && !user.customClaims?.admin) {
      res.status(403).send('Forbidden! Header "X-Firebase-IdToken" does not contain a valid IdToken')
      return;
    }
  } catch (error) {
    res.status(401).send(`Unauthorized! ${error}`)
    return
  }
  next()
}