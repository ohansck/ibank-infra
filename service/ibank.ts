import { APIGatewayProxyHandler } from 'aws-lambda';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client();

export const handler: APIGatewayProxyHandler = async (event, _context) => {
    try {
        // Extracting bucket name and file key from the request
        //const { bucketName, fileName } = JSON.parse(event.body);

        // Constructing parameters for S3 getObject command

        const params = {
            Bucket: process.env.IBANK_BUCKET,
            Key: process.env.IBANK_FILE_KEY,
        };

        // Retrieving JSON file content from S3
        const { Body } = await s3Client.send(new GetObjectCommand(params));

        // Read content from Body
        const content = Body ? await streamToString(Body) : null;

        // Parse JSON content
        const jsonContent = content ? JSON.parse(content) : null;
        // Parsing JSON content
        //const jsonContent = JSON.parse(Buffer.from(Body).toString('utf-8'));
        console.log(jsonContent)
        // Returning JSON content
        return {
            statusCode: 200,
            body: JSON.stringify(jsonContent)
        };
    } catch (error) {
        console.error('Error:', error);

        // Returning error response
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' })
        };
    }
};

// Helper function to convert stream to string
const streamToString = async (stream: any): Promise<string> => {
    const chunks: Uint8Array[] = [];
    return new Promise((resolve, reject) => {
        stream.on('data', (chunk: Uint8Array) => chunks.push(chunk));
        stream.on('error', reject);
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
    });
};
