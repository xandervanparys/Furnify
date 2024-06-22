import "../../App.css"
import {useEffect} from "react";
import "./Questionnaire.css"
import {useConfiguratorContext} from "../../contexts/ConfiguratorContext.jsx";
import Form from 'react-bootstrap/Form';
import Collapse from 'react-bootstrap/Collapse';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {useTranslation} from 'react-i18next'
import {Col, FloatingLabel, FormGroup, Row, ToggleButton} from "react-bootstrap";
import {useVariaContext} from "../../contexts/VariaContext.jsx";
import { use2d } from "../../contexts/2dContext.tsx";


export function Questionnaire_space() {
    //i18n
    const {t, i18n} = useTranslation();
    useEffect(() => {
        const lng = navigator.language;
        i18n.changeLanguage(lng);
    }, [])


    //Uses reactcontext
    const {dimensions, setDimensions, rectangular, setRectangular, disable} = useConfiguratorContext();

    //Changes values of dimensions in context
    const changeDim = (event) => {
        setDimensions({...dimensions, [event.target.name]: event.target.value});
    }

    const changeDim2D = (event) => {
        setWallProperties({height: event.target.value, thickness: wallProperties.thickness});
    }

    const {varia, setVaria} = useVariaContext();

    const changeVaria = (event) => {
        setVaria({...varia, [event.target.name]: event.target.id})
    }

    const space = [
        {name: t('questionnaire_func.space.guest_room'), id: "guestroom"},
        {name: t('questionnaire_func.space.living_room'), id: "living_room"},
        {name: t('questionnaire_func.space.bedroom'), id: "bedroom"},
    ];

    //Uses reactcontext
    const {specs, setSpecs} = useConfiguratorContext();

    const changeSpecs = (event) => {
        setSpecs({...specs, [event.target.name]: event.target.value})
    }

    //prevent user from typing negative values
    function handleKeyPress(event) {
        //prevent use of negative values
        if (event.charCode == 45) {
            event.preventDefault();
            return false;
        }
        return true;
    }

    const changeForm = (bool) => {
        setRectangular(bool);
    }

    const { wallProperties, setWallProperties } = use2d();

    return (
        <div className={"m-2"}>
                <div className="mb-4">
                    <Form.Group>
                        <div className={"mb-3"}>
                            <h5 data-testid={"question-func-space"}>{t('questionnaire_func.q_space')}</h5>
                        </div>
                        <div className={"m-1"}>
                            <ButtonGroup>
                                {space.map((space) => (
                                    <ToggleButton
                                        data-testid={"btn-func-room-" + space.id}
                                        key={space.id}
                                        id={space.id}
                                        name={"room"}
                                        type="radio"
                                        variant="danger"
                                        value={space.name}
                                        onChange={changeVaria}
                                        checked={varia.room == space.id}
                                        disabled={disable}
                                    >
                                        {space.name}

                                    </ToggleButton>
                                ))}
                            </ButtonGroup>
                        </div>
                    </Form.Group>
                </div>

                <div className={"mb-4"}>
                    <Form.Group>
                        <div className={"mb-3"}>
                            <h5 data-testid={"question-space-dimensions"}>{t('questionnaire_space.q_dimensions')}</h5>
                        </div>
                        <div className="m-1">
                            <ButtonGroup>
                                <ToggleButton
                                    onClick={() => {
                                        changeForm(true)
                                    }}
                                    data-testid={"btn-space-room-rectangular"}
                                    type="radio"
                                    value="Rectangular"
                                    variant="danger"
                                    checked={rectangular}
                                    disabled={disable}
                                >
                                    {t('questionnaire_space.rectangular')}
                                </ToggleButton>
                                <ToggleButton
                                    data-testid={"btn-space-room-other"}
                                    type="radio"
                                    value="Other"
                                    variant="danger"
                                    checked={!rectangular}
                                    onClick={() => {
                                        changeForm(false)
                                    }}
                                    disabled={disable}
                                >
                                    {t('questionnaire_space.other')}
                                </ToggleButton>
                            </ButtonGroup>
                        </div>
                        <div className={"m-3"}>
                            <Collapse in={rectangular}>
                                <Row>
                                    {Object.entries(dimensions).map(([key, value]) => (
                                            <Col key={key}>
                                                <FloatingLabel
                                                    controlid={"rectangular" + key}
                                                    label={t('questionnaire_space.' + key) + ' (m)'}
                                                    className="mb-4"
                                                    data-testid={"label-space-room-rectangular-" + key}
                                                >
                                                    <Form.Control
                                                        data-testid={"input-space-room-rectangular-" + key}
                                                        type="number" min={0} step={0.1} value={value}
                                                        size="sm"
                                                        name={key} onChange={changeDim}
                                                        onKeyPress={handleKeyPress}
                                                        readOnly={disable}
                                                    />
                                                </FloatingLabel>
                                            </Col>
                                        )
                                    )}

                                </Row>
                            </Collapse>
                            <Collapse in={!rectangular}>
                                <Row>
                                    {Object.entries(wallProperties).map(([key, value]) => (
                                        key === 'height' ? (
                                            <Col key={key}>
                                                <FloatingLabel
                                                    controlid={"rectangular" + key}
                                                    label={t('questionnaire_space.' + key) + ' (m)'}
                                                    className="mb-4"
                                                    data-testid={"label-space-room-not-rectangular-" + key}
                                                >
                                                    <Form.Control
                                                        data-testid={"input-space-room-not-rectangular-" + key}
                                                        type="number" min={0} step={0.1} value={value}
                                                        size="sm"
                                                        name={key} onChange={changeDim2D}
                                                        onKeyPress={handleKeyPress}
                                                        readOnly={disable}
                                                    />
                                                </FloatingLabel>
                                            </Col>) : (<></>)
                                        )
                                    )}

                                </Row>
                            </Collapse>
                        </div>
                    </Form.Group>
                </div>
                <div className="mb-4">
                    <FormGroup>
                        <div className={"mb-3"}><h5
                            data-testid={"question-specs-preferences"}>{t('questionnaire_specs.q_preferences')}</h5>
                        </div>
                        <div className={"m-1"}>
                            <ButtonGroup>
                                <ToggleButton variant={"danger"} type="radio" id="wall" value={"wall"} name="layout"
                                              onChange={changeSpecs}
                                              data-testid={"btn-specs-preferences-wall"}
                                              checked={"wall" === specs.layout}
                                              disabled={disable}
                                >
                                    {t('questionnaire_specs.preferences.wall')}
                                </ToggleButton>
                                <ToggleButton variant={"danger"} type="radio" id="partition" value={"partition"}
                                              name="layout"
                                              data-testid={"btn-specs-preferences-partition_wall"}
                                              onChange={changeSpecs} checked={"partition" === specs.layout}
                                              disabled={disable}
                                >
                                    {t('questionnaire_specs.preferences.partition_wall')}
                                </ToggleButton>
                                <ToggleButton variant={"danger"} type="radio" id="middle" name="layout" value={"middle"}
                                              data-testid={"btn-specs-preferences-middle_wall"}
                                              onChange={changeSpecs} checked={"middle" === specs.layout}
                                              disabled={disable}
                                >
                                    {t('questionnaire_specs.preferences.in_the_middle_of_space')}
                                </ToggleButton>
                            </ButtonGroup>
                        </div>
                    </FormGroup>
                </div>
        </div>
    )
}

export default Questionnaire_space;
