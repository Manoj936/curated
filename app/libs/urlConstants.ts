const appVersion = 'api/';

const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:3000/';

export const URLConsatnts = {
RegistrationApiUrl: backendBaseUrl + appVersion + 'auth/register',
EbookApiUrl: backendBaseUrl + appVersion + 'ebook/',
};