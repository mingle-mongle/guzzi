import express from 'express';
import * as listController from '../controller/list.js';

const router = express.Router();

// GET /lists?msgId=msgId -> query

// paging query O
router.get('/lists', listController.getAllList);

// paging query X
// router.get("/lists", listController.getListAllOrigin);

router.get('/list/:msgId', listController.getList);

// Post /lists
router.post('/lists', listController.createList);

// Put /lists/:id -> params
router.put('/list/:msgId', listController.updateList);

// Delete /lists/:id -> params
router.delete('/list/:msgId', listController.deleteList);

export default router;
