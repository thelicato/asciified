import { NextResponse } from "next/server";
import { SUPPORTED_FONTS } from "@asciified/app/constants";
import { IApiFonts } from "@asciified/app/types";

export async function GET() {
  const res: IApiFonts = { fonts: SUPPORTED_FONTS };
  return NextResponse.json(res);
}
