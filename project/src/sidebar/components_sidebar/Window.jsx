import { useState, useEffect } from "react";
import "./Questionnaire.css"
import Form from "react-bootstrap/Form";
import { ButtonGroup, Col, FloatingLabel, Row, ToggleButton } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
import { useRoomWallLightupContext } from "../../contexts/RoomWallLightupContext.jsx";
import {IoChevronDownSharp, IoChevronUpSharp, IoCloseSharp} from "react-icons/io5";
import {useConfiguratorContext} from "../../contexts/ConfiguratorContext.jsx";

// eslint-disable-next-line react/prop-types
function Window({ windowWall, deleteObst, changeOpening, insideWindow, changeWindow, type, obstId, width, height, windowXpos, windowYpos, maxHeight }) {
    //i18n
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const lng = navigator.language;
        i18n.changeLanguage(lng);
    }, [])

    const {disable}=useConfiguratorContext()
    const [showButton1, setShow1] = useState(false);
    const [showButton2, setShow2] = useState(true);
    const showButton = () => {
        setShow2(!showButton2)
        setShow1(!showButton1)
    };



    const { selectedWall, setSelectedWall } = useRoomWallLightupContext();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const changeSelectedWall = (wall) => {
        setIsButtonDisabled(true);
        setSelectedWall(wall);
        setTimeout(() => {
            setSelectedWall(null);
            setIsButtonDisabled(false);
        }, 1500); // 1000 milliseconds = 1 second
    }


    function handleInput(event) {
        //prevent use of negative values
        if (event.target.name == "height" || event.target.name == "windowYpos") {
            let sum = Number(event.target.value);
            if (event.target.name == "height") {
                sum += Number(windowYpos);
            }
            else {
                sum += Number(height);
            }
            if (sum > maxHeight * 100.0) {
                event.preventDefault()
                return;
            }
        }
        //TODO: if length of walls are being saved
        else if (event.target.name == "width" || event.target.name == "windowXpos") {

        }
        changeWindow(event);

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
                    data-testid={"btn-obstacle-expand-" + type}

                    variant={"danger"} id={"expand" + obstId}
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
                <Form.Group>
                    <Row>
                        <Form.Label>{t('obstructions.q_all.dimensions')}</Form.Label>
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
                    <Row>
                    <Form.Label data-testid={"question-obstacle-window-opening"}>{t('obstructions.q_window.opening_window')}</Form.Label>
                        <ButtonGroup>
                            <ToggleButton
                                className="mb-4"
                                type="radio"
                                variant="danger"
                                name={"yes" + obstId}
                                controlid={"yes-inside_window-" + obstId}
                                data-testid={"btn-obstacle-window-inside"}
                                checked={"yes" == insideWindow}
                                onClick={(event) => {
                                    changeOpening(event)
                                }}
                                disabled={disable}
                            >{t('obstructions.q_window.yes')} </ToggleButton>
                            <ToggleButton
                                className="mb-4"
                                type="radio"
                                variant="danger"
                                data-testid={"btn-obstacle-window-outside"}
                                name={"no" + obstId}
                                controlid={"no-inside_window-" + obstId}
                                checked={"no" == insideWindow}
                                onClick={(event) => {
                                    changeOpening(event)
                                }}
                                disabled={disable}
                            >{t('obstructions.q_window.no')}</ToggleButton>
                        </ButtonGroup>
                    </Row>
                    <Row>
                        <Form.Label>{t('obstructions.q_all.position')}</Form.Label>
                        <Col>
                            <FloatingLabel
                                style={{ fontSize: '0.8rem' }}
                                controlid={"windowXpos" + obstId}
                                label={t('obstructions.q_all.side') + " (cm)"}
                            >
                                <Form.Control
                                    type="number"
                                    name={"windowXpos"}
                                    min={0} step={1}
                                    value={windowXpos}
                                    onChange={(e) => {
                                        handleInput(e)
                                    }}
                                    onKeyPress={negativeValues}
                                    placeholder="Enter X Position (cm)"
                                    id={"xpos" + obstId}
                                    readOnly={disable}
                                />
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel
                                controlid={"windowYpos" + obstId}
                                label={t('obstructions.q_all.up') + " (cm)"}
                                style={{ fontSize: '0.8rem' }}
                            >
                                <Form.Control
                                    type="number"
                                    value={windowYpos}
                                    name={"windowYpos"}
                                    min={0} step={1}
                                    onChange={(e) => {
                                        handleInput(e)
                                    }}
                                    onKeyPress={negativeValues}
                                    placeholder="Enter Y Position (cm)"
                                    id={"ypos" + obstId}
                                    readOnly={disable}
                                />
                            </FloatingLabel>
                        </Col>
                    </Row>                   
                    <Row>
                    <Form.Label data-testid={"question-obstacle-window-wall"}>
                        {t("obstructions.q_all.wall")}
                    </Form.Label>
                        <ButtonGroup>
                            {/* Add radio buttons for window positions */}
                            {["front", "back", "left", "right"].map((x) => (
                                <ToggleButton
                                    key={x}
                                    className="mb-4"
                                    type="radio"
                                    variant="danger"
                                    name={`windowWall${obstId}`}
                                    controlid={`${x}-windowWall-${obstId}`}
                                    data-testid={`btn-obstacle-window-position-${x}`}
                                    onClick={(e) => {
                                        changeSelectedWall(x);
                                        changeOpening(e);
                                    }}
                                    disabled={disable || isButtonDisabled} // Set button disabled state
                                    checked={x == windowWall}
                                >
                                    {t(`obstructions.q_all.${x}`)}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>
                    </Row>
                </Form.Group>

            </div>
        </div>
    )
}

export default Window;
