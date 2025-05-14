import { useAuthStore } from '@/store/useAuthStore';

const BASE_URL = 'https://api.mocomoco.store';

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface FetchOptions extends RequestInit {
  isAuth?: boolean; //인증 필요 여부
  body?: any;
}

export const fetchClient = async (
  endpoint: string,
  method: Method,
  options: FetchOptions = {},
  params?: Record<string, any>,
): Promise<any> => {
  const { isAuth, headers, body, ...rest } = options;
  const { access, refresh, logout, setAuth } = useAuthStore.getState();

  if (isAuth && !access) throw new Error('로그인이 필요합니다');

  const queryString = params
    ? '?' + new URLSearchParams(params as Record<string, string>).toString()
    : '';

  const fetchWithToken = async (token: string | null) => {
    return await fetch(`${BASE_URL}${endpoint}${queryString}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(isAuth && token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      ...rest,
    });
  };

  let response = await fetchWithToken(access);

  // 액세스 토큰 만료 시 리프레시 시도
  if (response.status === 401 && isAuth && refresh) {
    const refreshed = await refreshAccessToken(refresh);
    if (refreshed) {
      const newAccess = useAuthStore.getState().access;
      response = await fetchWithToken(newAccess);
    } else {
      logout();
      window.location.href = '/auth/login';
      throw new Error('로그인이 만료되었습니다.');
    }
  }

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`API 요청 실패 (${response.status}): ${errorMessage}`);
  }

  const responseText = await response.text();
  try {
    return responseText ? JSON.parse(responseText) : null;
  } catch (e) {
    console.error('JSON 데이터 파싱 실패:', e);
    return null;
  }
};

// 리프레시 토큰으로 액세스 토큰 재발급
const refreshAccessToken = async (refresh: string): Promise<boolean> => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh }),
    });

    if (!response.ok) return false;

    const data = await response.json();
    console.log('액세스 토큰 갱신 성공:', data.access);
    const { access, refresh: newRefresh, user } = data;

    if (access && newRefresh && user) {
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', newRefresh);
      useAuthStore.getState().setAuth(access, newRefresh, user);
      return true;
    }

    return false;
  } catch (error) {
    console.error('리프레시 토큰 발급 실패:', error);
    console.error('토큰 갱신 실패:', error);
    return false;
  }
};
