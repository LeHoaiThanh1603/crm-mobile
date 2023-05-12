import moment from 'moment';
import React from 'react';

export default function FormatDate({ date }) {
  // const dateString = date;
  // const dateFormat = 'YYYY-MM-DDTHH:mm';
  // const systemTimeZone = moment.tz.guess();
  // const vietnamTime = moment.tz(dateString, dateFormat, systemTimeZone).tz('Asia/Ho_Chi_Minh');
  // const vietnamTimePlus7h = vietnamTime.add(7, 'hours');
  // const outputFormat = 'YYYY-MM-DD HH:mm';
  // const vietnamTimeString = vietnamTime.format(outputFormat);

  return <>{moment(date).format('LT')}</>;
}
