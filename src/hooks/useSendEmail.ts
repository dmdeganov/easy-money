'use client';
import {useState} from 'react';
import {FormInputs} from '@/components/ContactUsForm';

interface Props {
  onSuccess: () => void;
  onError: () => void;
}
export function useSendEmail({onSuccess, onError}: Props) {
  const [loading, setLoading] = useState(false);
  const apiEndpoint = '/api/email';

  const sendEmail = async (data: FormInputs) => {
    const text = `
    name: ${data.name}\n
    email: ${data.email}\n
    vacancy: ${data.position}\n
    `;
    try {
      setLoading(true);
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        body: JSON.stringify({subject: `Message from ${data.name} (${data.email})`, text}),
      }).then(res => res.json());
      onSuccess();
      console.log({response});
    } catch (err) {
      console.log(err);
      onError();
    } finally {
      setLoading(false);
    }
  };
  return {sendEmail, loading};
}
