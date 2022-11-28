import {NextFunction, Request, Response} from "express";
import {DecodedIdToken, getAuth} from "firebase-admin/auth";

/**
 * Verifies authentication that came with API request
 * @param req
 * @param res
 * @param next
 */
export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  verifyIdToken(req.headers.idtoken)
    .then((result) => {
      console.log("ID token passed all tests")
      next()
    })
    .catch((reason) => {
      res.status(403).send(`Unauthorized! ${reason}`)
    })
}

const verifyIdToken = async (idToken: string | string[] | undefined): Promise<boolean> => {

  // Verifies that ID token is a string and not something else
  if (typeof idToken == "string") {

    let result: DecodedIdToken

    // Verifies ID token to ensure correct access right to API
    try {
      result = await getAuth().verifyIdToken(idToken)
    } catch (error) {
      throw "idToken was invalid"
    }
    if (result.email_verified && result.email == "aaro.heroja@nummenpojat.fi") {
      return true
    }
    throw "Your email is not on list of permitted emails"
  }
  throw "idToken wasn't type string"
}