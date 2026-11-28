const ProdukRepository = require("../repositories/produkRepository");

const getAllProduk = asyncHandler(async (req, res) => {
  const produk = await ProdukRepository.findAll();
  const total = await ProdukRepository.countAll();

  return success(res, {
    data: {
      produk,
      total,
    },
    message: "Berhasil mengambil seluruh produk",
  });
});

const getProdukById = asyncHandler(async (req, res) => {
  const data = await ProdukRepository.findById(req.id);

  if (!data) throw new NotFoundError("Produk tidak ditemukan");

  return success(res, {
    data: data,
    message: "Berhasil mengambil produk id " + req.id,
  });
});

const getProdukByKategory = asyncHandler(async (req, res) => {
  const data = await ProdukRepository.findByKategoryId(req.id);

  return success(res, {
    data: {
      produk:data,
      total: data.length
    },
    message: "Berhasil mengambil produk kategori id " + req.id,
  });
});

const createProduk = asyncHandler(
  async (req, res) => {
    const data = await ProdukRepository.create(req.body);

    return success(res, {
      data,
      message: "Berhasil memasukan produk",
    });
  },
  (err, req, res, next) => {
    if (err.code === "23503") {
      return next(new NotFoundErrorDB("Kategori tidak ditemukan"));
    }
    if (err.code === "23505") {
      return next(new ConflictError("UNIQUE (23505)"));
    }

    next(err);
  }
);

const updateProduk = asyncHandler(async (req, res) => {
  const data = await ProdukRepository.update(req.id, req.body);

  return success(res, {
    data: data,
    message: "Berhasil mengupdate produk put",
  });
});

const patchProduk = asyncHandler(async (req, res) => {
  const data = await ProdukRepository.partialUpdate(req.id, req.body);

  return success(res, {
    data: data,
    message: "Berhasil mengupdate produk patch",
  });
},(err, req, res, next) => {
  if (err.code === "23505") {
    return next(new ConflictError("UNIQUE (23505)"));
  }

  next(err);
});

const deleteProduk = asyncHandler(async (req, res) => {
  const data = await ProdukRepository.softDelete(req.id);

  if(!data) throw new NotFoundError("Produk tidak ditemukan")

  return success(res, {
    statusCode: 204
  });
});

const restoreProduk = asyncHandler(async (req,res)=> {
  const data = await ProdukRepository.restore(req.id)

  if(!data) throw new NotFoundError("Tidak Sedang Dihapus")

  return success(res, {
    data: data,
    message: "Berhasil Restore data",
  });
})
  
function asyncHandler(fn, onError) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      if (onError) {
        return onError(err, req, res, next);
      }

      next(err);
    });
  };
}

function success(res, options) {
  const { data, message, statusCode = 200 } = options;

  return res.status(statusCode).json({
    status: "success",
    ...(message && { message }),
    data,
  });
}

class AppError extends Error {
  constructor(message, statusCode = 500, code = "INTERNAL_ERROR",status = "error") {
    super(message);

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;
    this.status = status

    Error.captureStackTrace?.(this, this.constructor);
  }
}

class NotFoundError extends AppError {
  constructor(message = "Resource tidak ditemukan") {
    super(message, 404, "NOT_FOUND");
  }
}

class NotFoundErrorDB extends AppError {
  constructor(message = "Resource tidak ditemukan") {
    super(message, 422, "NOT_FOUND");
  }
}

class BadRequestError extends AppError {
  constructor(message = "Request tidak valid") {
    super(message, 400, "BAD_REQUEST");
  }
}

class ConflictError extends AppError {
  constructor(message = "Data mengalami konflik") {
    super(message, 409, "CONFLICT");
  }
}

module.exports = {
  getAllProduk,
  getProdukById,
  getProdukByKategory,
  createProduk,
  updateProduk,
  patchProduk,
  deleteProduk,
  restoreProduk,
  AppError,
  NotFoundError,
  BadRequestError,
  ConflictError
};
