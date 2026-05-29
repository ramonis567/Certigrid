import type { ProofMode, ProofStatus } from "@certigrid/shared";
import { sha256Hash } from "./hashing";

export interface ProofTransaction {
  proofMode: ProofMode;
  proofStatus: ProofStatus;
  proofTransactionReference: string;
}

export function createMockProofTransaction(input: {
  lifecycleEventType: string;
  relatedEntityId: string;
  metadataHash: string;
}): ProofTransaction {
  const digest = sha256Hash({
    lifecycleEventType: input.lifecycleEventType,
    metadataHash: input.metadataHash,
    relatedEntityId: input.relatedEntityId
  });

  return {
    proofMode: "Mock",
    proofStatus: "Mocked",
    proofTransactionReference: `mock_tx_${digest.slice("sha256:".length, 38)}`
  };
}
