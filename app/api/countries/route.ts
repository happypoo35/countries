import { NextResponse } from "next/server";

import countries from "@public/data.json";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  const countriesData = countries.filter((p) =>
    p.name.toLowerCase().includes(name?.toLowerCase() ?? "")
  );
  return NextResponse.json(countriesData.slice(0, 10));
}
