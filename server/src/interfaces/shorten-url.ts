export interface IShortenURLData {
  id: number;
  originalUrl: string;
  shortCode: string;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date | null;
  clickCount: number;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
}

export interface IShortenURLParams {
  originalUrl: string;
  customSlug?: string;
  expiresAt?: Date;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
}
