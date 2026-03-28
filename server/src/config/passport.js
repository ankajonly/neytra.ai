import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { env, isGoogleOAuthConfigured } from './env.js';
import { upsertGoogleUser } from '../services/auth.service.js';

export function configurePassport() {
  if (!isGoogleOAuthConfigured) {
    return passport;
  }

  passport.use(
    new GoogleStrategy(
      {
        clientID: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
        callbackURL: env.GOOGLE_CALLBACK_URL,
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const user = await upsertGoogleUser(profile);
          done(null, user);
        } catch (error) {
          done(error, null);
        }
      },
    ),
  );

  return passport;
}