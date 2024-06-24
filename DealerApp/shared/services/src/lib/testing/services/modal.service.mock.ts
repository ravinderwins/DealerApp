import { of } from 'rxjs';

export const MockDialogService = {
  open: () => {
    return { 
      afterClosed: () => of(true),
      componentInstance: {
        save: of({id: 1})
      }
    };
  },

  openDeleteDialog: () => {
    return { afterClosed: () => of(true) };
  },

  close: () => {
    // closing dialog method
  }
};
