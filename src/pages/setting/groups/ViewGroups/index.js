import * as React from 'react';
import { useState, useEffect } from 'react';
import { getGroupDetail } from '@/untils/request';
const { ContextProvider } = require('../context/ContextProvider');
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons';
import { useIntl, useModel } from 'umi';

const useStyles = makeStyles({
  root: {
    '& .MuiTableStickyHeader': {
      position: 'sticky',
      top: 0,
      zIndex: 1,
      backgroundColor: '#fff',
      '& th': {
        fontWeight: 'bold',
      },
    },
  },
});


function ViewGroups(props) {
  const intl = useIntl();
  const { id } = props;
  const [itemView, setItemView] = useState({});
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getGroupDetail(id);
        setItemView(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [id]);
  const classes = useStyles();

  return (
    <div style={{ paddingTop: '170px' }}>
      <h2 style={{ borderBottom: '1px solid #ccc' }}>{intl.formatMessage({ id: 'pages.setting.groups.titleView' })}</h2>
      <div>
        <div className="mb">
          <span className="tb">2.{intl.formatMessage({ id: 'pages.setting.groups.nameGroupView' })}: </span>
          <span>{itemView.name}</span>
        </div>
        <div className="mb">
          <span className="tb">3.{intl.formatMessage({ id: 'pages.setting.groups.descriptionGroupView' })}: </span>
          <span>{itemView.description}</span>
        </div>
        <div className="mb">
          <span className="tb">4.{intl.formatMessage({ id: 'pages.setting.groups.infoTagsGroup' })}: </span>
          <span>{itemView.conditionInfo}</span>
        </div>
        {/* <div className="mb">
          <span className="tb">5. {intl.formatMessage({ id: 'pages.setting.groups.listCustomerGroup' })}: </span>
          {itemView.listKhach && itemView.listKhach.length > 0 ? (
            <TableContainer className={classes.root} component="div" style={{ height: 580 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>{intl.formatMessage({ id: 'pages.setting.groups.listCustomerGroupStt' })}</TableCell>
                    <TableCell>{intl.formatMessage({ id: 'pages.setting.groups.listCustomerGroupName' })}</TableCell>
                    <TableCell>{intl.formatMessage({ id: 'pages.setting.groups.listCustomerGroupPhone' })}</TableCell>
                    <TableCell>{intl.formatMessage({ id: 'pages.setting.groups.listCustomerGroupEmail' })}</TableCell>
                    <TableCell>{intl.formatMessage({ id: 'pages.setting.groups.listCustomerGroupIDGroup' })}</TableCell>
                    <TableCell>{intl.formatMessage({ id: 'pages.setting.groups.listCustomerGroupIDCustomer' })}</TableCell>
                    <TableCell>{intl.formatMessage({ id: 'pages.setting.groups.listCustomerGroupTime' })}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {itemView.listKhach.map((listKhach, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{listKhach.ten}</TableCell>
                      <TableCell>{listKhach.dienthoai}</TableCell>
                      <TableCell>{listKhach.email}</TableCell>
                      <TableCell>{listKhach.idGroup}</TableCell>
                      <TableCell>{listKhach.idKhach}</TableCell>
                      <TableCell>{listKhach.dateAdded}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <span>Nhóm chưa có khách hàng.</span>
          )}
        </div> */}
      </div>
    </div>
  );
}

export default ViewGroups;
