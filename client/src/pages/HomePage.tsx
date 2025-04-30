import { useState } from "react";
import Background from "../shared/components/Background";
import InputForm from "../shared/components/InputForm";
import Options from "../shared/components/Options";
import { IShortenURLParams } from "../shared/utils/interface/shorten-url";
import { isUrlValid } from "../shared/utils/helpers/pure-function";
import ShortenURLService from "../shared/utils/api/shorten-url";
import * as MESSAGE from "../shared/utils/enums/Messages";

function HomePage() {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [myOriginalUrl, setMyOriginalUrl] = useState<string>("");
  const [isViewMyUrl, setIsViewMyUrl] = useState<boolean>(false);
  const [formData, setFormData] = useState<IShortenURLParams>({
    originalUrl: "",
    customSlug: "",
    expiresAt: "",
    utmSource: "",
    utmMedium: "",
    utmCampaign: "",
    utmTerm: "",
    utmContent: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setShortUrl("");

    if (!formData.originalUrl) {
      setError(MESSAGE.PLEASE_ENTER_URL);
      return;
    }

    if (!isUrlValid(formData.originalUrl)) {
      setError(MESSAGE.PLEASE_ENTER_VALID_URL);
      return;
    }

    setLoading(true);
    const params = Object.entries(formData).reduce((acc: any, [key, value]) => {
      if (value) acc[key] = value;
      return acc;
    }, {});

    const shortenUrlSrvice = new ShortenURLService();
    const response = await shortenUrlSrvice.create(params);

    if (!response.success) {
      setError(response.message || MESSAGE.FAILED_TO_SHORTENED_URL);
      setLoading(false);
      return;
    }

    setShortUrl(response.shortUrl);
    setMyOriginalUrl(response.data.originalUrl);
    setLoading(false);
  };

  const handleCopyToClipboard = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const toggleAdvanced = () => {
    setShowOptions(!showOptions);
  };

  const handleViewMyUrl = () => {
    setIsViewMyUrl(!isViewMyUrl);
  };

  const handleShotenAnother = () => {
    setShortUrl("");
    setMyOriginalUrl("");
    setFormData({
      originalUrl: "",
      customSlug: "",
      expiresAt: "",
      utmSource: "",
      utmMedium: "",
      utmCampaign: "",
      utmTerm: "",
      utmContent: "",
    });
  };

  return (
    <div className="relative min-h-screen py-10 flex justify-center items-center flex-col text-white overflow-hidden">
      <h1 className="z-20 text-4xl font-bold mb-5">URL Shortener</h1>
      <Background />
      <div className="z-20 w-[60%] bg-white/20 backdrop-blur-md rounded-xl shadow-lg flex flex-col items-center text-center p-8 gap-5">
        <form onSubmit={handleSubmit} className="w-full">
          <InputForm
            label="Shorten a long URL"
            placeholder="Enter ling url here"
            icon="🔗"
            type="text"
            name="originalUrl"
            value={formData.originalUrl}
            handleChange={handleChange}
          />

          <div className="mb-6">
            <button
              type="button"
              onClick={toggleAdvanced}
              className="text-sm text-white hover:text-blue-800 font-medium mt-2"
            >
              {showOptions
                ? "- Hide Advanced Options"
                : "+ Show Advanced Options"}
            </button>
          </div>
          {showOptions && (
            <Options
              formData={formData}
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e)
              }
            />
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-white/30 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Shortening..." : "Shorten URL"}
            </button>
          </div>
        </form>
        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-red-400">⚠️</span>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}

        {shortUrl && (
          <div className="w-full mt-8 bg-green-50 border border-green-200 rounded-md p-6">
            <h3 className="text-lg font-medium text-green-800 mb-3">
              {isViewMyUrl ? "My Original Url" : "URL Successfully Shortened!"}
            </h3>
            <div className=" flex items-center mt-2 bg-white text-black rounded-md border border-gray-300 overflow-hidden">
              <input
                type="text"
                readOnly
                value={isViewMyUrl ? myOriginalUrl : shortUrl}
                className="w-full px-4 py-2 rounded-md bg-white/30 text-black placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/60"
              />
              <button
                onClick={handleCopyToClipboard}
                className="bg-gray-100 p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                {copied ? "✓" : "📋"}
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {copied
                ? "Copied to clipboard!"
                : "Click the icon to copy to clipboard"}
            </p>
          </div>
        )}

        {shortUrl && (
          <div className="flex justify-center gap-10">
            <button
              type="submit"
              onClick={handleViewMyUrl}
              className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-white/30 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isViewMyUrl ? "My Shoten URL" : "My URL"}
            </button>
            <button
              type="submit"
              onClick={handleShotenAnother}
              className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium  bg-blue-700 rounded-md shadow-sm text-white bg-white/30 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              Shorten another
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
