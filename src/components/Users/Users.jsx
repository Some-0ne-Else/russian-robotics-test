import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, sortUsers } from '../../services/slices/userSlice';
import { toggleModal } from '../../services/slices/modalSlice';
import User from '../User/User';
import Modal from '../Modal/Modal';
import AddForm from '../AddForm/AddForm';
import EditForm from '../EditForm/EditForm';
import DeleteForm from '../DeleteForm/DeleteForm';
import { ADD_TYPE, EDIT_TYPE, DELETE_TYPE } from '../../utils/constants';
import styles from './Users.module.css';
import plusImg from '../../images/plus.png';
import arrowUp from '../../images/arrowUp.png';
import arrowDown from '../../images/arrowDown.png';

function Users() {
  const dispatch = useDispatch();
  const { users, sortedAsc } = useSelector((store) => store.user);
  const {
    addModalOpened,
    editModalOpened,
    deleteModalOpened,
  } = useSelector((store) => store.modal);
  const toggle = (type) => {
    dispatch(toggleModal(type));
  };
  const sortToggle = () => {
    dispatch(sortUsers());
  };
  React.useEffect(() => {
    dispatch(getUsers());
  }, []);
  return (
    <main className={styles.users__main}>
      <div className={styles.users__header}>
        <p className={styles.users__title}>Пользователи</p>
        <button className={styles['users__add-button']} type="button" onClick={() => toggle(ADD_TYPE)}>
          <p className={styles['users__button-text']}>Добавить нового пользователя</p>
          <img className={styles.users__image} src={plusImg} alt="" />
        </button>
      </div>
      <div className={styles.users__content}>
        <div className={styles.users__info}>
          <button type="button" className={styles['users__sort-button']} onClick={sortToggle}>
            <p className={styles['users__sort-button-text']}>Сортировать от А до Я</p>
            {sortedAsc ? (<img src={arrowUp} alt="" className={styles['users__image-arrow']} />)
              : (<img src={arrowDown} alt="" className={styles['users__image-arrow']} />)}
          </button>
          <p className={styles['users__user-counter']}>{`Всего пользователей: ${users.total}`}</p>
        </div>
        <div className={styles.users__table}>
          <p className={styles['users__table-caption']}>№ ФИО пользователя</p>
          <p className={styles['users__table-caption']}>Роль</p>
          <p className={styles['users__table-caption']}>Дата рождения</p>
          <p className={styles['users__table-caption']}>Место рождения</p>
          <p className={styles['users__table-caption']}>Почта</p>
          <p className={styles['users__table-caption']}>Телефон</p>
          <p className={styles['users__table-caption']}>Регистрации</p>
          <p className={styles['users__table-caption']}>Изменение</p>
          <p className={styles['users__table-caption']}>ред.</p>
          <p className={styles['users__table-caption']}>удалить</p>
          {users?.collection?.map((user, index) => (
            <User
              key={user.id}
              id={user.id}
              number={index + 1}
              surname={user.surname}
              name={user.name}
              middleName={user.middleName}
              role={user.role.title}
              birthday={user.birthday}
              birthPlace={user.birthPlace}
              email={user.email}
              phoneNumber={user.phoneNumber}
              registerDate={user.registerDate}
              lastUpdate={user.lastUpdate}
            />
          ))}
        </div>
      </div>
      {addModalOpened && (
      <Modal title="Создание" onClose={() => toggle(ADD_TYPE)}>
        <AddForm />
      </Modal>
      )}
      {editModalOpened && (
      <Modal title="Редактирование" onClose={() => toggle(EDIT_TYPE)}>
        <EditForm />
      </Modal>
      )}
      {deleteModalOpened && (
      <Modal title="Удаление" onClose={() => toggle(DELETE_TYPE)}>
        <DeleteForm />
      </Modal>
      )}
    </main>
  );
}

export default Users;
