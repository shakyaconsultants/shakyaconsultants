import mongoose from "mongoose";

const siteSettingSchema = new mongoose.Schema(
  {
    crmLoginUrl: {
      type: String,
      trim: true,
      default: "https://crm-eight-lac.vercel.app",
    },
  },
  { timestamps: true }
);

const SiteSetting =
  mongoose.models.SiteSetting || mongoose.model("SiteSetting", siteSettingSchema);

export default SiteSetting;
