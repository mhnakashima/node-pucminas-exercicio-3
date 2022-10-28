import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Profile {
    extension_accountids: string;
  }
  interface Session {
    user: App.TUser;
    accessToken: string;
    userId: string;
  }
}
declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    accessTokenExpires?: number;
    refreshToken?: string;
    accountIds?: string[];
  }
}
