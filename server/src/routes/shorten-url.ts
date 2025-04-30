import { Router } from "express";
import Controller from "@app/controller/shorten-url";
import verifyToken from "@app/helpers/verify-token";

const shortUrl: Router = Router();
const controller = new Controller();

/* MIDDLEWARE FOR AUTHENTICATION */
// shortUrl.use(verifyToken);

shortUrl.post("/create", controller.createShortUrl);
shortUrl.get("/:shortCode", controller.redirectToOriginalUrl);

export default shortUrl;
