declare module 'next-auth/providers/amazon' {
    import { OAuthConfig, OAuthUserConfig } from 'next-auth/providers/oauth';
  
    export default function AmazonProvider<P extends Record<string, any> = any>(
      options: OAuthUserConfig<P>
    ): OAuthConfig<P>;
  }
  