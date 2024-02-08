import React from 'react';
import Modal from "@/shared-ui/Modal";

interface Props {
  isOpen: boolean;
  close: () => void;
  success: boolean;
}
const EmailSentModal = ({isOpen, close, success}: Props) => {
  return (
    <Modal isOpen={isOpen} close={close}>
      <div className="email-sent-modal">
        <h2>{success ? <><span className="text-gradient">Спасибо</span> за обращение</> : 'Что-то пошло не так!'}</h2>
        <p>{success ? 'Очень скоро мы свяжемся с вами!' : 'Пожалуйста, попробуйте повторить запрос позднее'}</p>
      </div>
    </Modal>
  );
};

export default EmailSentModal;
