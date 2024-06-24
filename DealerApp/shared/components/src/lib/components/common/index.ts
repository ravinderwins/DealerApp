import { AutoRefreshButtonComponent } from './auto-refresh-button/auto-refresh-button.component';
import { AutoUnitImportComponent } from './auto-unit-import/auto-unit-import.component';
import { ChecklistItemComponent } from './checklist-item/checklist-item.component';
import { GlobalSearchComponent } from './global-search/global-search.component';
import { ListingFooterUrlComponent } from './listing-footer-url/listing-footer-url.component';
import { NotesComponent } from './notes/notes.component';
import { PiiPermissionComponent } from './pii-permission/pii-permission.component';
import { QuickActionMenuComponent } from './quick-action-menu/quick-action-menu.component';
import { quickActionComponents } from './quick-actions';
import { SignatureControlComponent } from './signature-control/signature-control.component';
import { UploadCameraDocsComponent } from './upload-documents/upload-camera-docs/upload-camera-docs.component';
import { UploadDocSectionComponent } from './upload-documents/upload-doc-section/upload-doc-section.component';
import { UploadDocsFormComponent } from './upload-documents/upload-docs-form/upload-docs-form.component';
import { DocsTabComponent } from './upload-documents/upload-docs-tab/docs-tab.component';
import { UploadDocsComponent } from './upload-documents/upload-docs/upload-docs.component';
import { UploadedDocumentsComponent } from './upload-documents/uploaded-documents/uploaded-documents.component';
import { UploadedFilesComponent } from './upload-documents/uploaded-files/uploaded-files.component';

export * from './auto-refresh-button/auto-refresh-button.component';
export * from './auto-unit-import/auto-unit-import.component';
export * from './checklist-item/checklist-item.component';
export * from './global-search/global-search.component';
export * from './listing-footer-url/listing-footer-url.component';
export * from './notes/notes.component';
export * from './pii-permission/pii-permission.component';
export * from './quick-action-menu/quick-action-menu.component';
export * from './quick-actions';
export * from './upload-documents/upload-camera-docs/upload-camera-docs.component';
export * from './upload-documents/upload-docs-tab/docs-tab.component';
export * from './upload-documents/upload-docs/upload-docs.component';
export * from './upload-documents/uploaded-files/uploaded-files.component';

export const commonComponents = [
  GlobalSearchComponent,
  SignatureControlComponent,
  NotesComponent,
  AutoUnitImportComponent,
  PiiPermissionComponent,
  UploadDocsFormComponent,
  UploadedDocumentsComponent,
  UploadDocSectionComponent,
  AutoRefreshButtonComponent,
  QuickActionMenuComponent,
  ChecklistItemComponent,
  UploadedFilesComponent,
  UploadCameraDocsComponent,
  DocsTabComponent,
  UploadDocsComponent,
  quickActionComponents,
  ListingFooterUrlComponent,
];
