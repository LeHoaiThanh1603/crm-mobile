import { useState, useEffect, useRef } from 'react';
import { select } from '../Select';
import { label } from '../Label';
import { input } from '../Input';
import { useModel, useIntl } from 'umi';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './datePicker.less';
import calendarIcon from './assets/calendar.svg';
import { buttonList } from '../Button';
import moment from 'moment';
import { Switch } from '../Switch';

const DatePicker = ({ dateValue, onChange }) => {
  const format = 'DD/MM/YYYY';
  const systemDate = moment();
  const intl = useIntl();
  const today = new Date(systemDate);
  const [value, setValue] = useState([today, today]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [offsetLeft, setOffsetLeft] = useState(0);
  const [rangeValue, setRangeValue] = useState(
    intl.formatMessage({
      id: 'component.datepicker.range.today',
    }),
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [titleDate, setTitleDate] = useState();
  const dropDownRef = useRef();
  const datepickerRef = useRef();
  const firstTimeRef = useRef(true);
  const getDateFromNow = (dayNum) => {
    return new Date(systemDate).setDate(new Date(systemDate).getDate() - dayNum);
  };

  useEffect(() => {
    const onClick = (e) => {
      if (!dropDownRef.current?.contains(e.target)) {
        setIsPopupOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  useEffect(() => {
    if (isPopupOpen && firstTimeRef.current) {
      setOffsetLeft(datepickerRef.current?.getBoundingClientRect().left);
      firstTimeRef.current = false;
    }
  }, [isPopupOpen]);

  useEffect(() => {
    const find = rangeList.find(
      (item) =>
        moment(item.value[0]).format(format) == moment(dateValue[0]).format(format) &&
        moment(item.value[1]).format(format) == moment(dateValue[1]).format(format),
    );
    if (find) {
      setRangeValue(find.name);
      setTitleDate(find.name);
    } else {
      setTitleDate(
        rangeValue !== 'Custom'
          ? rangeValue
          : dateValue[0] == dateValue[1]
          ? moment(value[0]).format(format)
          : `${moment(value[0]).format(format)} - ${moment(value[1]).format(format)}`,
      );
    }
    if (dateValue) {
      setValue(
        dateValue.map((item) => {
          return new Date(item);
        }),
      );
    }
  }, [dateValue]);

  useEffect(() => {
    setStartDate(moment(value[0]).format(format));
    setEndDate(moment(value[1]).format(format));
    const find = rangeList.find(
      (item) =>
        moment(item.value[0]).format(format) == moment(value[0]).format(format) &&
        moment(item.value[1]).format(format) == moment(value[1]).format(format),
    );
    if (find) setRangeValue(find.name);
  }, [value]);

  const rangeList = [
    {
      name: intl.formatMessage({
        id: 'component.datepicker.range.today',
      }),
      onClick: () => {
        setValue([today, today]);
      },
      value: [today, today],
    },
    {
      name: intl.formatMessage({
        id: 'component.datepicker.range.tomorrow',
      }),
      onClick: () => {
        const tomorrow = new Date(getDateFromNow(-1));
        setValue([tomorrow, tomorrow]);
      },
      value: [new Date(getDateFromNow(-1)), new Date(getDateFromNow(-1))],
    },
    {
      name: intl.formatMessage({
        id: 'component.datepicker.range.next7days',
      }),
      onClick: () => {
        const startDate = new Date(getDateFromNow(0));
        const endDate = new Date(getDateFromNow(-7));
        setValue([startDate, endDate]);
      },
      value: [new Date(getDateFromNow(0)), new Date(getDateFromNow(-7))],
    },
    {
      name: intl.formatMessage({
        id: 'component.datepicker.range.next30days',
      }),
      onClick: () => {
        const startDate = new Date(getDateFromNow(0));
        const endDate = new Date(getDateFromNow(-30));
        setValue([startDate, endDate]);
      },
      value: [new Date(getDateFromNow(0)), new Date(getDateFromNow(-30))],
    },
    {
      name: intl.formatMessage({
        id: 'component.datepicker.range.yesterday',
      }),
      onClick: () => {
        const yesterday = new Date(getDateFromNow(1));
        setValue([yesterday, yesterday]);
      },
      value: [new Date(getDateFromNow(1)), new Date(getDateFromNow(1))],
    },
    {
      name: intl.formatMessage({
        id: 'component.datepicker.range.last7days',
      }),
      onClick: () => {
        const startDate = new Date(getDateFromNow(8));
        const endDate = new Date(getDateFromNow(1));
        setValue([startDate, endDate]);
      },
      value: [new Date(getDateFromNow(8)), new Date(getDateFromNow(1))],
    },
    {
      name: intl.formatMessage({
        id: 'component.datepicker.range.last30days',
      }),
      onClick: () => {
        const startDate = new Date(getDateFromNow(31));
        const endDate = new Date(getDateFromNow(1));
        setValue([startDate, endDate]);
      },
      value: [new Date(getDateFromNow(31)), new Date(getDateFromNow(1))],
    },
  ];
  return (
    <>
      <div className="position-relative" ref={dropDownRef}>
        <div
          className="d-flex align-items-center datepicker-component-toggle-button px-2 cursor-pointer"
          onClick={() => {
            setIsPopupOpen(!isPopupOpen);
          }}
        >
          <label.titlemd>{titleDate}</label.titlemd>
          <img src={calendarIcon} />
        </div>
        <div
          ref={datepickerRef}
          className={`position-absolute datepicker-content p-2 ${
            isPopupOpen ? 'd-block' : 'd-none'
          }`}
          style={{ right: offsetLeft < 0 ? 'unset' : '0%', left: offsetLeft < 0 ? '0%' : 'unset' }}
        >
          <div
            className="d-flex align-items-center justify-content-between"
            style={{ gap: '40px' }}
          >
            <div className="w-100">
              <label.titlelg>
                {intl.formatMessage({
                  id: 'component.datepicker.daterange',
                })}
              </label.titlelg>
              <select.group
                maxHeight="220px"
                allowClear={false}
                value={rangeValue}
                onChange={(value) => {
                  setRangeValue(value);
                }}
              >
                {rangeList.map((item) => {
                  return (
                    <select.option value={item.name} key={item.name} onOptionClick={item.onClick}>
                      {item.name}
                    </select.option>
                  );
                })}
                <select.option className="d-none" value="Custom">
                  {intl.formatMessage({
                    id: 'component.datepicker.range.custom',
                  })}
                </select.option>
              </select.group>
            </div>
          </div>
          <div
            className="d-flex align-items-center justify-content-between mt-2"
            style={{ gap: '40px' }}
          >
            <div className="w-50">
              <label.titlelg>
                {intl.formatMessage({
                  id: 'component.datepicker.starting',
                })}
              </label.titlelg>
              <input.medium
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setRangeValue('Custom');
                  const date = moment(e.target.value, format);
                  const dayOfMonth = date.date();
                  const month = date.month() + 1;
                  const year = date.year();
                  if (dayOfMonth && month && year && e.target.value.length == 10) {
                    if (date > value[1]) {
                      setValue([date.toDate(), date.toDate()]);
                    } else {
                      setValue([date.toDate(), value[1]]);
                    }
                  }
                }}
              ></input.medium>
            </div>
            <div className="w-50">
              <label.titlelg>
                {intl.formatMessage({
                  id: 'component.datepicker.ending',
                })}
              </label.titlelg>
              <input.medium
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setRangeValue('Custom');
                  const date = moment(e.target.value, format);
                  const dayOfMonth = date.date();
                  const month = date.month() + 1;
                  const year = date.year();
                  if (dayOfMonth && month && year && e.target.value.length == 10) {
                    if (date < value[0]) {
                      setValue([date.toDate(), date.toDate()]);
                    } else {
                      setValue([value[0], date.toDate()]);
                    }
                  }
                }}
              ></input.medium>
            </div>
          </div>
          <div className="mt-2" style={{ width: '525px' }}>
            <Calendar
              onClickDay={() => {
                setRangeValue('Custom');
              }}
              returnValue="range"
              onChange={(value) => {
                setValue([value[0], value[1]]);
              }}
              value={value}
              showFixedNumberOfWeeks={false}
              selectRange={true}
              showDoubleView={true}
              minDetail="month"
              showNeighboringMonth={false}
            />
          </div>
          <hr />
          <div className="d-flex align-items-center justify-content-end" style={{ gap: '10px' }}>
            <buttonList.cancel
              className="datepicker-button-cancel"
              onClick={() => {
                setValue(
                  dateValue.map((item) => {
                    return new Date(item);
                  }),
                );
                setIsPopupOpen(false);
              }}
            />
            <buttonList.normal
              onClick={() => {
                setIsPopupOpen(false);
                if (onChange) {
                  onChange(
                    moment(startDate, format).format('MM/DD/YYYY'),
                    moment(endDate, format).format('MM/DD/YYYY'),
                  );
                }
              }}
              title={intl.formatMessage({
                id: 'component.datepicker.apply',
              })}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export { DatePicker };
