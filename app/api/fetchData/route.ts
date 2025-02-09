import { fetchData } from "@/api/fetchData";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const secret = req.headers.get("x-secret-key");

    if (secret !== process.env.FETCH_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await fetchData();
    return NextResponse.json({ message: "Data fetched successfully" });
}