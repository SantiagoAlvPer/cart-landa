import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { AddTocartInput } from "../../shared/interfaces/addtocart";
import { RemoveFromCartInput } from "../../shared/interfaces/removeFromCartInput";
import { ddbDocClient } from "../../shared/dynamodb/client"; // Debes tener este cliente configurado

const TABLE_NAME = "CartTable"; // Cambia por el nombre real de tu tabla

export class CartService {
  async addToCart(data: AddTocartInput) {
    // Obtener el carrito actual
    const getResult = await ddbDocClient.send(
      new GetCommand({
        TableName: TABLE_NAME,
        Key: { userId: data.userId },
      })
    );
    let products = getResult.Item?.products || [];
    let total = data.total ?? 0;

    // Agregar productos (sobrescribe el array con los nuevos productos)
    products = data.products.map((p: any) => ({ uuid: p.uuid }));

    // Guardar el carrito actualizado
    await ddbDocClient.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: {
          userId: data.userId,
          products,
          total,
        },
      })
    );

    return {
      products,
      userId: data.userId,
      total,
    };
  }

  async removeFromCart(data: RemoveFromCartInput) {
    // Obtener el carrito actual
    const getResult = await ddbDocClient.send(
      new GetCommand({
        TableName: TABLE_NAME,
        Key: { userId: data.userId },
      })
    );
    if (!getResult.Item) {
      throw new Error("Carrito no encontrado");
    }

    // Filtrar productos
    const products = getResult.Item.products.filter(
      (p: any) => p.uuid !== data.uuid
    );

    // Actualizar el carrito
    await ddbDocClient.send(
      new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { userId: data.userId },
        UpdateExpression: "set products = :products",
        ExpressionAttributeValues: {
          ":products": products,
        },
      })
    );

    return {
      products,
      userId: data.userId,
      total: getResult.Item.total,
    };
  }
}
