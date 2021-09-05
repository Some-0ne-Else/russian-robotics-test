import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, deleteUser } from '../../services/slices/userSlice';
import { toggleModal } from '../../services/slices/modalSlice';
import { DELETE_TYPE } from '../../utils/constants';
import styles from './DeleteForm.module.css';

function DeleteForm() {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);

  const handleDelete = () => {
    dispatch(deleteUser({ id: selectedUser.id }))
      .then(() => dispatch((getUsers())));
    dispatch(toggleModal(DELETE_TYPE));
  };

  const handleClose = () => {
    dispatch(toggleModal(DELETE_TYPE));
  };
  return (
    <div className={styles['delete-form']}>
      <p className={styles['delete-form__text']}>
        Удалить пользователя &quot;
        <span className={styles['delete-form__user']}>{`${selectedUser.surname} ${selectedUser.name} ${selectedUser.middleName}`}</span>
        &quot;?
      </p>
      <div className={styles['delete-form__button-wrapper']}>
        <button type="button" className={styles['delete-form__button']} onClick={handleDelete}>
          Да
        </button>
        <button type="button" className={styles['delete-form__button']} onClick={handleClose}>
          Нет
        </button>
      </div>
    </div>
  );
}
export default DeleteForm;
