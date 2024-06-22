import {useTranslation} from "react-i18next";
import React, {useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../App.css"

export function PrivacyPolicy(props) {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const lng = navigator.language;
        i18n.changeLanguage(lng);
    }, [])
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    {t('privacy.title')}
                </Modal.Title>
                <Button variant={"danger"} onClick={props.onHide}>
                    {t('privacy.close')}</Button>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <p>
                        {t('privacy.intro')}
                    </p>
                </div>
                <h4>Furnify</h4>
                <div><p>{t('privacy.pol')}
                    <a href={"https://www.furnifyhome.eu/pages/privacy"}>
                        {t('privacy.here')}</a></p>
                </div>
                <h4>Mailchimp</h4>
                <div><p>{t('privacy.mailchimp')}</p></div>
                <div className="content__gdprLegal"><p>{t('privacy.disclaimer1')}<a
                    href="https://mailchimp.com/legal/terms">{t('privacy.learn')}</a> {t('privacy.disclaimer2')}</p>
                </div>
            </Modal.Body>
        </Modal>
    );
}