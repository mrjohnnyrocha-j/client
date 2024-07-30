import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import LinkedInProvider from 'next-auth/providers/linkedin';
import FacebookProvider from 'next-auth/providers/facebook';
import TwitterProvider from 'next-auth/providers/twitter';
import SlackProvider from 'next-auth/providers/slack';

// Ensure these variables are never undefined
const {
  GOOGLE_ID = '',
  GOOGLE_SECRET = '',
  GITHUB_ID = '',
  GITHUB_SECRET = '',
  LINKEDIN_ID = '',
  LINKEDIN_SECRET = '',
  META_ID = '',
  META_SECRET = '',
  AMAZON_ID = '',
  AMAZON_SECRET = '',
  TWITTER_CLIENT_ID = '',
  TWITTER_CLIENT_SECRET = '',
  SLACK_CLIENT_ID = '',
  SLACK_CLIENT_SECRET = '',
} = process.env;

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET,
    }),
    GitHubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
    }),
    // LinkedInProvider({
    //   clientId: LINKEDIN_ID,
    //   clientSecret: LINKEDIN_SECRET,
    //   authorization: {
    //     params: {
    //       scope: 'r_liteprofile r_emailaddress',
    //     },
    //   },
    // }),
    // FacebookProvider({
    //   name: 'Meta',
    //   clientId: META_ID,
    //   clientSecret: META_SECRET,
    // }),
    // {
    //   id: 'amazon',
    //   name: 'Amazon',
    //   type: 'oauth',
    //   version: '2.0',
    //   accessTokenUrl: 'https://api.amazon.com/auth/o2/token',
    //   authorization: 'https://www.amazon.com/ap/oa?client_id={client_id}&scope=profile&response_type=code&redirect_uri={redirect_uri}',
    //   profileUrl: 'https://api.amazon.com/user/profile',
    //   profile: (profile: any) => ({
    //     id: profile.user_id,
    //     name: profile.name,
    //     email: profile.email,
    //     image: profile.picture,
    //   }),
    //   clientId: AMAZON_ID,
    //   clientSecret: AMAZON_SECRET,
    // },
    TwitterProvider({
      name: 'X',
      clientId: TWITTER_CLIENT_ID,
      clientSecret: TWITTER_CLIENT_SECRET,
    }),
    SlackProvider({
      name: 'Slack',
      clientId: SLACK_CLIENT_ID,
      clientSecret: SLACK_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.accessToken = typeof token.accessToken === 'string' ? token.accessToken : undefined;
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/sign-in',
    signOut: '/auth/sign-out',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/sign-up',
  },
});
