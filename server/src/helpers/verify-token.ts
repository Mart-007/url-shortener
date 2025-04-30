import CONFIG from "../config/config";
import * as MESSAGE from "../enums/Messages";

import { NextFunction, Request, Response } from "express";
import { logger } from "@app/enums/Logger";

const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers?.authorization;

  const clientToken = CONFIG.AUTHORIZATION_KEY;

  if (token !== clientToken) {
    logger.error(
      MESSAGE.INVALID_AUTH_TOKEN,
      MESSAGE.MISSING_AUTHORIZATION_TOKEN
    );
    res
      .status(401)
      .send({ success: false, message: MESSAGE.MISSING_AUTHORIZATION_TOKEN });
    return;
  }

  next();
};

export default verifyToken;
