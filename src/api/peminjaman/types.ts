type User = {
  id: number;
  nik: string;
  nama: string;
  alamat: string;
  role: string;
  no_hp: string;
  created_at: string;
  updated_at: string;
};

type Buku = {
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

export type TypePeminjaman = {
  id: number;
  kode_peminjaman: string;
  user_id: number;
  buku_id: number;
  tanggal_pinjam: string;
  tanggal_kembali: string;
  status: string | null;
  created_at: string;
  updated_at: string;
  user: User;
  buku: Buku;
};

type PaginationLink = {
  url: string | null;
  label: string;
  active: boolean;
};

type Pagination<T> = {
  current_page: number;
  data: T[];
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

export type PeminjamanResponse = {
  draw: number;
  recordsTotal: number;
  recordsFiltered: number;
  data: Pagination<TypePeminjaman>;
};
