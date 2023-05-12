import { useState, useEffect } from 'react';
import { useFetch } from '@/components/Fetch/useFetch';

export default function messagedata() {
  const [templateMessage, setTemplateMessage] = useState([]);
  const [language, setLanguage] = useState([]);
  const [ languageSetting, setLanguageSetting ] = useState([]);
  const [ actionType, setActionType ] = useState([]);

  const updateTemplateMessage = () => {
    useFetch(
      '/api/Defines/GetTemplateMessage',
      'GET',
      'application/json',
      null,
      setTemplateMessage,
      (error) => {
        console.log(error);
      },
    );
  };

  const updateLanguage = () => {
    useFetch(
      '/api/Defines/GetLanguageAdmin',
      'GET',
      'application/json',
      null,
      setLanguage,
      (error) => {
        console.log(error);
      },
    );
  };
  const updateLanguageSetting = () => {
    useFetch(
      '/api/Defines/GetLanguages',
      'GET',
      'application/json',
      null,
      setLanguageSetting,
      (error) => {
        console.log(error);
      },
    );
  };
  const updateActionType = () => {
    useFetch(
      '/api/Defines/GetActionType',
      'GET',
      'application/json',
      null,
      setActionType,
      (error) => {
        console.log(error);
      },
    );
  };

  useEffect(() => {
    updateLanguage();
    updateTemplateMessage();
    updateLanguageSetting();
    updateActionType();
  }, []);

  return {
    templateMessage,
    updateTemplateMessage,
    language,
    updateLanguage,
    updateLanguageSetting,
    languageSetting,
    actionType,
    updateActionType
  };
}
