import { Request, Response } from 'express';

import { Order } from '../../models/Order';

export async function changeOrderStatus(req: Request, res: Response) {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const validStatuses = ['WAITING', 'IN_PRODUCTION', 'DONE'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    await Order.findByIdAndUpdate(orderId, { status });

    res.sendStatus(204);
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
}
