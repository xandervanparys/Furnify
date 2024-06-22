import { useState, useEffect } from "react";
import "./Questionnaire.css"
import Form from "react-bootstrap/Form";
import { Col, FloatingLabel, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
import {IoChevronDownSharp, IoChevronUpSharp, IoCloseSharp} from "react-icons/io5";
import {useConfiguratorContext} from "../../contexts/ConfiguratorContext.jsx";

// eslint-disable-next-line react/prop-types
function Obstruction({ deleteObst, changeObst, type, obstId, width, height, obstLength, maxHeight }) {
    //i18n
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const lng = navigator.language;
        i18n.changeLanguage(lng);
    }, [])

    const {disable}=useConfiguratorContext()
    const [showButton2, setShow2] = useState(true);
    const showButton = () => {
        setShow2(!showButton2)
    };

    function handleInput(event) {
        //Only check on height
        if (!Number.isNaN(event.nativeEvent.data) && event.target.name == "height") {
            if (event.target.value > maxHeight * 100.0) {
                event.preventDefault();
                return;
            }
        }
        changeObst(event);
    }

    function negativeValues(event) {
        //prevent use of negative values
        if (event.key == "-") {
            event.preventDefault();
        }
    }

    return (
        <div className="obstruction-bg mb-2 flex">
            <Button onClick={showButton}
                    variant={"danger"} id={"expand" + obstId}
                    data-testid={"btn-obstacle-expand-" + type}

            >
                {showButton2?<IoChevronDownSharp/>:<IoChevronUpSharp/>}
            </Button>
            <h5 className={"obstacle"} id={"button" + obstId}
                data-testid={"btn-obstacle-name-" + type}

            >{t("obstructions." + type)}</h5>
            <Button className={"fa-rectangle-xmark"} data-testid={"btn-obstacle-delete-" + type}
                variant={"danger"} id={"delete" + obstId}
                onClick={(e) => deleteObst(e)}
                disabled={disable}
            >
                <IoCloseSharp />
            </Button>
            <div className="m-1" hidden={showButton2}>
                <Form.Group className="mb-3">
                    <Form.Select name="type" id={"type" + obstId}
                        defaultValue={type}
                        onChange={(e) => {
                            changeObst(e)
                        }}
                        disabled={disable}
                    >
                        <option value={"other"}>{t('obstructions.other')}</option>
                        <option value={"radiator"}>{t('obstructions.radiator')}</option>
                        <option value={"sloping_Wall"}>{t('obstructions.sloping_Wall')}</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <div className="m-1">
                        <Row>
                        <Form.Label>{t('obstructions.q_all.dimensions')}</Form.Label>
                            <Col>
                                <FloatingLabel
                                    controlid={"obstLength" + obstId}
                                    label={t('questionnaire_space.length') + '(cm)'}
                                >
                                    <Form.Control type="number" name={"obstLength"} min={0} step={1}
                                        data-testid={"input-obst-" + type + "-length"}
                                        value={obstLength}
                                        onChange={(e) => {
                                            handleInput(e)
                                        }}
                                        onKeyPress={negativeValues}
                                        id={"length" + obstId}
                                        readOnly={disable}
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel
                                    controlid={"width" + obstId}
                                    label={t('questionnaire_space.width') + '(cm)'}
                                >
                                    <Form.Control type="number" name={"width"} min={0} step={1} value={width}
                                        data-testid={"input-obst-" + type + "-width"}
                                        onChange={(e) => {
                                            handleInput(e)
                                        }}
                                        onKeyPress={negativeValues}
                                        id={"width" + obstId}
                                        readOnly={disable}
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel
                                    controlid={"height" + obstId}
                                    label={t('questionnaire_space.height') + '(cm)'}
                                >
                                    <Form.Control type="number" name={"height"} min={0} step={1} value={height}
                                        data-testid={"input-obst-" + type + "-height"}
                                        onChange={(e) => {
                                            handleInput(e)
                                        }}
                                        onKeyPress={negativeValues}
                                        id={"height" + obstId}
                                        readOnly={disable}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>

                    </div>
                </Form.Group>
            </div>
        </div>
    )
}

export default Obstruction;
