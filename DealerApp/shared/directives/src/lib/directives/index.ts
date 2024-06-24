export * from './compare.directive';
export * from './trim.directive';
export * from './uppercase.directive';
export * from './permission.directive';

import { CompareDirective } from './compare.directive';
import { PermissionDirective } from './permission.directive';
import { TrimDirective } from './trim.directive';
import { UpperCaseDirective } from './uppercase.directive';

export const directives = [
  PermissionDirective,
  CompareDirective,
  TrimDirective,
  UpperCaseDirective,
];
