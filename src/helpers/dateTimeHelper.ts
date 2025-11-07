import moment from 'moment';

export const getDateFromFirestoreTimestamp = (firestoreDateObj: any) => {
  const date = new Date(firestoreDateObj.seconds * 1000);
  return moment(date).format('MMMM Do, hh:mm A');
}