-- Jalankan skrip ini SETELAH terhubung ke database db_uts dan tabel sudah dibuat.
-- Aman dijalankan berulang kali: data lama dikosongkan dan sequence ID di-reset ke 1.
TRUNCATE TABLE produk,
kategori RESTART IDENTITY CASCADE;

-- 1. Seed data kategori (id otomatis 1 s/d 4)
INSERT INTO
    kategori (nama_kategori, deskripsi)
VALUES
    (
        'Elektronik',
        'Perangkat elektronik, gadget, dan aksesoris komputer'
    ),
    (
        'Alat Tulis Kantor',
        'Perlengkapan tulis-menulis dan kebutuhan administrasi'
    ),
    (
        'Makanan & Minuman',
        'Produk konsumsi kemasan dan minuman siap saji'
    ),
    ('Lain-lain', NULL);

-- Contoh deskripsi kosong (boleh NULL)
-- 2. Seed data produk
INSERT INTO
    produk (
        kategori_id,
        kode_produk,
        nama_produk,
        harga,
        stok,
        deleted_at
    )
VALUES
    -- Kategori 1: Elektronik
    (
        1,
        'ELK-001',
        'Mouse Wireless Logitech M185',
        165000,
        25,
        NULL
    ),
    (
        1,
        'ELK-002',
        'Keyboard Mechanical RGB',
        450000,
        10,
        NULL
    ),
    (
        1,
        'ELK-003',
        'Kabel HDMI 2.0 2 Meter',
        55000,
        0,
        NULL
    ), -- Contoh stok = 0
    -- Kategori 2: Alat Tulis Kantor
    (
        2,
        'ATK-001',
        'Buku Tulis Sinar Dunia 58 Lembar',
        5500,
        100,
        NULL
    ),
    (
        2,
        'ATK-002',
        'Pulpen Gel Hitam 0.5mm (Pack 12)',
        24000,
        40,
        NULL
    ),
    -- Kategori 3: Makanan & Minuman
    (
        3,
        'MNM-001',
        'Kopi Arabika Gayo 250gr',
        75000,
        15,
        NULL
    ),
    (
        3,
        'MNM-002',
        'Teh Hijau Celup Kotak Isi 25',
        18000,
        30,
        NULL
    ),
    -- Kategori 4: Lain-lain (contoh data yang sudah di-soft delete)
    (
        4,
        'LNL-001',
        'Payung Lipat Otomatis',
        60000,
        5,
        NOW ()
    );