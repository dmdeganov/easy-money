'use client';
import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import TextField from '@/components/TextField';
import ContainedButton from '@/components/ContainedButton';

export interface FormInputs {
  name: string;
  email: string;
  position: string;
}

const ContactUsForm = () => {
  const {
    control,
    handleSubmit,
    formState: {isValid, errors, touchedFields},
    reset,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      position: '',
    },
  });

  // const {isOpen, open, close, modalData, setModalData} = useModal<{success: boolean}>();
  // const onSuccess = () => {
  //   setModalData({success: true});
  //   reset();
  //   open();
  // };
  // const onError = () => {
  //   setModalData({success: false});
  //   open();
  // };
  // const {sendEmail, loading} = useSendEmail({onError, onSuccess});

  // const onSubmit: SubmitHandler<FormInputs> = async data => sendEmail(data);

  const getInputValidationProps = (inputName: keyof FormInputs) => ({
    error: !!errors[inputName]?.message,
    helperText: errors[inputName]?.message,
    isValid: !errors[inputName] && touchedFields[inputName],
  });

  return (
    <>
      <form className="contact-form">
        <Controller
          name="name"
          control={control}
          rules={{
            required: true,
            minLength: {
              value: 2,
              message: 'Name should have at least 2 characters',
            },
          }}
          render={({field}) => (
            <TextField {...field} label="Имя" ref={null} placeholder="Ваше имя" {...getInputValidationProps('name')} />
          )}
        />
        <Controller
          name="email"
          control={control}
          rules={{
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          }}
          render={({field}) => (
            <TextField
              {...field}
              label="Почта"
              ref={null}
              type="email"
              placeholder="example@mail.com"
              {...getInputValidationProps('email')}
            />
          )}
        />
        <Controller
          name="position"
          control={control}
          rules={{
            required: true,
            minLength: {
              value: 3,
              message: 'Position should have at least 3 characters',
            },
          }}
          render={({field}) => (
            <TextField
              {...field}
              label="Вакансия"
              ref={null}
              placeholder="Например iOS Developer"
              {...getInputValidationProps('position')}
            />
          )}
        />
        <ContainedButton
          type="submit"
          // onClick={handleSubmit(onSubmit)}
          className="contact-form__submit-button"
          disabled={!isValid}
          // loading={loading}
        >
          Отправить
        </ContainedButton>
      </form>
    </>
  );
};

export default ContactUsForm;
