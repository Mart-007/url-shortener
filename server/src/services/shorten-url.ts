import { generateShortCode, isValidURL } from "@app/helpers/pure-functions";
import {
  IShortenURLData,
  IShortenURLParams,
} from "@app/interfaces/shorten-url";
import ShortenURLRepository from "@app/repository/shorten-url";
import * as MESSAGE from "@app/enums/Messages";
import { UTM_TYPE } from "@app/enums/Constant";
import { logger } from "@app/enums/Logger";
import { connectRedis, redisClient } from "@app/db/redis";

class ShortenURLService {
  private readonly CACHE_EXPIRATION = 60 * 60 * 24; // 24hrs
  private shortenUrlRepository: ShortenURLRepository;

  constructor() {
    this.shortenUrlRepository = new ShortenURLRepository();
    this.connectToRedis();
  }

  private async connectToRedis() {
    await connectRedis();
  }
  async createShortUrl(
    shortenUrlData: IShortenURLParams
  ): Promise<IShortenURLData | undefined> {
    try {
      const { originalUrl } = shortenUrlData;

      if (!isValidURL(originalUrl))
        throw ReferenceError(MESSAGE.INVALID_URL_FORMAT);

      let finalUrl = originalUrl;

      const shortCode = shortenUrlData.customSlug || generateShortCode();
      const utmString = this.getUtm(shortenUrlData);

      if (utmString) {
        finalUrl += `${originalUrl.includes("?" ? "&" : "?")}${utmString}`;
      }

      if (shortenUrlData.customSlug) {
        const isSlugExist = await this.shortenUrlRepository.checkShortCodeExist(
          shortCode
        );

        if (isSlugExist)
          throw ReferenceError(MESSAGE.CUSTOM_SLUG_ALREADY_IN_USE);
      }

      const url = await this.shortenUrlRepository.create({
        originalUrl: finalUrl,
        shortCode,
        expiresAt: shortenUrlData.expiresAt || null,
        utmSource: shortenUrlData.utmSource,
        utmMedium: shortenUrlData.utmMedium,
        utmCampaign: shortenUrlData.utmCampaign,
        utmTerm: shortenUrlData.utmTerm,
        utmContent: shortenUrlData.utmContent,
      });

      await this.cacheUrl(shortCode, url);

      return url;
    } catch (err) {
      logger.error(MESSAGE.ERROR_CREATING_SHORT_URL, err);
    }
  }

  private getUtm(shortenUrlData: IShortenURLParams): string {
    const utmParams = new URLSearchParams();

    if (shortenUrlData.utmSource)
      utmParams.append(UTM_TYPE.utm_source, shortenUrlData.utmSource);
    if (shortenUrlData.utmMedium)
      utmParams.append(UTM_TYPE.utm_medium, shortenUrlData.utmMedium);
    if (shortenUrlData.utmCampaign)
      utmParams.append(UTM_TYPE.utm_campaign, shortenUrlData.utmCampaign);
    if (shortenUrlData.utmTerm)
      utmParams.append(UTM_TYPE.utm_term, shortenUrlData.utmTerm);
    if (shortenUrlData.utmContent)
      utmParams.append(UTM_TYPE.utm_content, shortenUrlData.utmContent);

    return utmParams.toString();
  }

  private async cacheUrl(
    shortCode: string,
    url: IShortenURLData
  ): Promise<void> {
    await redisClient.set(`url:${shortCode}`, JSON.stringify(url), {
      EX: this.CACHE_EXPIRATION,
    });
  }

  private async getCachedUrl(
    shortCode: string
  ): Promise<IShortenURLData | null> {
    const cahedData = await redisClient.get(`url:${shortCode}`);
    if (cahedData) {
      return JSON.parse(cahedData) as IShortenURLData;
    }
    return null;
  }

  private async incrementClickCount(shortCode: string): Promise<void> {
    await this.shortenUrlRepository.incrementClickCount(shortCode);
  }

  async getOriginalUrl(
    shortCode: string
  ): Promise<IShortenURLData | undefined> {
    try {
      const cachedUrl = await this.getCachedUrl(shortCode);

      if (cachedUrl) {
        this.incrementClickCount(shortCode);
        return cachedUrl;
      }

      const url = await this.shortenUrlRepository.findByShortCode(shortCode);

      if (!url) {
        logger.error(MESSAGE.URL_DOES_NOT_EXIST);
        return;
      }

      await this.incrementClickCount(shortCode);
      await this.cacheUrl(shortCode, url);

      return url;
    } catch (err) {
      logger.error(MESSAGE.ERROR_RETRIEVING_URL);
    }
  }
}

export default ShortenURLService;
