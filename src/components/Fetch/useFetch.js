import Cookies from 'js-cookie';
import { URL_API } from '@/e2e/configSystem';

export function useFetch(url, method, contentType, data, callBackSuccess, callBackError) {
  let ssid = '';
  if (Cookies.get('userlogin')) {
    let encrypt = JSON.parse(Cookies.get('userlogin'));
    ssid = encrypt.ssid;
  }

  let header = {
    Authorization: 'Basic ' + btoa('Ds7C2xG+BVHPAvUON5VijQ==:JDfmfXQvuqHrXBdUARcoLw=='),
    'Content-Type': contentType
  };
  if (contentType == '' || contentType == null) {
    header = {
      Authorization: 'Basic ' + btoa('Ds7C2xG+BVHPAvUON5VijQ==:JDfmfXQvuqHrXBdUARcoLw==')
    };
  }

  header = {
    ...header,
    'UserEncrypt': ssid
  }

  fetch(URL_API + url, {
    method: method,
    headers: header,
    body: data,
  })
    .then(async (res) => {
      if (res.ok) {
        return res.json()
      }
      else {
        let result = await res.json();
        callBackError(result);
        throw new Error(`Error status: ${res.status}`);
      }
    })
    .then(
      (res) => callBackSuccess(res)
    )
    .catch((err) => {});
}
