import { NextResponse } from "next/server";
import {
  AssetValidationError,
  updateEnergyAssetStatus,
  validateAssetStatus
} from "../../../../lib/energy-assets";

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

export async function PATCH(
  request: Request,
  context: { params: Promise<{ assetId: string }> }
) {
  try {
    const { assetId } = await context.params;
    const input = (await request.json()) as { status?: unknown };
    const asset = await updateEnergyAssetStatus(assetId, validateAssetStatus(input.status));

    return NextResponse.json({ data: asset });
  } catch (error) {
    if (error instanceof AssetValidationError) {
      return errorResponse(422, "VALIDATION_ERROR", error.message, error.details);
    }

    if (error instanceof Error && error.message === "Asset not found.") {
      return errorResponse(404, "ASSET_NOT_FOUND", "Energy asset was not found.");
    }

    return errorResponse(500, "ASSET_UPDATE_FAILED", "Unable to update energy asset.");
  }
}
