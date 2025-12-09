const pool = require("../config/db");

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const [results] = await pool.execute(`SELECT * FROM data_siswa`);
      const formatted = results.map((item) => ({
        ...item,
        tgl_siswa: item.tgl_siswa
          ? item.tgl_siswa.toISOString().split("T")[0]
          : null,
      }));
      res.status(200).json(formatted);
    } catch (err) {
      next(err);
    }
  },

  getById: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const [results] = await pool.execute(
        `SELECT * FROM data_siswa WHERE kode_siswa = ?`,
        [id]
      );
      if (results.length === 0) {
        res.status(404).json({ message: "Data tidak ditemukan" });
      } else {
        res.status(200).json(results[0]);
      }
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    try {
      const { nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa } = req.body;

      if (!nama_siswa || !alamat_siswa || !tgl_siswa || !jurusan_siswa) {
        return res.status(400).json({ message: "Semua field harus diisi" });
      }

      const [result] = await pool.execute(
        `INSERT INTO data_siswa (nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa) VALUES (?, ?, ?, ?)`,
        [nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa]
      );

      res
        .status(201)
        .json({
          id: result.insertId,
          nama: nama_siswa,
          alamat: alamat_siswa,
          tgl: tgl_siswa,
          jurusan: jurusan_siswa,
        });
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const { nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa } = req.body;

      if (!nama_siswa || !alamat_siswa || !tgl_siswa || !jurusan_siswa) {
        return res.status(400).json({ message: "Semua field harus diisi" });
      }

      const [result] = await pool.execute(
        `UPDATE data_siswa SET nama_siswa = ?, alamat_siswa = ?, tgl_siswa = ?, jurusan_siswa = ? WHERE kode_siswa = ?`,
        [nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa, id]
      );

      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Data tidak ditemukan" });
      res.status(200).json({ message: "Data berhasil diperbarui" });
    } catch (err) {
      next(err);
    }
  },

  remove: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const [result] = await pool.execute(
        `DELETE FROM data_siswa WHERE kode_siswa = ?`,
        [id]
      );
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Data tidak ditemukan" });
      res.status(200).json({ message: "Data berhasil dihapus" });
    } catch (err) {
      next(err);
    }
  },
};
