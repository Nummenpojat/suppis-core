import {NextFunction, Request, Response} from "express";
import {appCheck as appCheckFirebase} from "firebase-admin";

export const appCheck = async (req: Request, res: Response, next: NextFunction) => {
  const appCheckToken = req.header('X-Firebase-AppCheck');

  if (!appCheckToken) {
    res.status(401).send('Unauthorized')
    return
  }

  try {
    const appCheckClaims = await appCheckFirebase().verifyToken(appCheckToken);

    // If verifyToken() succeeds, continue with the next middleware function in the stack.
    return next();

  } catch (err) {
    res.status(403).send('Unauthorized')
    return
  }
}