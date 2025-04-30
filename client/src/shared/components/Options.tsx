import { IOptions } from "../utils/interface/shorten-url";
import InputForm from "./InputForm";

function Options({ formData, handleChange }: IOptions) {
  const expiresAt = formData.expiresAt
    ? typeof formData.expiresAt === "string"
      ? formData.expiresAt
      : new Date(formData.expiresAt).toISOString().slice(0, 16)
    : "";

  return (
    <div className="space-y-4 mb-6 p-4 rounded-md">
      <div>
        <InputForm
          label="Custom Slug (Optional)"
          placeholder="Your custom slug"
          type="text"
          name="customSlug"
          value={String(formData.customSlug)}
          handleChange={handleChange}
        />
      </div>

      <div>
        <InputForm
          label="Expiration Date/Time (Optional)"
          type="datetime-local"
          name="expiresAt"
          value={expiresAt}
          handleChange={handleChange}
          placeholder="Select date and time"
        />
      </div>

      <div>
        <h4 className="text-white font-medium text-sm mb-2">
          UTM Parameters (Optional)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <InputForm
              label="Source"
              type="text"
              name="utmSource"
              value={String(formData.utmSource)}
              handleChange={handleChange}
              placeholder="google"
            />
          </div>
          <div>
            <InputForm
              label="Medium"
              type="text"
              name="utmMedium"
              value={String(formData.utmMedium)}
              handleChange={handleChange}
              placeholder="cpc"
            />
          </div>
          <div>
            <InputForm
              label="Campaign"
              type="text"
              name="utmCampaign"
              value={String(formData.utmCampaign)}
              handleChange={handleChange}
              placeholder="spring_sale"
            />
          </div>
          <div>
            <InputForm
              label="Term"
              type="text"
              name="utmTerm"
              value={String(formData.utmTerm)}
              handleChange={handleChange}
              placeholder="running+shoes"
            />
          </div>
          <div className="md:col-span-2">
            <InputForm
              label="Content"
              type="text"
              name="utmContent"
              value={String(formData.utmContent)}
              handleChange={handleChange}
              placeholder="logolink"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Options;
