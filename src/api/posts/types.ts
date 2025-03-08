
export type Post = {
  id: number;
  kode_buku: string;
  kategori: string;
  pengarang: string;
  judul: string;
  penerbit: string;
  tahun: string;
  jumlah: number;
  keluar: number;
  sisa: number;
  gambar: string;
  created_at: string;
  updated_at: string;
};

type PaginationLink = {
  url: string | null;
  label: string;
  active: boolean;
};

type BukuPagination = {
  current_page: number;
  data: Post[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};

export type BukuResponse = {
  draw: number;
  recordsTotal: number;
  recordsFiltered: number;
  data: BukuPagination;
};
