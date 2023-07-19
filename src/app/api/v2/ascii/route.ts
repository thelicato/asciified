import figlet, { parseFont } from "figlet";
import { NextResponse } from "next/server";
import { SUPPORTED_FONTS } from "@asciified/app/constants";
import { asyncFiglet } from "@asciified/app/helpers";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const queryFont = searchParams.get("font") as string;
  const queryText = searchParams.get("text") as string;
  const figletFont =
    searchParams.get("text") && SUPPORTED_FONTS.includes(queryFont)
      ? queryFont
      : "Standard";

  // Otherwise get a asciified text
  try {
    const font = await import(`figlet/importable-fonts/${figletFont}.js`);
    parseFont(figletFont, font.default);
    const figletTxt = await asyncFiglet(queryText, {
      font: figletFont as figlet.Fonts,
      horizontalLayout: "default",
      width: 420,
      whitespaceBreak: true,
    });
    return NextResponse.json({ art: figletTxt });
  } catch (e) {
    console.log("An error occurred in /api/v2/ascii");
    console.log(e);
    return NextResponse.json({});
  }
}
