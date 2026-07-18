// src/app/api/analyze/route.ts

import { NextRequest, NextResponse } from "next/server";

import { analyzeStartup } from "@/services/boardroomService";
import { StartupInput } from "@/types/boardroom";

export async function POST(req: NextRequest) {
  try {
    const body: StartupInput = await req.json();

    const {
      startupName,
      industry,
      problem,
      solution,
      targetMarket,
      businessModel,
      competition,
      fundingRequired,
    } = body;

    if (
      !startupName?.trim() ||
      !industry?.trim() ||
      !problem?.trim() ||
      !solution?.trim() ||
      !targetMarket?.trim() ||
      !businessModel?.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required startup information.",
        },
        { status: 400 }
      );
    }

    const analysis = await analyzeStartup({
      startupName: startupName.trim(),
      industry: industry.trim(),
      problem: problem.trim(),
      solution: solution.trim(),
      targetMarket: targetMarket.trim(),
      businessModel: businessModel.trim(),
      competition: competition?.trim() || "Not specified",
      fundingRequired:
        fundingRequired?.trim() || "Not specified",
    });

    return NextResponse.json(
      {
        success: true,
        data: analysis,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Analyze API Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to analyze startup.",
      },
      { status: 500 }
    );
  }
}