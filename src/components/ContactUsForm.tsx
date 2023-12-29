'use client';
import React from 'react';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import TextField from '@/components/TextField';
import useModal from '@/hooks/useModal';
import OutlinedButton from '@/components/OutlinedButton';
import {useSendEmail} from '@/hooks/useSendEmail';

export interface FormInputs {
  name: string;
  email: string;
  position: string;
}

const ContactUsForm = () => {
  const {
    control,
    handleSubmit,
    formState: {isValid},
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      position: '',
    },
  });
  const {isOpen, open, close, modalData, setModalData} = useModal<{success: boolean}>();
  const onSuccess = () => {
    setModalData({success: true});
    reset();
    open();
  };
  const onError = () => {
    setModalData({success: false});
    open();
  };
  const {sendEmail, loading} = useSendEmail({onError, onSuccess});

  const onSubmit: SubmitHandler<FormInputs> = async data => sendEmail(data);

  return (
    <>
      <form className="contact-form">
        <Controller
          name="name"
          control={control}
          rules={{required: true}}
          render={({field}) => <TextField {...field} label="Имя" ref={null} />}
        />
        <Controller
          name="email"
          control={control}
          rules={{required: true}}
          render={({field}) => <TextField {...field} label="Почта" ref={null} type="email" />}
        />
        <Controller
          name="position"
          control={control}
          rules={{required: true}}
          render={({field}) => <TextField {...field} label="Вакансия" ref={null} type="tel" />}
        />
        <OutlinedButton
          className="button--filled"
          type="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid || loading}
          loading={loading}
        >
          Get started
        </OutlinedButton>
      </form>
    </>
  );
};

export default ContactUsForm;
