import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../services/slices/userSlice';
import { toggleModal } from '../../services/slices/modalSlice';
import User from '../User/User';
import Modal from '../Modal/Modal';
import EditForm from '../EditForm/EditForm';
import styles from './Users.module.css';
import plusImg from '../../images/plus.png';
import arrow from '../../images/arrow.png';

function Users() {
  const dispatch = useDispatch();
  const { users } = useSelector((store) => store.user);
  const { modalOpened } = useSelector((store) => store.modal);
  const toggle = () => {
    dispatch(toggleModal());
  };
  console.log(users);
  React.useEffect(() => {
    dispatch(getUsers());
  }, []);
  return (
    <main className={styles.users__main}>
      <div className={styles.users__header}>
        <p className={styles.users__title}>Пользователи</p>
        <button className={styles['users__add-button']} type="button" onClick={toggle}>
          <p className={styles['users__button-text']}>Добавить нового пользователя</p>
          <img className={styles.users__image} src={plusImg} alt="" />
        </button>
      </div>
      <div className={styles.users__content}>
        <div className={styles.users__info}>
          <button type="button" className={styles['users__sort-button']}>
            <p className={styles['users__sort-button-text']}>Сортировать от А до Я</p>
            <img src={arrow} alt="" className={styles['users__image-arrow']} />
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
      {modalOpened && (
      <Modal title="Редактирование" onClose={toggle}>
        <EditForm />
      </Modal>
      )}
    </main>
  );
}

export default Users;
