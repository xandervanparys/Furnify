import {useTranslation} from "react-i18next";
import React, {useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../App.css"

export function Modals({show, handleClose, message, title="", confirmation=false, ...props}){
    const {t, i18n}=useTranslation();

    useEffect(() => {
        const lng = navigator.language;
        i18n.changeLanguage(lng);
    }, [])


        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                    <Modal.Title>{title}</Modal.Title>
                    {!confirmation &&   <Button variant="danger" onClick={handleClose}>
                        {t("modal.close")}
                    </Button>}

                </Modal.Header>
                <Modal.Body>
                    {message}
                </Modal.Body>
                {!confirmation?null:
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>{t("modal.cancel")}</Button>
                        <Button variant="danger" onClick={props.onClick}>{t("modal.confirm")}</Button>
                    </Modal.Footer>
                }
            </Modal>
        );




}