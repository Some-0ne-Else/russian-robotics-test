import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import { toggleModal } from '../../services/slices/modalSlice';
import { selectUser } from '../../services/slices/userSlice';
import styles from './User.module.css';

function User({
  // eslint-disable-next-line no-unused-vars
  id,
  number,
  surname,
  name,
  middleName,
  role,
  birthday,
  birthPlace,
  email,
  phoneNumber,
  registerDate,
  lastUpdate,
}) {
  const dispatch = useDispatch();
  const handleEdit = () => {
    dispatch(toggleModal());
    dispatch(selectUser(id));
  };
  return (
    <>
      <p className={`${styles.user__text} ${styles.user__text_rounded}`}>{`${number} ${surname} ${name.slice(0, 1)}. ${middleName.slice(0, 1)}.`}</p>
      <p className={styles.user__text}>{format(parseISO(birthday), 'dd.MM.uu')}</p>
      <p className={styles.user__text}>{role}</p>
      <p className={styles.user__text}>{birthPlace}</p>
      <p className={styles.user__text}>{email}</p>
      <p className={styles.user__text}>{phoneNumber}</p>
      <p className={styles.user__text}>{format(parseISO(registerDate), 'dd.MM.uu')}</p>
      <p className={styles.user__text}>{format(parseISO(lastUpdate), 'dd.MM.yy')}</p>
      <button aria-label="edit" type="button" className={styles['user__button-edit']} onClick={handleEdit} />
      <button aria-label="delete" type="button" className={styles['user__button-delete']} />
    </>
  );
}

User.propTypes = {
  id: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  surname: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  middleName: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  birthday: PropTypes.string.isRequired,
  birthPlace: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  registerDate: PropTypes.string.isRequired,
  lastUpdate: PropTypes.string.isRequired,
};
export default User;
