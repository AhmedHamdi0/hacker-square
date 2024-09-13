import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
    console.log('Error:', error);
    return response.status(500).send('Oops, an unexpected error occurred, please try again!!');
}