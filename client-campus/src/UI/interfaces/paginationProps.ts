export interface paginationProps{
      next: React.MouseEventHandler<HTMLButtonElement>;
      back: React.MouseEventHandler<HTMLButtonElement>;
      currentPage: number;
      totalPages: number;
}