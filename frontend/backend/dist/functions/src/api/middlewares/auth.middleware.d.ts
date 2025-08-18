import { Request, Response, NextFunction } from 'express';
interface AuthRequest extends Request {
    user?: {
        id: string;
        role: string;
    };
}
export declare const protect: (req: AuthRequest, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
export declare const authorize: (...roles: string[]) => (req: AuthRequest, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
export {};
//# sourceMappingURL=auth.middleware.d.ts.map