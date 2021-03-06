import { errorHandler, jwtMiddleware, connectDB } from './';

export { apiHandler };

function apiHandler(handler) {
    return async (req, res) => {
        try {
            // global middleware
            jwtMiddleware(req, res);

            // route handler
            await handler(req, res);
        } catch (err) {
            // global error handler
            errorHandler(err, res);
        }
    }
}