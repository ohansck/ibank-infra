import { APIGatewayProxyEvent, APIGatewayProxyResult, Context, Handler } from 'aws-lambda';

export const handler: Handler = async (event: APIGatewayProxyEvent) => {
    try {
        throw new Error("Messup");

        console.log(event)

        // Optionally, you can perform other actions here, such as copying the object to another location, etc.

    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};