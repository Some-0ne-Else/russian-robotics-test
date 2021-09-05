import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
// import { format, parseISO } from 'date-fns';
import NumberFormat from 'react-number-format';
import { getUsers, getRoles, createUser } from '../../services/slices/userSlice';
import { toggleModal } from '../../services/slices/modalSlice';
import { ADD_TYPE } from '../../utils/constants';
import styles from './AddForm.module.css';

function AddForm() {
  const dispatch = useDispatch();
  const { roles } = useSelector((store) => store.user);
  const {
    register,
    handleSubmit,
    formState,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
    },
  });

  const [selectValue, setSelectValue] = React.useState('');
  const role = register('roleId', { required: true });
  const handleChange = (e) => {
    setValue('roleId', e.target.value, { shouldValidate: true });
    setSelectValue(e.target.value);
  };
  const onSubmit = (data) => {
    const now = new Date();
    data.registerDate = now;
    data.lastUpdate = now;
    dispatch(createUser(data));
    dispatch((getUsers()));
    dispatch(toggleModal(ADD_TYPE));
  };
  React.useEffect(() => {
    dispatch(getRoles());
  }, []);
  return (
    <form className={styles['add-form']} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles['add-form__input-wrapper']}>
        <p className={styles['add-form__input-caption']}>Имя</p>
        <input
          placeholder="Имя"
          {...register('name', { required: true })}
          className={styles['add-form__input']}
        />
        {errors.name && <span className={styles['add-form__input-error']}>Это поле обязательно</span>}
      </div>
      <div className={styles['add-form__input-wrapper']}>
        <p className={styles['add-form__input-caption']}>Фамилия</p>
        <input
          placeholder="Фамилия"
          {...register('surname', { required: true })}
          className={styles['add-form__input']}
        />
        {errors.surname && <span className={styles['add-form__input-error']}>Это поле обязательно</span>}
      </div>
      <div className={styles['add-form__input-wrapper']}>
        <p className={styles['add-form__input-caption']}>Отчество</p>
        <input
          placeholder="Отчество"
          {...register('middleName', { required: true })}
          className={styles['add-form__input']}
        />
        {errors.middleName && <span className={styles['add-form__input-error']}>Это поле обязательно</span>}
      </div>
      <div className={styles['add-form__input-wrapper']}>
        <p className={styles['add-form__input-caption']}>Роль</p>
        <select
          placeholder="Роль"
          value={selectValue}
          onBlur={role.onBlur}
          ref={role.ref}
          onChange={(e) => handleChange(e)}
          className={styles['add-form__select']}
        >
          {roles?.collection?.map((el) => (
            <option key={el.id} value={el.id}>{el.title}</option>
          ))}
        </select>
        {errors.roleId && <span className={styles['add-form__input-error']}>Это поле обязательно</span>}
      </div>
      <div className={styles['add-form__input-wrapper']}>
        <p className={styles['add-form__input-caption']}>Дата рождения</p>
        <input
          type="date"
          {...register('birthday', { required: true })}
          className={styles['add-form__input']}
        />
        {errors.birthday && <span className={styles['add-form__input-error']}>Это поле обязательно</span>}
      </div>
      <div className={styles['add-form__input-wrapper']}>
        <p className={styles['add-form__input-caption']}>Место рождения</p>
        <input
          placeholder="Место рождения"
          {...register('birthPlace', { required: true })}
          className={styles['add-form__input']}
        />
        {errors.birthPlace && <span className={styles['add-form__input-error']}>Это поле обязательно</span>}
      </div>
      <div className={styles['add-form__input-wrapper']}>
        <p className={styles['add-form__input-caption']}>Email</p>
        <input
          placeholder="name@domain.com"
          {...register('email')}
          className={`${styles['add-form__input']} ${styles['add-form__input_email']}`}
        />
      </div>
      <div className={styles['add-form__input-wrapper']}>
        <p className={styles['add-form__input-caption']}>Номер телефона</p>
        <Controller
          render={({ field: { onChange, value } }) => (
            <NumberFormat
              format="+# (###)-###-##-##"
              placeholder="+7(111)-123-44-55"
              mask="_"
              onChange={onChange}
              value={value}
              className={styles['add-form__input']}
            />
          )}
          control={control}
          name="phoneNumber"
          rules={{ required: true }}
        />
        {errors.phoneNumber && <span className={styles['add-form__input-error']}>Это поле обязательно</span>}
      </div>
      <div className={styles['add-form__date-wrapper']}>
        <div className={styles['add-form__input-wrapper']}>
          <p className={styles['add-form__input-caption']}>Дата регистрации</p>
          <input
            readOnly
            type="date"
            placeholder="01.01.2000"
            {...register('registerDate')}
            className={`${styles['add-form__input']} ${styles['add-form__input_short']}`}
          />
        </div>
        <div className={styles['add-form__input-wrapper']}>
          <p className={styles['add-form__input-caption']}>Последнее изменение</p>
          <input
            readOnly
            type="date"
            placeholder="01.01.2000"
            {...register('lastUpdate')}
            className={`${styles['add-form__input']} ${styles['add-form__input_short']}`}
          />
        </div>
      </div>
      <button type="submit" disabled={formState.isSubmitting} className={styles['add-form__submit-button']}>
        Создать пользователя
      </button>
    </form>
  );
}
export default AddForm;
