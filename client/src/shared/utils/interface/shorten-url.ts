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
  customSlug?: string | undefined;
  expiresAt?: Date | string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
}

export interface IInputForm {
  label: string;
  placeholder?: string;
  name: string;
  type: string;
  icon?: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IOptions {
  formData: IShortenURLParams;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
