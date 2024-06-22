import "../../App.css"
import "./Questionnaire.css"
import {useVariaContext} from "../../contexts/VariaContext.jsx";
import {useConfiguratorContext} from "../../contexts/ConfiguratorContext.jsx";
import {useTranslation} from 'react-i18next'
import {useEffect} from 'react'
import Form from "react-bootstrap/Form";
import {FormGroup, ToggleButton, ButtonGroup, Col, Row} from "react-bootstrap";


export function Questionnaire_spec() {
    const {t, i18n} = useTranslation();

    useEffect(() => {
        const lng = navigator.language;
        i18n.changeLanguage(lng);
    }, [])

    //Uses reactcontext
    const {specs, setSpecs, disable} = useConfiguratorContext();
    const {varia, setVaria} = useVariaContext();

    const changeSpecs = (event) => {
        setSpecs({...specs, [event.target.name]: event.target.value})
    }
    const changeVaria = (event) => {
        setVaria({...varia, [event.target.name]: event.target.value});
    }
    return (
        <div className="m-2">
                <div className={"d-inline-flex mb-4"}>
                    <FormGroup>
                        <div className={"mb-3"}><h5 data-testid={"question-specs-materials"}>{t('questionnaire_specs.q_materials')}</h5></div>
                        <div className={"m-1"}>
                            <Row>
                                <Col>
                                    <ButtonGroup>
                                        <ToggleButton variant={"danger"} type="radio" id="matBirch" value={"birch"}
                                                      name="material"
                                                      data-testid={"btn-specs-material-birch"}
                                                      onChange={changeSpecs}
                                                      checked={specs.material === "birch"
                                        }
                                                      disabled={disable}>
                                            {t('questionnaire_specs.materials.birch')}
                                        </ToggleButton>
                                        <ToggleButton variant={"danger"} type="radio" id="matOak" value={"oak"}
                                                      name="material"
                                                      data-testid={"btn-specs-material-oak"}
                                                      onChange={changeSpecs} checked={specs.material === "oak"}
                                                      disabled={disable}
                                        >
                                            {t('questionnaire_specs.materials.oak')}
                                        </ToggleButton>
                                        <ToggleButton variant={"danger"} type="radio" id="matWalnut" name="material"
                                                      value={"walnut"}
                                                      data-testid={"btn-specs-material-walnut"}
                                                      onChange={changeSpecs} checked={specs.material === "walnut"}
                                                      disabled={disable}
                                        >
                                            {t('questionnaire_specs.materials.walnut')}
                                        </ToggleButton>
                                    </ButtonGroup>
                                </Col>
                                <Col>
                                    <ButtonGroup>
                                        <ToggleButton variant={"danger"} type="radio" id="colWhite" name="color" value="#FFFFFF"
                                                      data-testid={"btn-specs-color-white"}
                                                      onChange={changeSpecs} checked={specs.color == "#FFFFFF"}
                                                      disabled={disable}
                                        >
                                            {t('questionnaire_specs.materials.white')}
                                        </ToggleButton>
                                        <ToggleButton variant={"danger"} type="radio" id="colBlack" name="color" value="#565656"
                                                      data-testid={"btn-specs-color-black"}
                                                      onChange={changeSpecs} checked={specs.color == "#565656"}
                                                      disabled={disable}
                                        >
                                            {t('questionnaire_specs.materials.black')}
                                        </ToggleButton>
                                    </ButtonGroup>
                                </Col>
                            </Row>


                        </div>
                    </FormGroup>
                </div>
                <div className="mb-4">
                    <FormGroup>
                        <div className={"mb-3"}><h5 data-testid={"question-specs-other"} >{t('questionnaire_specs.q_other')}</h5></div>
                    </FormGroup>
                    <Form.Control as={"textarea"} data-testid={"area-specs-requirements"} rows="3" cols="40" value={varia.requirements}
                                  name="requirements" onChange={changeVaria}
                                  readOnly={disable}
                    ></Form.Control>
                </div>
        </div>
    )
}

export default Questionnaire_spec;