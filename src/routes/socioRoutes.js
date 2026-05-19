const express = require('express');
const router = express.Router();
const { getSocios, getSocioById, createSocio, updateSocio, deleteSocio } = require('../controllers/socioController');

router.get('/', getSocios);
router.get('/:id', getSocioById);
router.post('/', createSocio);
router.put('/:id', updateSocio);
router.delete('/:id', deleteSocio);

module.exports = router;
