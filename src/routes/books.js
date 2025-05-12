const Joi = require('@hapi/joi');
const {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
} = require('../handlers/booksHandler');

const failAction = (request, h, err) => {
  let errorMessage = err.details[0].message;
  

  if (err.details[0].path.includes('name')) {
    errorMessage = request.method === 'post' 
      ? 'Gagal menambahkan buku. Mohon isi nama buku'
      : 'Gagal memperbarui buku. Mohon isi nama buku';
  } else if (err.details[0].path.includes('readPage')) {
    errorMessage = 'Gagal ' + (request.method === 'post' ? 'menambahkan' : 'memperbarui') + 
                   ' buku. readPage tidak boleh lebih besar dari pageCount';
  }

  return h.response({
    status: 'fail',
    message: errorMessage
  }).code(400).takeover();
};

const bookPayloadSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
  author: Joi.string().required(),
  summary: Joi.string().required(),
  publisher: Joi.string().required(),
  pageCount: Joi.number().integer().min(1).required(),
  readPage: Joi.number().integer().min(0).required(),
  reading: Joi.boolean().required(),
});

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
    options: {
      validate: {
        payload: bookPayloadSchema,
        failAction: failAction,
        options: {
          abortEarly: false
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
    options: {
      validate: {
        query: Joi.object({
          name: Joi.string().optional(),
          reading: Joi.string().valid('0', '1').optional(),
          finished: Joi.string().valid('0', '1').optional(),
        }),
        failAction: failAction
      }
    }
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookByIdHandler,
    options: {
      validate: {
        params: Joi.object({
          id: Joi.string().required(),
        }),
        failAction: failAction
      }
    }
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBookByIdHandler,
    options: {
      validate: {
        params: Joi.object({
          id: Joi.string().required(),
        }),
        payload: bookPayloadSchema,
        failAction: failAction,
        options: {
          abortEarly: false
        }
      }
    }
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBookByIdHandler,
    options: {
      validate: {
        params: Joi.object({
          id: Joi.string().required(),
        }),
        failAction: failAction
      }
    }
  }
];

module.exports = routes;