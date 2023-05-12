import { getListAdCampaign, getListGroups, getListUsers,getGroupDetail } from '@/untils/request';
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [dataView, setDataView] = useState([]);
  const [guess, setGuess] = useState([]);
  const [selected, setSelected] = useState([]);
  const [action, setAction] = useState('');
  const [unConfirmedGuess, setUnConfirmedGuess] = useState([]);
  const [maKhach, setMaKhach] = useState([]);
  const [guessInGroup, setGuessInGroup] = useState([]);
  const codes = useRef();
  const idDetail = useRef('');

  const [adCampaign, setAdCampaign] = useState([]); //danh sách adCampaign
  const [openView, setOpenView] = useState(false); //
  const [closeUpdate, setCloseUpdate] = useState(false);
  const [switched, setSwitched] = useState(true);

  useEffect(() => {
    getListGroups().then((res) => setData(res.data));
    getGroupDetail().then((res) => setDataView(res.dataView));
    getListUsers().then((res) => setGuess(res.data));
    getListAdCampaign().then((res) => setAdCampaign(res.data));
  }, []);

  useEffect(() => {
    const test = guess.filter((item) => maKhach.indexOf(item.maKhach) !== -1);
    setGuessInGroup(test);
  }, [maKhach]);

  useEffect(() => {
    // console.log(maKhach)
    if (action === 'Edit') {
      unConfirmedGuess
        ? (codes.current = unConfirmedGuess
            .reduce((acc, val) => [...acc, val.maKhach], [])
            .toString())
        : '';
    }
  }, [guessInGroup]);

  return (
    <StateContext.Provider
      value={{
        data,
        setData, 
        dataView,
        setDataView,
        guess,
        setGuess,
        unConfirmedGuess,
        setUnConfirmedGuess,
        action,
        setAction,
        maKhach,
        setMaKhach,
        guessInGroup,
        setGuessInGroup,
        codes,
        idDetail,
        adCampaign,
        setAdCampaign,
        openView,
        setOpenView,
        closeUpdate,
        setCloseUpdate,
        adCampaign,
        setAdCampaign,
        selected,
        setSelected,
        switched,
        setSwitched,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
