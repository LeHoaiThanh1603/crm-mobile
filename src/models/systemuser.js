import { useState, useCallback, useEffect } from 'react';
import { useFetch } from '@/components/Fetch/useFetch';
import Cookies from 'js-cookie';

export default function systemuser() {
  const [systemUser, setSystemUser] = useState(null);
  const [settingUser, setSettingUser] = useState(null);
  const updateSystemUser = () => {
    if (Cookies.get('userlogin')) {
      let encrypt = JSON.parse(Cookies.get('userlogin'));
      setSystemUser(encrypt);
      getSettingUser(encrypt);
    }
  };
  const getSettingUser = (encrypt) => {
    let data = new FormData();
    data.append('username', encrypt.ssid);

    useFetch('/api/User/GetSettingOfUser', 'POST', '', data, setSettingUser, (error) => {
      console.log(error);
    });
  };
  const updateSettingUser = (id, value) => {
    let data = {
      username: systemUser.ssid,
      id: id,
      value: value,
    };

    useFetch(
      '/api/User/CreateOrUpdateSettingOfUser',
      'POST',
      'application/json',
      JSON.stringify(data),
      (res) => {
        if (res.success == 1) {
          getSettingUser(systemUser);
        } else console.log(res);
      },
      (error) => console.log(error),
    );
  };

  useEffect(() => {
    updateSystemUser();
  }, []);

  return {
    settingUser,
    updateSettingUser,
    systemUser,
    updateSystemUser,
  };
}
