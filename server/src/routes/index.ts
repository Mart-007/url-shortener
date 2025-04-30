import { Router } from "express";
import shortUrl from "./shorten-url";

export const api: Router = Router();

api.use("/", shortUrl);
