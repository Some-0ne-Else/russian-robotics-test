/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import { getRoles } from '../../services/slices/userSlice';
import styles from './EditForm.module.css';

function EditForm() {
  const dispatch = useDispatch();
  const { roles } = useSelector((store) => store.user);
  const { selectedUser } = useSelector((store) => store.user);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    // reValidateMode: 'onBlur',
    // mode: 'onTouched',
  });
  const onSubmit = (data) => console.log(data);
  React.useEffect(() => {
    dispatch(getRoles());
  }, []);
  return (
    <form className={styles['edit-form']} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles['edit-form__input-wrapper']}>
        <p className={styles['edit-form__input-caption']}>Имя</p>
        <input
          placeholder="Имя"
          defaultValue={selectedUser.name}
          {...register('name', { required: true })}
          className={styles['edit-form__input']}
        />
        {errors.name && <span className={styles['edit-form__input-error']}>Это поле обязательно</span>}
      </div>
      <div className={styles['edit-form__input-wrapper']}>
        <p className={styles['edit-form__input-caption']}>Фамилия</p>
        <input
          placeholder="Фамилия"
          defaultValue={selectedUser.surname}
          {...register('surname', { required: true })}
          className={styles['edit-form__input']}
        />
        {errors.surname && <span className={styles['edit-form__input-error']}>Это поле обязательно</span>}
      </div>
      <div className={styles['edit-form__input-wrapper']}>
        <p className={styles['edit-form__input-caption']}>Отчество</p>
        <input
          placeholder="Отчество"
          defaultValue={selectedUser.middleName}
          {...register('middleName', { required: true })}
          className={styles['edit-form__input']}
        />
        {errors.middleName && <span className={styles['edit-form__input-error']}>Это поле обязательно</span>}
      </div>
      <div className={styles['edit-form__input-wrapper']}>
        <p className={styles['edit-form__input-caption']}>Роль</p>
        <select
          placeholder="Роль"
          defaultValue={selectedUser.role.id}
          {...register('role', { required: true })}
          className={styles['edit-form__select']}
        >
          {roles?.collection?.map((el) => (
            <option key={el.id} value={el.id}>{el.title}</option>
          ))}
        </select>
      </div>
      <div className={styles['edit-form__input-wrapper']}>
        <p className={styles['edit-form__input-caption']}>Дата рождения</p>
        <input
          type="date"
          {...register('birthday', { required: true })}
          className={styles['edit-form__input']}
        />
        {errors.birthday && <span className={styles['edit-form__input-error']}>Это поле обязательно</span>}
      </div>
      <div className={styles['edit-form__input-wrapper']}>
        <p className={styles['edit-form__input-caption']}>Место рождения</p>
        <input
          placeholder="Место рождения"
          {...register('birthPlace', { required: true })}
          className={styles['edit-form__input']}
        />
        {errors.birthPlace && <span className={styles['edit-form__input-error']}>Это поле обязательно</span>}
      </div>
      <div className={styles['edit-form__input-wrapper']}>
        <p className={styles['edit-form__input-caption']} />
        <input
          disabled
          placeholder="name@domain.com"
          {...register('email')}
          className={`${styles['edit-form__input']} ${styles['edit-form__input_email']}`}
        />
      </div>
      <div className={styles['edit-form__input-wrapper']}>
        <p className={styles['edit-form__input-caption']}>Номер телефона</p>
        <Controller
          render={({ field: { onChange, value } }) => (
            <NumberFormat
              format="+7 (###)-###-##-##"
              mask="_"
              onChange={onChange}
              value={value}
              className={styles['edit-form__input']}
            />
          )}
          control={control}
          name="phoneNumber"
          rules={{ required: true }}
        />
        {errors.phoneNumber && <span className={styles['edit-form__input-error']}>Это поле обязательно</span>}
      </div>
      <div className={styles['edit-form__date-wrapper']}>
        <div className={styles['edit-form__input-wrapper']}>
          <p className={styles['edit-form__input-caption']}>Дата регистрации</p>
          <input
            disabled
            placeholder="01.01.2000"
            {...register('registerDate')}
            className={`${styles['edit-form__input']} ${styles['edit-form__input_short']}`}
          />
        </div>
        <div className={styles['edit-form__input-wrapper']}>
          <p className={styles['edit-form__input-caption']}>Последнее изменение</p>
          <input
            disabled
            placeholder="01.01.2000"
            {...register('registerDate')}
            className={`${styles['edit-form__input']} ${styles['edit-form__input_short']}`}
          />
        </div>
      </div>
      <button type="submit" className={styles['edit-form__submit-button']}>
        Сохранить изменения в профиле
      </button>
    </form>
  );
}
export default EditForm;
