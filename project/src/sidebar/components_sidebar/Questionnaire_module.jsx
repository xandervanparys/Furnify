import "../../App.css"
import "./Questionnaire.css"
import { useVariaContext } from "../../contexts/VariaContext.jsx";
import { useConfiguratorContext } from "../../contexts/ConfiguratorContext.jsx";
import { useTranslation } from 'react-i18next'
import {useEffect, useState} from 'react'
import { ToggleButton, Collapse, Button, FormGroup } from "react-bootstrap";
import { check } from "../../algorithm/module_choice.ts";
import { use2d } from "../../contexts/2dContext.tsx"
import { useModuleContext } from "../../contexts/ModuleContext.jsx"
import { useIntersectionContext } from "../../contexts/IntersectionContext.jsx";
import {Modals} from "../../Modal/Modals.jsx";


export function Questionnaire_module() {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const lng = navigator.language;
        i18n.changeLanguage(lng);
    }, [])



    const { varia } = useVariaContext();


    const { rotate, disable} = useConfiguratorContext();
    const { checkIntersections, modalMessage, modalTitle} = useIntersectionContext();
    const value=useConfiguratorContext()
    const get2D = use2d();
    const { wallProperties, setWallProperties }  = use2d();

    const { errors, setErrors } = useModuleContext();
    const { possible_modules, setPossileModules } = useModuleContext();
    const { chosen_module, setChosenModule } = useModuleContext();
    const module = (event) => {
        let result = check(value, varia, get2D, wallProperties);
        setErrors({
            softer: result.errors.softer,
            demands: result.errors.demands,
            roomSize: result.errors.roomSize,
            points2D: result.errors.points2D
        });
        setPossileModules(result.possible);
        if (result.possible.length == 0) {
            setChosenModule({
                name: "", height: 0, width: 0, depth: 0, open: 0, closed: 0, saved: 0, bed: false,
                sofa: false, desk: false, storage: false, marge:0, width_options: [], components: []
            })
        }
        else {
            setChosenModule(result.possible[0]);
        }
    }

    const changeMod = (event) => {
        setChosenModule(possible_modules[event.target.id])

    }

    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);


    return (

        <div className="m-2">
                <div className={"mb-3"}>
                    <FormGroup>
                        <div className={"mb-3"}>
                            <h5>{t('questionnaire_module.question')}</h5>
                            <p>{t('questionnaire_module.warning')}</p>
                            <Button onClick={module} variant="danger"
                                    disabled={disable}
                            >
                                {t('questionnaire_module.button')}
                            </Button>
                        </div>
                        <div>
                            {Object.entries(errors).map(([key, value]) => (
                                <Collapse in={value} key={key}>
                                    <h6>{t('questionnaire_module.error.' + key)}</h6>
                                </Collapse>
                            ))}
                        </div>
                        <div hidden={chosen_module.name == "" || (errors.points2D || errors.demands || errors.roomSize)}>
                            <div>
                                {Object.entries(possible_modules).map(([key, value]) => (
                                    <ToggleButton key={value.name} className={"tbtn"} type="radio"
                                        variant={"outline-danger"}
                                        id={key}
                                        onChange={changeMod}
                                        checked={value.name == chosen_module.name}
                                        disabled={disable}
                                    >{t('questionnaire_module.module_type.' + value.name)}</ToggleButton>
                                ))}
                            </div>
                            <div className={"aspect"}>
                                <div id="name_module">
                                    <span key="name_module" >{t('questionnaire_module.module_info.name')} </span>
                                    <span key="name_module_value">{t('questionnaire_module.module_type.' + chosen_module.name)}</span>
                                </div>
                                <div id="height_module">
                                    <span key="height_module">{t('questionnaire_module.module_info.height')} </span>
                                    <span key="height_module_value">{(chosen_module.height * 100).toFixed(1)}</span>
                                    <span key="height_module_unit" > cm</span>
                                </div>
                                <div id="width_module">
                                    <span key="width_module">{t('questionnaire_module.module_info.width')} </span>
                                    <span key="width_module_value">{(chosen_module.width * 100).toFixed(1)}</span>
                                    <span key="width_module_unit" > cm</span>
                                </div>

                                <div id="closed_module">
                                    <span key="closed_module">{t('questionnaire_module.module_info.closed')} </span>
                                    <span key="closed_module_value">{(chosen_module.closed * 100).toFixed(1)}</span>
                                    <span key="closed_module_unit" > cm</span>
                                </div>

                                <div id="open_module">
                                    <span key="open_module">{t('questionnaire_module.module_info.open')}</span>
                                    <span key="open_module_value">{(chosen_module.open * 100).toFixed(1)}</span>
                                    <span key="open_module_unit" > cm</span>
                                </div>
                                <div id="components">
                                    <span key="components_module">{t('questionnaire_module.module_info.components')}</span>
                                    {Object.entries(chosen_module.components).map(([key, value]) => (
                                        <span key={"components_module" + key}>{t('questionnaire_module.components.' + value)}{key != chosen_module.components.length -1 && <span>, </span>}</span>
                                    ))}
                                </div>
                                <div id="saved_space">
                                    <span key="saved_module">{t('questionnaire_module.module_info.saved')}</span>
                                    <span key="saved_module_value">{chosen_module.saved}</span>
                                    <span key="saved_module_unit" > m²</span>
                                </div>

                                <Button onClick={rotate} variant={"danger"} >{t('questionnaire_module.module_info.rotate')}</Button>
                                <Button onClick={()=>{
                                    checkIntersections()
                                    setShowModal(true);
                                }} variant={"danger"} >{t('questionnaire_module.module_info.intersection')}</Button>
                            </div>
                        </div>
                    </FormGroup>
                </div>
            <Modals message={modalMessage} title={modalTitle} handleClose={handleClose} show={showModal}/>
        </div >


    )
}

export default Questionnaire_module;
