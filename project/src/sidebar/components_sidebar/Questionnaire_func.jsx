import "../../App.css"
import "./Questionnaire.css"
import {useVariaContext} from "../../contexts/VariaContext.jsx";
import {useConfiguratorContext} from "../../contexts/ConfiguratorContext.jsx";
import {useTranslation} from 'react-i18next'
import {useEffect} from 'react'
import {ToggleButton, Collapse, ButtonGroup, Form} from "react-bootstrap";

export function Questionnaire_functional() {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const lng = navigator.language;
        i18n.changeLanguage(lng);
    }, [])


    const { functionalities, setFunctionalities, disable } = useConfiguratorContext();
    const { varia, setVaria } = useVariaContext();

    const changeFunctionalities = (event) => {
        setFunctionalities({ ...functionalities, [event.target.id]: !functionalities[event.target.id] })
    }
    const changeVaria = (event) => {
        setVaria({ ...varia, [event.target.name]: event.target.id })
    }



    return (

        <div className="m-2">
                <div className={"mb-3"}>
                    <Form.Group>
                        <div className={"mb-3"}>
                            <h5 data-testid={"question-func-function"}>{t('questionnaire_func.q_function')}</h5>
                        </div>
                        <div className={"m-1"}>
                            <div className={"flex"}>
                                {Object.entries(functionalities).map(([key, value]) => (
                                    <ToggleButton key={key} className={"tbtn"} type="checkbox"
                                        variant={"outline-danger"}
                                        id={key}
                                        data-testid={"btn-func-" + key}
                                        onChange={changeFunctionalities}
                                        checked={value}
                                        disabled={disable}
                                    >{t('questionnaire_func.functions.' + key)}</ToggleButton>
                                ))}
                            </div>
                            <div className={"m-1"}>
                                <Collapse in={functionalities.bed}>
                                    
                                    <div className="mb-3" data-testid={"div-func-options-mattress"}>
                                    
                                        <span data-testid={"question-bed"}>{t('questionnaire_func.bed.q_bed')}</span>

                                        <ButtonGroup defaultValue={varia.mattress ?? "none"}>

                                            <ToggleButton variant={"danger"} type="radio" id="soft" name="mattress"
                                                data-testid={"btn-func-bed-soft"} onChange={changeVaria}
                                                checked={"soft" == varia.mattress}
                                                          disabled={disable}
                                            >
                                                {t('questionnaire_func.bed.soft')}
                                            </ToggleButton>
                                            <ToggleButton variant={"danger"} type="radio" id="medium" name="mattress"
                                                data-testid={"btn-func-bed-medium"} onChange={changeVaria}
                                                checked={"medium" == varia.mattress}
                                                          disabled={disable}
                                            >
                                                {t('questionnaire_func.bed.medium')}
                                            </ToggleButton>
                                            <ToggleButton variant={"danger"} type="radio" id="sturdy" name="mattress"
                                                data-testid={"btn-func-bed-sturdy"} onChange={changeVaria}
                                                checked={"sturdy" == varia.mattress}
                                                          disabled={disable}
                                            >
                                                {t('questionnaire_func.bed.sturdy')}
                                            </ToggleButton>
                                            <ToggleButton variant={"danger"} type="radio" id="none" name="mattress"
                                                data-testid={"btn-func-bed-apply"} onChange={changeVaria}
                                                checked={"none" == varia.mattress}
                                                          disabled={disable}
                                            >
                                                {t('questionnaire_func.bed.apply')}
                                            </ToggleButton>
                                        </ButtonGroup>
                                    </div>
                                </Collapse>
                            </div>
                            <div className={"m-1"}>
                                <Collapse in={functionalities.bed}>

                                    <div className="mb-3" data-testid={"div-func-options-size"}>

                                        <span data-testid={"question-size"}>{t('questionnaire_func.bed.q_size')}</span>
                                    
                                        <ButtonGroup defaultValue={varia.size ?? "140"}>

                                            <ToggleButton variant={"danger"} type="radio" id="140" name="size"
                                                data-testid={"btn-func-bed-140"} onChange={changeVaria}
                                                checked={"140" == varia.size}
                                                          disabled={disable}
                                            >
                                                140 cm
                                            </ToggleButton>
                                            <ToggleButton variant={"danger"} type="radio" id="160" name="size"
                                                data-testid={"btn-func-bed-160"} onChange={changeVaria}
                                                checked={"160" == varia.size}
                                                          disabled={disable}
                                            >
                                                160 cm
                                            </ToggleButton>
                                            <ToggleButton variant={"danger"} type="radio" id="180" name="size"
                                                data-testid={"btn-func-bed-180"} onChange={changeVaria}
                                                checked={"180" == varia.size}
                                                          disabled={disable}
                                            >
                                                180 cm
                                            </ToggleButton>
                                        </ButtonGroup>
                                    </div>
                                </Collapse>
                            </div>
                        </div>
                    </Form.Group>
                </div>
        </div>
    )
}

export default Questionnaire_functional;
