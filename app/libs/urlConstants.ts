const appVersion = 'api/';

const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:3000/';

export const URLConsatnts = {
  userRegistrationApiUrl: backendBaseUrl + appVersion + 'auth/register/user',
  selllerRegistrationApiUrl: backendBaseUrl + appVersion + 'auth/register/seller',
};