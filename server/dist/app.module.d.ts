import { MiddlewareConsumer, NestMiddleware, NestModule } from '@nestjs/common';
import { NextFunction } from 'express';
export declare class DelayMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export declare class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void;
}
