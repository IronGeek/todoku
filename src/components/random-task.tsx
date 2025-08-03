'use client';

import { useEffect, useState } from 'react';

import type { JSX } from 'react';

const tasks: string[] = [
  'kirim follow up email',
  'beli susu, telur, roti',
  'hadiri rapat stand-up',
  'buat draft presentasi',
  'panggil tukang ledeng untuk keran bocor',
  'buat analisa untuk kampanye pemasaran',
  'siram tanaman',
  'siapkan catatan kuliah untuk kelas besok',
  'janjian ketemu dokter gigi',
  'tulis postingan blog tentang fitur baru',
  'bersihkan kulkas',
  'riset harga saingan',
  'bayar tagihan listrik',
  'ajukan laporan pengeluaran',
  'latihan gitar selama 30 menit',
  'balas pesan WA yang belum dibaca',
  'atur file digital di desktop',
  'ambil laundry di binatu',
  'perbarui perangkat lunak',
  'brainstorm ide produk baru',
  'ajak marmut jalan-jalan',
  "baca bab 5 dari 'Produktivitas Cerdas'",
  'konfirmasi detail penerbangan untuk perjalanan bisnis',
  'cek email lama dan berhenti berlangganan',
  'siapkan makanan untuk seminggu',
  'perbaiki bug di modul login',
  "hadiri webinar 'Pengantar AI'",
  'telepon ibu',
  'bersihkan debu di furnitur ruang tamu',
  'riset potensi vendor untuk proyek baru',
  'ganti sprei',
  'review kode teman untuk Modul B',
  'buat kalender konten media sosial',
  'kunjungi kantor pos untuk kirim paket',
  'rencanakan liburan akhir pekan bersama teman',
  'siapkan lingkungan pengembangan baru',
  'kosongkan mesin cuci',
  'siapkan agenda untuk klien',
  'perpanjang keanggotaan gym',
  'kurangi berat badan',
  'cadangkan dokumen penting ke cloud',
  'tinjau tugas mahasiswa',
  'pesan perlengkapan kantor baru',
  'bersihkan cermin kamar mandi',
  'kembangkan UI untuk mobile',
  'hadiri rapat persatuan mahasiswa',
  'cuci mobil',
  'siapkan laporan anggaran bulanan',
  'riset praktik terbaik untuk keamanan siber',
  'pisahkan cucian (putih, berwarna)',
  'hubungi IT',
  'baca artikel berita industri terbaru',
  'pesan restoran untuk ulang tahun',
  'uji endpoint API baru',
  'pel lantai dapur',
  'perbarui profil LinkedIn',
  'hadiri pameran karir kampus',
  'beli hadiah ulang tahun',
  'tulis dokumentasi untuk API',
  'sedot debu karpet',
  'jadwalkan tinjauan kinerja triwulanan',
  'brainstorm ide untuk team-building',
  'cetak label pengiriman',
  'dengarkan podcast',
  'bersihkan garasi',
  'bantu presentasi teman',
  'review portofolio',
  'perbaiki kaki kursi yang patah',
  'hadiri kelas yoga online',
  'perbarui CRM dengan prospek baru',
  'riset healing',
  'cuci jendela',
  'siapkan materi untuk rapat Dewan Direksi',
  'beli keyboard baru',
  'kembalikan buku perpustakaan',
  'Optimalkan queri basis data',
  'bersihkan kamar mandi',
  'telepon perusahaan asuransi tentang klaim',
  'baca novel lama',
  'rencanakan konten untuk buletin berikutnya',
  'perbaiki selang taman yang bocor',
  'tinjau makalah akademis',
  'atur obrolan kopi virtual dengan mentor',
  'atur rak bumbu',
  'siapkan otentikasi 2FA untuk akun',
  'kembangkan fitur baru',
  'bersihkan talang air',
  'hadiri reuni SMA',
  'isi ulang galon',
  'riset beasiswa untuk semester depan',
  'lap meja dapur',
  'uji responsivitas aplikasi seluler',
  'kirim notulen rapat ke peserta',
  'lari selama 30 menit',
  'buat slide presentasi untuk pitching',
  'kosongkan tempat sampah di seluruh rumah',
  'riset tren terbaru dalam desain UX',
  'telepon bank tentang transaksi mencurigakan',
  'siram kebun',
  'siapkan faktur untuk proyek klien',
  'atur pembayaran tagihan otomatis',
  'install ulang laptop',
  'riset peluang sukarela lokal',
  'kumpulkan tugas'
];
const used: string[] = [];

const getRandomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomTask = (): JSX.Element => {
  // eslint-disable-next-line no-useless-assignment
  let task = undefined;
  if (tasks.length > 1) {
    const idx = getRandomInt(0, tasks.length - 1);

    [task] = tasks.splice(idx, 1);

    used.push(task);
  } else {
    [task] = tasks;
    tasks.push(...used.splice(0, used.length));
  }

  return task;
};

const RandomTask = (): JSX.Element => {
  const [task, setTask] = useState(getRandomTask());

  useEffect(() => {
    const interval = setInterval(() => {
      setTask(getRandomTask());
    // eslint-disable-next-line @ts/no-magic-numbers
    }, 7777);

    return (): void => {
      clearInterval(interval);
    };
  }, []);

  return <span suppressHydrationWarning={true}>{task}</span>;
};

RandomTask.displayName = RandomTask;

export { RandomTask };
