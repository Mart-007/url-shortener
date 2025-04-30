import { IShortenURLParams } from "@app/interfaces/shorten-url";
import ShortenURLService from "@app/services/shorten-url";
import { Request, Response } from "express";
import moment from "moment-timezone";
import * as MESSAGE from "@app/enums/Messages";

class shortenURLController {
  private shortenUrlService: ShortenURLService;

  constructor() {
    this.shortenUrlService = new ShortenURLService();
  }

  createShortUrl = async (req: Request, res: Response): Promise<void> => {
    try {
      const createShortUrlData: IShortenURLParams = {
        originalUrl: req.body.originalUrl,
        customSlug: req.body.customSlug,
        expiresAt: req.body.expiresAt
          ? moment(req.body.expiresAt).toDate()
          : undefined,
        utmSource: req.body.utmSource,
        utmMedium: req.body.utmMedium,
        utmCampaign: req.body.utmCampaign,
        utmTerm: req.body.utmTerm,
        utmContent: req.body.utmContent,
      };

      const url = await this.shortenUrlService.createShortUrl(
        createShortUrlData
      );

      res.status(201).send({
        success: true,
        data: url,
        shortUrl: `${req.protocol}://${req.get("host")}/${url?.shortCode}`,
      });
    } catch (error: any) {
      res.status(400).send({
        success: false,
        message: error?.message || MESSAGE.FAILED_TO_CREATE_SHORT_URL,
      });
    }
  };

  redirectToOriginalUrl = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const shortCode = req.params.shortCode as string;
      const url = await this.shortenUrlService.getOriginalUrl(shortCode);

      if (!url || !url.originalUrl) {
        res.status(404).send({
          success: false,
          message: MESSAGE.URL_NOT_FOUND_OR_EXPIRED,
        });
        return;
      }

      res.redirect(url.originalUrl);
    } catch (error) {
      res
        .status(500)
        .send({ success: false, message: MESSAGE.INTERNAL_SERVER_ERROR });
    }
  };
}

export default shortenURLController;
