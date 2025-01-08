import { MatPaginatorIntl } from '@angular/material/paginator';

export class CustomPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Item limit per page:';

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0) {
      return `Results: 0 of ${length}`;
    }
    const start = page * pageSize + 1;
    const end = Math.min((page + 1) * pageSize, length);
    return `Results: ${start}-${end} of ${length}`;
  };
}
