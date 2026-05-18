import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import SiteSetting from "@/models/SiteSetting";
import { verifyAuth } from "@/lib/auth";

const DEFAULT_CRM_LOGIN_URL = "https://crm-eight-lac.vercel.app";

export async function GET() {
  try {
    // Try DB — if unavailable, fall back to the hardcoded default so the
    // button always works regardless of database connectivity.
    let crmLoginUrl = DEFAULT_CRM_LOGIN_URL;
    try {
      await dbConnect();
      const setting = await SiteSetting.findOne({});
      if (setting?.crmLoginUrl?.trim()) {
        crmLoginUrl = setting.crmLoginUrl.trim();
      }
    } catch {
      // DB unreachable — use default
    }

    return NextResponse.json(
      { success: true, data: { crmLoginUrl } },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: true, data: { crmLoginUrl: DEFAULT_CRM_LOGIN_URL } },
      { status: 200 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const decoded = await verifyAuth(req);
    if (!decoded) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Invalid token" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const crmLoginUrl = String(body?.crmLoginUrl || "").trim();

    if (!crmLoginUrl) {
      return NextResponse.json(
        { success: false, error: "CRM login URL is required" },
        { status: 400 }
      );
    }

    await dbConnect();
    const updated = await SiteSetting.findOneAndUpdate(
      {},
      { $set: { crmLoginUrl } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json(
      {
        success: true,
        data: { crmLoginUrl: updated.crmLoginUrl },
        message: "Settings updated successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update settings",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
