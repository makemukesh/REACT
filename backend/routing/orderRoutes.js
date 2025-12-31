import express from 'express';
import { addOrderItems, getOrders, updateOrderStatus, deleteOrder, getMyOrders, cancelMyOrder } from '../controllers/orderControllers.js';
import { protect, adminOnly } from '../middlewares/authmiddlewares.js';

const router = express.Router();

router.post('/', protect, addOrderItems);
router.get('/myorders', protect, getMyOrders);
router.put('/:id/cancel', protect, cancelMyOrder);
router.get('/', protect, adminOnly, getOrders);
router.put('/:id', protect, adminOnly, updateOrderStatus);
router.delete('/:id', protect, adminOnly, deleteOrder);

export default router;
