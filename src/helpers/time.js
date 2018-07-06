import moment from 'moment';

export const now = () => moment().format('YYYY-MM-DD HH:mm:ss');

export const timestamp = (date) => moment(date).format('YYYY-MM-DD HH:mm:ss');

export const getTimeFormatForMoment = (value) => {
    return `${moment().format('YYYY-MM-DD')}T${value}`;
};