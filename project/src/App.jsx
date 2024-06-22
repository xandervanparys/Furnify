import './App.css'
import Sidebar from './sidebar/Sidebar'
import Scene from './3D/Scene'
import {useConfiguratorContext} from './contexts/ConfiguratorContext'
import {FloorplanScene} from './2D/FloorplanScene'
import Modal from 'react-bootstrap/Modal';
import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import { get_modules } from './algorithm/module_choice'
import { useTranslation } from 'react-i18next'
import {PrivacyButton} from "./Privacy/PrivacyButton";
import {PrivacyPolicy} from "./Privacy/PrivacyPolicy.jsx";




function App() {

    const [modalShow, setModalShow] = React.useState(false);
    const {rectangular, setRectangular} = useConfiguratorContext();
    get_modules();

    return (

        <div className="App">
            <Sidebar/>
            <main>
                <div className="container">
                    {rectangular && <Scene/>}
                    {!rectangular && <FloorplanScene/>}
                </div>

                <PrivacyButton setModalShow={setModalShow}/>

                <PrivacyPolicy
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </main>
        </div>
    );
}

export default App;
