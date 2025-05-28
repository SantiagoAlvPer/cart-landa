import { AddTocartInput } from "../../shared/interfaces/addtocart";
import { RemoveFromCartInput } from "../../shared/interfaces/removeFromCartInput";
import { CartService } from "../../services/cart-service/cartSevice";
import express, { Request, Response } from "express";

const router = express.Router();
const cartService = new CartService();

// Añadir productos al carrito
router.post("/api/cart", async (req: Request, res: Response): Promise<any> => {
  const { userId, products, total } = req.body as AddTocartInput;

  if (
    !userId ||
    !products ||
    !Array.isArray(products) ||
    typeof total !== "number"
  ) {
    return res.status(400).json({ message: "Faltan campos requeridos" });
  }

  try {
    const result = await cartService.addToCart({ userId, products, total });
    return res.status(201).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al añadir al carrito" });
  }
});

// Eliminar producto del carrito
router.delete(
  "/api/cart/:uuid",
  async (req: Request, res: Response): Promise<any> => {
    const { userId } = req.body;
    const { uuid } = req.params;

    if (!userId || !uuid) {
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }

    try {
      const result = await cartService.removeFromCart({ userId, uuid });
      return res.status(200).json(result);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error al eliminar producto del carrito" });
    }
  }
);

export default router;
