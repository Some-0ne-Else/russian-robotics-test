import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { format, parseISO } from 'date-fns';
import NumberFormat from 'react-number-format';
import { getUsers, getRoles, updateUser } from '../../services/slices/userSlice';
import { toggleModal } from '../../services/slices/modalSlice';
import { EDIT_TYPE } from '../../utils/constants';
import styles from './EditForm.module.css';

function EditForm() {
  const dispatch = useDispatch();
  const { roles } = useSelector((store) => store.user);
  const { selectedUser } = useSelector((store) => store.user);
  const {
    register,
    handleSubmit,
    formState,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: selectedUser.name,
      surname: selectedUser.surname,
      middleName: selectedUser.middleName,
      roleId: selectedUser.role.id,
      birthday: format(parseISO(selectedUser.birthday), 'uu-MM-dd'),
      birthPlace: selectedUser.birthPlace,
      email: selectedUser.email,
      phoneNumber: selectedUser.phoneNumber,
      registerDate: format(parseISO(selectedUser.registerDate), 'uu-MM-dd'),
      lastUpdate: format(parseISO(selectedUser.lastUpdate), 'uu-MM-dd'),
    },
  });
  const [selectValue, setSelectValue] = React.useState(selectedUser.role.id);
  const handleChange = (e) => {
    setValue('roleId', e.target.value, { shouldValidate: true });
    setSelectValue(e.target.value);
  };
  const onSubmit = (data) => {
    data.id = selectedUser.id;
    data.lastUpdate = new Date();
    dispatch(updateUser(data))
      .then(() => dispatch((getUsers())));
    dispatch(toggleModal(EDIT_TYPE));
  };
  React.useEffect(() => {
    dispatch(getRoles());
  }, []);
  return (
    <form className={styles['edit-form']} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles['edit-form__input-wrapper']}>
        <p className={styles['edit-form__input-caption']}>Имя</p>
        <input
          placeholder="Имя"
          {...register('name', { required: true })}
          className={styles['edit-form__input']}
        />
        {errors.name && <span className={styles['edit-form__input-error']}>Это поле обязательно</span>}
      </div>
      <div className={styles['edit-form__input-wrapper']}>
        <p className={styles['edit-form__input-caption']}>Фамилия</p>
        <input
          placeholder="Фамилия"
          {...register('surname', { required: true })}
          className={styles['edit-form__input']}
        />
        {errors.surname && <span className={styles['edit-form__input-error']}>Это поле обязательно</span>}
      </div>
      <div className={styles['edit-form__input-wrapper']}>
        <p className={styles['edit-form__input-caption']}>Отчество</p>
        <input
          placeholder="Отчество"
          {...register('middleName', { required: true })}
          className={styles['edit-form__input']}
        />
        {errors.middleName && <span className={styles['edit-form__input-error']}>Это поле обязательно</span>}
      </div>
      <div className={styles['edit-form__input-wrapper']}>
        <p className={styles['edit-form__input-caption']}>Роль</p>
        <select
          placeholder="Роль"
          value={selectValue}
          onChange={(e) => handleChange(e)}
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
          readOnly
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
              format="+# (###)-###-##-##"
              placeholder="+7(111)-123-44-55"
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
            readOnly
            type="date"
            placeholder="01.01.2000"
            {...register('registerDate')}
            className={`${styles['edit-form__input']} ${styles['edit-form__input_short']}`}
          />
        </div>
        <div className={styles['edit-form__input-wrapper']}>
          <p className={styles['edit-form__input-caption']}>Последнее изменение</p>
          <input
            readOnly
            type="date"
            placeholder="01.01.2000"
            {...register('lastUpdate')}
            className={`${styles['edit-form__input']} ${styles['edit-form__input_short']}`}
          />
        </div>
      </div>
      <button type="submit" disabled={formState.isSubmitting} className={styles['edit-form__submit-button']}>
        Сохранить изменения в профиле
      </button>
    </form>
  );
}
export default EditForm;
