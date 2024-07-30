declare module 'next-connect' {
    import { NextApiRequest, NextApiResponse } from 'next';
    import { IncomingMessage, ServerResponse } from 'http';
  
    type Middleware<Req = NextApiRequest, Res = NextApiResponse> = (
      req: Req,
      res: Res,
      next: (err?: any) => void
    ) => void | Promise<void>;
  
    interface Options<Req = NextApiRequest, Res = NextApiResponse> {
      onError?: (err: any, req: Req, res: Res, next: (err?: any) => void) => void;
      onNoMatch?: (req: Req, res: Res) => void;
    }
  
    interface NextConnect<Req = NextApiRequest, Res = NextApiResponse> {
      use(...handlers: Middleware<Req, Res>[]): this;
      get(...handlers: Middleware<Req, Res>[]): this;
      post(...handlers: Middleware<Req, Res>[]): this;
      put(...handlers: Middleware<Req, Res>[]): this;
      delete(...handlers: Middleware<Req, Res>[]): this;
      patch(...handlers: Middleware<Req, Res>[]): this;
      options(...handlers: Middleware<Req, Res>[]): this;
      handler(req: IncomingMessage, res: ServerResponse): void;
    }
  
    function nextConnect<Req = NextApiRequest, Res = NextApiResponse>(
      options?: Options<Req, Res>
    ): NextConnect<Req, Res>;
  
    export default nextConnect;
  }
  