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
function Door({ deleteObst, changeOpening, changeDoor, type, obstId, width, height, openingDoor, doorXpos, doorWall, maxHeight }) {
    //i18n
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const lng = navigator.language;
        i18n.changeLanguage(lng);
    }, [])
    const {disable}=useConfiguratorContext();
    const [showButton2, setShow2] = useState(true);
    const showButton = () => {
        setShow2(!showButton2)
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
        if (!Number.isNaN(event.key) && event.target.name == "height") {
            if (event.target.value > maxHeight * 100.0) {
                event.preventDefault();
                return;
            }
        }
        changeDoor(event);
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
                                <Form.Control type="number" name={"width"} min={0} step={1} defaultValue={width}
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
                        <Form.Label data-testid={"question-obstacle-door-opening"}> {t('obstructions.q_door.opening_door')}</Form.Label>
                        <ButtonGroup>
                            <ToggleButton
                                controlid={"left-opening_door-" + obstId}
                                className="mb-4"
                                name={"opening-" + obstId}
                                onClick={(e) => {
                                    changeOpening(e)
                                }}
                                data-testid={"btn-obstacle-door-inside-l"}
                                type="radio"
                                variant="danger"
                                checked={"left" == openingDoor}
                                disabled={disable}
                            >
                                {t('obstructions.q_door.inside_left')}
                            </ToggleButton>
                            <ToggleButton
                                controlid={"right-opening_door-" + obstId}
                                className="mb-4"
                                name={"opening-" + obstId}
                                onClick={(e) => {
                                    changeOpening(e)
                                }}
                                data-testid={"btn-obstacle-door-inside-r"}
                                type="radio"
                                variant="danger"
                                checked={"right" == openingDoor}
                                disabled={disable}
                            >
                                {t('obstructions.q_door.inside_right')}
                            </ToggleButton>
                            <ToggleButton
                                controlid={"out-opening_door-" + obstId}
                                className="mb-4"
                                name={"opening-" + obstId}
                                onClick={(e) => {
                                    changeOpening(e)
                                }}
                                type="radio"
                                data-testid={"btn-obstacle-door-outside"}
                                variant="danger"
                                checked={"out" == openingDoor}
                            disabled={disable}>
                                {t('obstructions.q_door.outside')}
                            </ToggleButton>
                        </ButtonGroup>
                    </Row>
                    <Row>
                        <Form.Label>{t('obstructions.q_all.position')}</Form.Label>
                        <Col>
                            <FloatingLabel
                                controlid={"doorXpos" + obstId}
                                label={t('obstructions.q_all.side') + " (cm)"}
                            >
                                <Form.Control
                                    type="number"
                                    name={"doorXpos"}
                                    min={0} step={1}
                                    value={doorXpos}
                                    onChange={(e) => {
                                        handleInput(e)
                                        changeDoor(e)
                                    }}
                                    onKeyPress={negativeValues}
                                    placeholder="Enter X Position (m)"
                                    id={"xpos" + obstId}
                                    readOnly={disable}
                                />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Row>
                        <Form.Label data-testid={"question-obstacle-obstacle-wall"}>{t("obstructions.q_all.wall")}</Form.Label>
                        <ButtonGroup>
                            {/* Add radio buttons for obstacle positions */}
                            {["front", "back", "left", "right"].map((x) => (
                                <ToggleButton
                                    key={x}
                                    className="mb-4"
                                    type="radio"
                                    variant="danger"
                                    name={`obstacleWall${obstId}`}
                                    controlid={`${x}-obstacleWall-${obstId}`}
                                    data-testid={`btn-obstacle-door-position-${x}`}
                                    onClick={(e) => {
                                        changeSelectedWall(x);
                                        changeOpening(e);
                                    }}
                                    disabled={disable || isButtonDisabled} // Set button disabled state
                                    checked={x == doorWall}
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

export default Door;
