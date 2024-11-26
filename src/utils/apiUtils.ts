import axios, { Method, AxiosResponse } from 'axios';

interface ApiRequestParams {
  url: string;
  method?: Method;
  data?: Record<string, any>;
  headers?: Record<string, string>;
  withAuth?: boolean; // Authorization 포함 여부
}
/**
 * 인증이 필요한 요청
 * apiUtils({
   url: ALL_USER,
   method: 'GET',
  });
 * 인증이 필요없는 요청
 *  apiUtils({
    url:  SIGNUP,
    method: 'POST',
    data: { nickName:{nickName},password:{password}~~~...},
    withAuth: false, // 인증 헤더 제외
  });
 * 
 */
const apiUtils = async <T = any>({
  url,
  method = 'GET',
  data = {},
  headers = {},
  withAuth = true,
}: ApiRequestParams): Promise<T> => {
  const token = withAuth ? localStorage.getItem('token') : null;
  const response: AxiosResponse<T> = await axios({
    url,
    method,
    data,
    headers: {
      'Content-Type': 'application/json',
      ...(withAuth && token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers, // content-type, authorization 외 헤더와 병합하기 위함
    },
  });
  return response.data;
};

export default apiUtils;
