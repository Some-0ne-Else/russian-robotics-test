import React from 'react';
import styles from './Users.module.css';
import plusImg from '../../images/plus.png';
import arrow from '../../images/arrow.png';

function Users() {
  return (
    <main className={styles.users__main}>
      <div className={styles.users__header}>
        <p className={styles.users__title}>Пользователи</p>
        <button className={styles.users__button} type="button">
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
          <p className={styles['users__user-counter']}>Всего пользователей: </p>
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
        </div>
      </div>
    </main>
  );
}

export default Users;
