import { createAction, props } from '@ngrx/store';
import { ActionPayloadData, DmsImportDeal } from '@app/entities';
import { DealImportRequest, DmsSearch } from '../model';

export const searchDeal = createAction('[DMS] Search Deal', props<ActionPayloadData<DmsSearch>>());
export const searchDealSuccess = createAction('[DMS] Search Deal Success', props<ActionPayloadData<DmsImportDeal[]>>());
export const searchDealFailure = createAction('[DMS] Search Deal Failure');

export const dealImport = createAction('[DMS] Deal Import', props<ActionPayloadData<DealImportRequest>>());
export const dealImportSuccess = createAction('[DMS] Deal Import Success', props<ActionPayloadData<boolean>>());
export const dealImportFailure = createAction('[DMS] Deal Import Failure');

export const resetEvent = createAction('[DMS] Reset Event');

export const checkDuplicateImport = createAction('[DMS] Check Deal Import', props<ActionPayloadData<DealImportRequest>>());
export const checkDuplicateImportSuccess = createAction('[DMS] Check Deal Import Success', props<ActionPayloadData<DealImportRequest>>());
export const checkDuplicateImportFailure = createAction('[DMS] Check  Deal Import Failure' , props<ActionPayloadData<DealImportRequest>>());

export const updateReimported = createAction('[DMS] Update Is Re-Imported', props<ActionPayloadData<boolean>>());

export const refresh = createAction('[DMS] Refresh');