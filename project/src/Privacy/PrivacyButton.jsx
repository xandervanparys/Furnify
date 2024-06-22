import '../App.css'
import Button from "react-bootstrap/Button";
import React from "react";
import {useTranslation} from "react-i18next";



export function PrivacyButton(props){
    const { t, i18n } = useTranslation();

    return(
        <>
            <Button className={"privacy"} variant="danger" onClick={() => props.setModalShow(true)}>
                {t('privacy.privacy')}
            </Button>
        </>
    )
}