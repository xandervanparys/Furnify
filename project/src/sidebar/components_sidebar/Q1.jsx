import "../../App.css"
import { useEffect } from "react";
import "./Questionnaire.css"
import { useConfiguratorContext } from "../../contexts/ConfiguratorContext.jsx";
import Obstruction from "./Obstruction.jsx";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next'
import Window from "./Window.jsx";
import Walloutlet from "./Walloutlet.jsx";
import Switch from "./Switch.jsx";
import Door from "./Door.jsx";
import Light from "./Light.jsx";


export function Q1({ stateId, setStateId }) {
    //i18n
    const { t, i18n } = useTranslation();
    useEffect(() => {
        const lng = navigator.language;
        i18n.changeLanguage(lng);
    }, [])

    const sortObstacles = (list1, list2, list3, list4, list5, list6) => {
        //merge the lists
        const allObsts = [...list1, ...list2, ...list3, ...list4, ...list5, ...list6];
        // sort the list according to id
        allObsts.sort((a, b) => a.id - b.id);
        return allObsts;
    }

    function createObstacle(valueType) {
        switch (valueType) {
            case "door":
                return {
                    type: valueType,
                    width: 85,
                    height: 200,
                    id: stateId,
                    opening_door: "right",
                    obstacleWall: "front",
                    doorXpos: 0
                };
            case "window":
                return {
                    type: valueType,
                    width: 70,
                    height: 100,
                    id: stateId,
                    windowWall: "front",
                    inside_window: "no",
                    windowXpos: 0,
                    windowYpos: 70
                };
            case "walloutlet":
                return {
                    type: valueType,
                    width: 8.5,
                    height: 8.5,
                    depth: 2.5,
                    id: stateId,
                    walloutletWall: "front",
                    walloutletXpos: 0,
                    walloutletYpos: 110
                };
            case "switch":
                return {
                    type: valueType,
                    width: 8.5,
                    height: 8.5,
                    depth: 2.5,
                    id: stateId,
                    switchWall: "front",
                    switchXpos: 0,
                    switchYpos: 125
                };
            case "light":
                return {
                    type: valueType,
                    width: 15,
                    height: 12,
                    obstLength: 25,
                    id: stateId,
                };
            default:
                return {
                    type: valueType,
                    width: 50,
                    height: 50,
                    obstLength: 50,
                    id: stateId,
                };
        }
    }

    //Uses reactcontext
    const { dimensions, obstacles, setObstacles, disable } = useConfiguratorContext();

    //Changes values of dimensions in context
    //___________________________________________________________________________________
    const changeObstacle = (event) => {
        setObstacles({
            ...obstacles,
            other: obstacles["other"].map((obstacle) => obstacle.id == event.target.id.split("obst")[1] ? {
                ...obstacle,
                [event.target.name]: event.target.value
            } :
                obstacle)
        })
    }
    const changeDoor = (event) => {
        setObstacles({
            ...obstacles,
            door: obstacles["door"].map((obstacle) => obstacle.id == event.target.id.split("door")[1] ? {
                ...obstacle,
                [event.target.name]: event.target.value
            } : obstacle)
        })
    }
    const changeWindow = (event) => {
        setObstacles({
            ...obstacles,
            window: obstacles["window"].map((obstacle) => obstacle.id == event.target.id.split("window")[1] ? {
                ...obstacle,
                [event.target.name]: event.target.value
            } : obstacle)
        })
    }
    const changeLight = (event) => {
        setObstacles({
            ...obstacles,
            light: obstacles["light"].map((obstacle) => obstacle.id == event.target.id.split("light")[1] ? {
                ...obstacle,
                [event.target.name]: event.target.value
            } : obstacle)
        })
    }
    const changeWalloutlet = (event) => {
        setObstacles({
            ...obstacles,
            walloutlet: obstacles["walloutlet"].map((obstacle) => obstacle.id == event.target.id.split("walloutlet")[1] ? {
                ...obstacle,
                [event.target.name]: event.target.value
            } : obstacle)
        })
    }
    const changeSwitch = (event) => {
        setObstacles({
            ...obstacles,
            switch: obstacles["switch"].map((obstacle) => obstacle.id == event.target.id.split("switch")[1] ? {
                ...obstacle,
                [event.target.name]: event.target.value
            } : obstacle)
        })
    }
    //___________________________________________________________________________________




    //Opening door done separate, because it doesn't work otherwise
    //___________________________________________________________________________________
    const changeOpeningDoor = (event) => {
        let param = event.target.getAttribute("controlid").split("-");
        setObstacles({
            ...obstacles,
            door: obstacles["door"].map((obstacle) => obstacle.id == param[2].split("door")[1] ? {
                ...obstacle,
                [param[1]]: param[0]
            } : obstacle)
        })

    }
    const changeOpeningWindow = (event) => {
        let param = event.target.getAttribute("controlid").split("-");
        setObstacles({
            ...obstacles,
            window: obstacles["window"].map((obstacle) => obstacle.id == param[2].split("window")[1] ? {
                ...obstacle,
                [param[1]]: param[0]
            } : obstacle)
        })

    }
    const changeOpeningWalloutlet = (event) => {
        let param = event.target.getAttribute("controlid").split("-");
        setObstacles({
            ...obstacles,
            walloutlet: obstacles["walloutlet"].map((obstacle) => obstacle.id == param[2].split("walloutlet")[1] ? {
                ...obstacle,
                [param[1]]: param[0]
            } : obstacle)
        })

    }
    const changeOpeningSwitch = (event) => {
        let param = event.target.getAttribute("controlid").split("-");
        setObstacles({
            ...obstacles,
            switch: obstacles["switch"].map((obstacle) => obstacle.id == param[2].split("switch")[1] ? {
                ...obstacle,
                [param[1]]: param[0]
            } : obstacle)
        })

    }
    //___________________________________________________________________________________


    //_____DELETE______________________________________________________________________
    const deleteObstacle = (event) => {
        event.preventDefault();
        let obstacleIndex = event.currentTarget.id.split("obst")[1];
        setObstacles((prevObstacles) => ({
            ...prevObstacles,
            other: prevObstacles.other.filter((obstacle) => obstacle.id != obstacleIndex)
        }));
    };
    const deleteDoorObstacle = (event) => {
        event.preventDefault();
        let obstacleIndex = event.currentTarget.id.split("door")[1];
        setObstacles((prevObstacles) => ({
            ...prevObstacles,
            door: prevObstacles.door.filter((obstacle) => obstacle.id != obstacleIndex)
        }));
    };
    const deleteWindowObstacle = (event) => {
        event.preventDefault();
        let obstacleIndex = event.currentTarget.id.split("window")[1];
        setObstacles((prevObstacles) => ({
            ...prevObstacles,
            window: prevObstacles.window.filter((obstacle) => obstacle.id != obstacleIndex)
        }));
    };
    const deleteLightObstacle = (event) => {
        event.preventDefault();
        let obstacleIndex = event.currentTarget.id.split("light")[1];
        setObstacles((prevObstacles) => ({
            ...prevObstacles,
            light: prevObstacles.light.filter((obstacle) => obstacle.id != obstacleIndex)
        }));
    };

    const deleteWalloutletObstacle = (event) => {
        event.preventDefault();
        let obstacleIndex = event.currentTarget.id.split("walloutlet")[1];
        setObstacles((prevObstacles) => ({
            ...prevObstacles,
            walloutlet: prevObstacles.walloutlet.filter((obstacle) => obstacle.id != obstacleIndex)
        }));
    };
    const deleteSwitchObstacle = (event) => {
        event.preventDefault();
        let obstacleIndex = event.currentTarget.id.split("switch")[1];
        setObstacles((prevObstacles) => ({
            ...prevObstacles,
            switch: prevObstacles.switch.filter((obstacle) => obstacle.id != obstacleIndex)
        }));
    };


    //___________________________________________________________________________________

    const addObstacles = (event) => {
        setStateId(stateId + 1)
        const valueType = event.currentTarget.getAttribute("value");
        let obst = createObstacle(valueType);
        if (obstacles[valueType].length > 0) {
            setObstacles({
                ...obstacles, [valueType]: [...obstacles[valueType], obst]
            });
        } else {
            setObstacles({
                ...obstacles, [valueType]: [obst]
            });


        }
    }


    return (
        <div className={"m-2"}>
            <Form.Group>
                <div className={"mb-4"}>
                    <div className={"mb-3"}>
                        <h5 data-testid={"question-space-aspects"}>{t('questionnaire_space.q_aspects')}</h5>
                    </div>
                    <div className={"m-1"}>
                        <Button data-testid={"btn-space-aspect-window"} onClick={addObstacles} variant="danger"
                            value={"window"}
                            disabled={disable}
                        >
                            {t('obstructions.window')}
                        </Button>
                        <Button data-testid={"btn-space-aspect-door"} onClick={addObstacles} variant="danger"
                            value={"door"}
                                disabled={disable}
                        >
                            {t('obstructions.door')}
                        </Button>
                        <Button data-testid={"btn-space-aspect-walloutlet"} onClick={addObstacles} variant="danger"
                            value={"walloutlet"}
                                disabled={disable}
                        >
                            {t('obstructions.walloutlet')}
                        </Button>
                        <Button data-testid={"btn-space-aspect-switch"} onClick={addObstacles} variant="danger"
                            value={"switch"}
                                disabled={disable}
                        >
                            {t('obstructions.switch')}
                        </Button>
                        <Button data-testid={"btn-space-aspect-light"} onClick={addObstacles} variant="danger"
                            value={"light"}
                                disabled={disable}
                        >
                            {t('obstructions.light')}
                        </Button>
                        <Button data-testid={"btn-space-aspect-other"} onClick={addObstacles} variant="danger"
                            value={"other"}
                                disabled={disable}
                        >
                            {t('obstructions.other')}
                        </Button>
                        <div className={"aspect"}>
                            {sortObstacles(obstacles["window"], obstacles["door"], obstacles["walloutlet"], obstacles["switch"], obstacles["light"], obstacles["other"]).map(item => {
                                if (item.type === "window") {
                                    return <Window
                                        obstId={"window" + item.id}
                                        type={item.type}
                                        width={item.width}
                                        height={item.height}
                                        insideWindow={item.inside_window}
                                        key={"obst" + item.id}
                                        windowXpos={item.windowXpos}
                                        windowYpos={item.windowYpos}
                                        changeOpening={changeOpeningWindow}
                                        changeWindow={changeWindow}
                                        deleteObst={deleteWindowObstacle}
                                        windowWall={item.windowWall}
                                        maxHeight={dimensions.height}
                                    />;
                                } else if (item.type === "door") {
                                    return <Door
                                        obstId={"door" + item.id}
                                        type={item.type}
                                        width={item.width}
                                        height={item.height}
                                        openingDoor={item.opening_door}
                                        key={"obst" + item.id}
                                        doorXpos={item.doorXpos}
                                        changeDoor={changeDoor}
                                        changeOpening={changeOpeningDoor}
                                        deleteObst={deleteDoorObstacle}
                                        doorWall={item.obstacleWall}
                                        maxHeight={dimensions.height}
                                    />;
                                } else if (item.type === "walloutlet") {
                                    return <Walloutlet
                                        obstId={"walloutlet" + item.id}

                                        type={item.type}
                                        width={item.width}
                                        height={item.height}
                                        depth={item.depth}
                                        key={"walloutlet" + item.id}

                                        walloutletYpos={item.walloutletYpos}
                                        walloutletXpos={item.walloutletXpos}

                                        changeWalloutlet={changeWalloutlet}
                                        changeOpening={changeOpeningWalloutlet}
                                        deleteObst={deleteWalloutletObstacle}

                                        walloutletWall={item.walloutletWall}
                                        maxHeight={dimensions.height}
                                    />;
                                } else if (item.type === "switch") {
                                    return <Switch
                                        obstId={"switch" + item.id}
                                        type={item.type}
                                        width={item.width}
                                        height={item.height}
                                        depth={item.depth}
                                        key={"obst" + item.id}

                                        switchYpos={item.switchYpos}
                                        switchXpos={item.switchXpos}

                                        changeSwitch={changeSwitch}
                                        changeOpening={changeOpeningSwitch}
                                        deleteObst={deleteSwitchObstacle}

                                        switchWall={item.switchWall}
                                        maxHeight={dimensions.height}
                                    />;
                                } else if (item.type === "light") {
                                    return <Light
                                        obstId={"light" + item.id}
                                        key={"obst" + item.id}
                                        type={item.type}

                                        width={item.width}
                                        height={item.height}
                                        obstLength={item.obstLength}

                                        changeLight={changeLight}
                                        deleteObst={deleteLightObstacle}

                                        maxHeight={dimensions.height}
                                    />;
                                } else {
                                    return <Obstruction
                                        obstId={"obst" + item.id}
                                        key={"obst" + item.id}
                                        type={item.type}

                                        width={item.width}
                                        height={item.height}
                                        obstLength={item.obstLength}

                                        changeObst={changeObstacle}
                                        deleteObst={deleteObstacle}

                                        maxHeight={dimensions.height}
                                    />;
                                }
                            })}


                        </div>
                    </div>
                </div>
            </Form.Group>
        </div>
    )
}

export default Q1;
