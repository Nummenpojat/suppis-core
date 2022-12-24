import {NextFunction, Request, Response} from "express";
import {appCheck as appCheckFirebase} from "firebase-admin";

export const appCheck = async (req: Request, res: Response, next: NextFunction) => {
  const appCheckToken = req.header('X-Firebase-AppCheck');

  if (!appCheckToken) {
    res.status(400).send('Bad request! Your request is missing header "X-Firebase-AppCheck"')
    return
  }

  try {
    await appCheckFirebase().verifyToken(appCheckToken);

    // If verifyToken() succeeds, continue with the next middleware function in the stack.
    return next();

  } catch (error: any) {
    res.status(403).send(`Forbidden! ${error.message}`)
    return
  }
}