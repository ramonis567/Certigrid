import AdminAssetRegistry from "./AdminAssetRegistry";
import { listEnergyAssets } from "../../lib/energy-assets";

export default async function AdminPage() {
  const result = await listEnergyAssets();

  return (
    <AdminAssetRegistry
      initialAssets={result.assets}
      mode={result.mode}
      warning={result.warning}
    />
  );
}
