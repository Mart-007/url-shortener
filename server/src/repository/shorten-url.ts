import { db } from "@app/db/knex";
import { IShortenURLData } from "@app/interfaces/shorten-url";

class ShortenURLRepository {
  private tableName: string;

  constructor() {
    this.tableName = "shorten_urls";
  }

  async create(
    url: Omit<IShortenURLData, "id" | "createdAt" | "updatedAt" | "clickCount">
  ): Promise<IShortenURLData> {
    const [result] = await db(this.tableName)
      .insert({
        originalUrl: url.originalUrl,
        shortCode: url.shortCode,
        expiresAt: url.expiresAt,
        utmSource: url.utmSource,
        utmMedium: url.utmMedium,
        utmCampaign: url.utmCampaign,
        utmTerm: url.utmTerm,
        utmContent: url.utmContent,
      })
      .returning("*");

    return result;
  }

  async findByShortCode(shortCode: string): Promise<IShortenURLData | null> {
    const url = await db(this.tableName)
      .where("shortCode", shortCode)
      .where((qb) => {
        qb.whereNull("expiresAt").orWhere("expiresAt", ">", db.fn.now());
      })
      .first();

    return url;
  }

  async checkShortCodeExist(shortCode: string): Promise<boolean | undefined> {
    const result = await db(this.tableName)
      .where("shortCode", shortCode)
      .count("id as count")
      .first();

    return result && Number(result.count) > 0;
  }

  async incrementClickCount(shortCode: string): Promise<void> {
    await db(this.tableName)
      .where("shortCode", shortCode)
      .increment("clickCount", 1);
  }
}

export default ShortenURLRepository;
