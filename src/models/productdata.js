import { useState, useEffect } from 'react';
import { useFetch } from '@/components/Fetch/useFetch';
import { type } from './../.umi/plugin-access/access';

export default function productdata() {
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const [typeService, setTypeService] = useState([]);
  const [groupService, setGroupService] = useState([]);

  const UpdateGroupService = () => {
    useFetch(
      '/api/Defines/GetGroupService',
      'GET',
      '',
      null,

      setGroupService,

      (err) => {
        console.log(err);
      },
    );
  };

  const updateTypeService = () => {
    useFetch(
      '/api/Defines/GetTypeService',
      'GET',
      'application/json',
      null,
      setTypeService,
      (error) => {
        console.log(error);
      },
    );
  };
  useEffect(() => {
    UpdateGroupService();
    updateTypeService();
  }, []);

  return {
    groupService,
    UpdateGroupService,
    typeService,
    updateTypeService,
    category,
    product,
  };
}
