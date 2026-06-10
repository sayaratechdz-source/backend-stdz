module.exports = ({ env }) => ({

  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },

  // Disable temporarily
  'import-export-entries': {
    enabled: false,
  },

  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '7d',
      },
      providers: {
        google: {
          enabled: env.bool('GOOGLE_ENABLED', false),
          key: env('GOOGLE_CLIENT_ID', ''),
          secret: env('GOOGLE_CLIENT_SECRET', ''),
          callbackURL: env('GOOGLE_REDIRECT_URI', ''),
          scope: ['email', 'profile'],
        },
        facebook: {
          enabled: env.bool('FACEBOOK_ENABLED', false),
          key: env('FACEBOOK_APP_ID', ''),
          secret: env('FACEBOOK_APP_SECRET', ''),
          callbackURL: env('FACEBOOK_REDIRECT_URI', ''),
          scope: ['email', 'public_profile'],
        },
      },
    },
  },

});