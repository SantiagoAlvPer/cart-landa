import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// Puedes agregar configuración personalizada aquí si lo necesitas
const client = new DynamoDBClient({});

export const ddbDocClient = DynamoDBDocumentClient.from(client);
