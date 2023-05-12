import { useState, useEffect } from 'react';
import { useFetch } from '@/components/Fetch/useFetch';

export default function companydata() {
  const [sourceCode, setSourceCode] = useState([]);
  const [margetSegment, setMargetSegment] = useState([]);
  const [companyType, setCompanyType] = useState([]);
  const [companyIndustry, setCompanyIndustry] = useState([]);
  const [branch, setBranch] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [booker, setBooker] = useState([]);
  const [company, setCompany] = useState([]);
  const [rateCode, setRateCode] = useState([]);

  const updateSourceCode = () => {
    useFetch(
      '/api/Company/GetSourceCode',
      'GET',
      'application/json',
      null,
      setSourceCode,
      (error) => {
        console.log(error);
      },
    );
  };

  const updateMarketSegment = () => {
    useFetch(
      '/api/Company/GetMarketSegment',
      'GET',
      'application/json',
      null,
      setMargetSegment,
      (error) => {
        console.log(error);
      },
    );
  };

  const updateCompanyType = () => {
    useFetch(
      '/api/Company/GetCompanyType',
      'GET',
      'application/json',
      null,
      setCompanyType,
      (error) => {
        console.log(error);
      },
    );
  };

  const updateCompanyIndustry = () => {
    useFetch(
      '/api/Company/GetCompanyIndustry',
      'GET',
      'application/json',
      null,
      setCompanyIndustry,
      (error) => {
        console.log(error);
      },
    );
  };

  const updateCompany = () => {
    useFetch(
      '/api/Company/GetAllCompany',
      'POST',
      'application/json',
      null,
      setCompany,
      (error) => {
        console.log(error);
      },
    );
  };

  const updateBranch = () => {
    useFetch('/api/Company/GetBranch', 'GET', 'application/json', null, setBranch, (error) => {
      console.log(error);
    });
  };

  const updateBooker = () => {
    useFetch('/api/Company/GetBooker', 'GET', 'application/json', null, setBooker, (error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    updateCompany();
    updateSourceCode();
    updateMarketSegment();
    updateCompanyType();
    updateCompanyIndustry();
    updateBranch();
    updateBooker();
    updatePaymentMethod();
  }, []);

  const updatePaymentMethod = () => {
    useFetch(
      '/api/Defines/GetPaymentMethod',
      'GET',
      'application/json',
      null,
      setPaymentMethod,
      (error) => {
        console.log(error);
      },
    );
  };

  return {
    sourceCode,
    updateSourceCode,
    margetSegment,
    updateMarketSegment,
    companyType,
    updateCompanyType,
    companyIndustry,
    updateCompanyIndustry,
    branch,
    updateBranch,
    booker,
    updateBooker,
    paymentMethod,
    updatePaymentMethod,
    company,
    updateCompany,
    rateCode
  };
}
