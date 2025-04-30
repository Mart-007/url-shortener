export const generateShortCode = (): string => {
  const alphabet =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const length = 8;

  let shortCode = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    shortCode += alphabet[randomIndex];
  }

  return shortCode;
};

export const isValidURL = (url: string): boolean => {
  if (new URL(url)) {
    return true;
  }
  return false;
};
