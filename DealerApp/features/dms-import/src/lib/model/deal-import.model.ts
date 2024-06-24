export interface DealImportRequest {
  providerCode: string;
  importId: string;
  dealId: number;

  dealNo?: string;
  alreadyImportedDeal?: number;
}