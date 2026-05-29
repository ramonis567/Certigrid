import { NextResponse } from "next/server";
import type { CreateEnergyAssetInput } from "@certigrid/shared";
import {
  AssetValidationError,
  insertEnergyAsset,
  listEnergyAssets
} from "../../../lib/energy-assets";

function errorResponse(status: number, code: string, message: string, details?: unknown) {
  return NextResponse.json(
    {
      error: {
        code,
        details,
        message
      }
    },
    { status }
  );
}

export async function GET() {
  const result = await listEnergyAssets();

  return NextResponse.json({
    data: result.assets,
    meta: {
      mode: result.mode,
      warning: result.warning
    }
  });
}

export async function POST(request: Request) {
  try {
    const input = (await request.json()) as unknown;
    const asset = await insertEnergyAsset(input as Partial<CreateEnergyAssetInput>);

    return NextResponse.json({ data: asset }, { status: 201 });
  } catch (error) {
    if (error instanceof AssetValidationError) {
      return errorResponse(422, "VALIDATION_ERROR", error.message, error.details);
    }

    return errorResponse(500, "ASSET_CREATE_FAILED", "Unable to create energy asset.");
  }
}
