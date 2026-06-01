import { API_BASE_URL } from './api';
import { clearSession, getRefreshToken, updateAccessToken } from './StudentData';

export async function fetchWithAuth(url, options = {}) {
  let token = await getToken();

  // First attempt
  let response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  // If 401, try silent refresh
  if (response.status === 401) {
    const refreshToken = await getRefreshToken();

    if (!refreshToken) {
      // No refresh token (rememberMe was false) → force logout
      await clearSession();
      return response;
    }

    const refreshResponse = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!refreshResponse.ok) {
      // Refresh token expired or invalid → force logout
      await clearSession();
      return response;
    }

    const refreshData = await refreshResponse.json();
    await updateAccessToken(refreshData.accessToken);

    // Retry original request with new token
    response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshData.accessToken}`,
      },
    });
  }

  return response;
}