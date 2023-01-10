import React, { useState } from "react";
import { FaTimes } from 'react-icons/fa';

interface onEditInterface{
    name: string,
    email: string,
    phone: string,
    address: string,
    cpf: string,
    _id: string,
  }

interface ModalInterface {
    children: JSX.Element,
    modal: boolean,
    toggleModal: VoidFunction
    setOnEdit: React.Dispatch<React.SetStateAction<onEditInterface | null>>
}

const Modal = ({ children, modal, toggleModal, setOnEdit }: ModalInterface) => {

    if (modal) {
        document.body.classList.add('active-modal');
    } else {
        document.body.classList.remove('active-modal');
    }

    return (
        <>

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        {children}
                        <div className="close-modal" onClick={() => {toggleModal(); setOnEdit(null);}}>
                            <FaTimes/>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Modal;