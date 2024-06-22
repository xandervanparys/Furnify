import "./Sidebar.css"
import {useEffect, useState} from "react";
import { IconContext } from "react-icons"
import { FaAnglesRight, FaAnglesLeft } from "react-icons/fa6"
import Questionnaire_func from "./components_sidebar/Questionnaire_func.jsx";
import Contact from "./components_sidebar/Contact";
import logo from "../assets/logo_lm.png";
import logo_dm from "../assets/logo_dm.png";
import Questionnaire_space from "./components_sidebar/Questionnaire_space.jsx";
import Questionnaire_specs from "./components_sidebar/Questionnaire_specs.jsx";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useConfiguratorContext } from "../contexts/ConfiguratorContext.jsx";
import {useContactContext} from "../contexts/ContactContext.jsx"
import {useVariaContext} from "../contexts/VariaContext.jsx"
import{useRoomWallLightupContext} from "../contexts/RoomWallLightupContext.jsx"
import {useModuleContext} from "../contexts/ModuleContext.jsx"
import jsonp from "jsonp";
import {Form} from "react-bootstrap";
import Q1 from "./components_sidebar/Q1.jsx";
import axios from "axios";
import {useParams} from "react-router-dom";
import Questionnaire_module from "./components_sidebar/Questionnaire_module.jsx";
import {Modals} from "../Modal/Modals.jsx"
import Button from "react-bootstrap/Button";



export function Sidebar() {
    const [sidebar, setSidebar] = useState(true);
    const [part, showPart] = useState(0);
    const [stateId, setStateId] = useState(1);
    const showSidebar = () => {
        setSidebar(!sidebar);
    }
    const previousPart = () => {
        showPart(part - 1)
    }
    const nextPart = () => {
        showPart(part + 1)
    }
    const showPrevious = () => {
        return part == 0;
    }
    const showNext = () => {
        return part == 5;
    }


    const { contact,setContact } = useContactContext();

    const { dimensions,functionalities,specs,obstacles,setDimensions,setFunctionalities,setSpecs,setObstacles,
        rectangular,setRectangular,rotationIndex,setRotationIndex,skyboxPath,setSkyboxPath,modelPosition,
        setModelPosition,obstructionPositions,setObstructionPositions, dobstructionPositions,addDObstructionPosition,get,setGet, setDisable} = useConfiguratorContext();

    const {varia,setVaria} = useVariaContext();

    const {selectedWall,setSelectedWall} = useRoomWallLightupContext();

    const {errors, setErrors, possible_modules, setPossileModules, chosen_module, setChosenModule} = useModuleContext();

    const  superContext = {
        contact: useContactContext().contact,
        dimensions: useConfiguratorContext().dimensions,
        functionalities: useConfiguratorContext().functionalities,
        specs: useConfiguratorContext().specs,
        obstacles: useConfiguratorContext().obstacles,
        rectangular: useConfiguratorContext().rectangular,
        skyboxPath: useConfiguratorContext().skyboxPath,
        varia: useVariaContext().varia,
        selectedWall: useRoomWallLightupContext().selectedWall,
        errors: useModuleContext().errors,
        possible_modules:useModuleContext().possible_modules,
        chosen_module: useModuleContext().chosen_module,
        modelPosition: useConfiguratorContext().modelPosition,
        positions: useConfiguratorContext().obstructionPositions,
        rotationIndex: useConfiguratorContext().rotationIndex
    };

    const updateContactFromResponse = (response) => {

        const { firstname, lastname, email, phone_number, address, country, postcode, city} = response.contact;

        setContact(() => ({
            firstname: firstname,
            lastname: lastname,
            email: email,
            phone_number: {
                number: phone_number.number,
                country: phone_number.country
            },
            address: address,
            country: country,
            postcode: postcode,
            city: city
        }));
    };
    const updateSelectedWallFromResponse = (response) => {
        const selectedWallValue = response.selectedWall;

        setSelectedWall(selectedWallValue);
    };
    const updateVariaFromResponse = (response) => {

        const { requirements, mattress, room, size } = response.varia;
      
        setVaria(() => ({
            requirements: requirements,
            mattress: mattress,
            room: room,
            size: size
        }));
    };
    const updateConfiguratorFromResponse = (response) =>{
        const { length, width, height } = response.dimensions;

        setDimensions({
            length: length,
            width: width,
            height: height
        });

        const { bed, sofa, office_space, storage_space } = response.functionalities;

        setFunctionalities({
            bed: bed,
            sofa: sofa,
            office_space: office_space,
            storage_space: storage_space
        });

        const { color, material, layout } = response.specs;

        setSpecs({
            color: color,
            material: material,
            layout: layout
        });

        const { door, window, other, walloutlet, switch: switchData, light} = response.obstacles;

        setObstacles({
            door: door,
            window: window,
            walloutlet: walloutlet,
            switch: switchData,
            other: other,
            light: light
        });

        setSkyboxPath(response.skyboxPath);

        setRectangular(response.rectangular);
        setPossileModules(response.possible_modules);

        setModelPosition(response.modelPosition);

        setObstructionPositions(response.positions);

        setRotationIndex(response.rotationIndex);

    }
    const updateModuleFromResponse = (response) =>{
        const { softer, demands, roomSize, points2D } = response.errors;
        setErrors({
            softer: softer,
            demands: demands,
            roomSize: roomSize,
            points2D: points2D
        });

        const { name, height, width, depth, open, closed, saved, bed, sofa, desk, storage, width_options, components } = response.chosen_module;
        setChosenModule({
            name: name,
            height: height,
            width: width,
            depth: depth,
            open: open,
            closed: closed,
            saved: saved,
            bed: bed,
            sofa: sofa,
            desk: desk,
            storage: storage,
            width_options: width_options,
            components: components
        });
    }


    const {email} = useParams();

    if(email !== undefined){
        useEffect(() => {
            setGet(true);
            setDisable(true);
            axios.get(`http://${import.meta.env.VITE_IP_ADRESS}:3000/${email}`)
                .then(response => {
                    updateContactFromResponse(response.data);
                    updateSelectedWallFromResponse(response.data);
                    updateVariaFromResponse(response.data);
                    updateConfiguratorFromResponse(response.data);
                    updateModuleFromResponse(response.data);

                })
                .catch(error => {
                    // Handle error
                    console.error('Error fetching data:', error);
                });
        }, [email]);}


    const showNextPart = () => {
        switch (part) {
            case 0:
                return <Questionnaire_space />
            case 1:
                return <Q1 stateId={stateId} setStateId={setStateId} />
            case 2:
                return <Questionnaire_func />
            case 3:
                return <Questionnaire_module/>
            case 4:
                return <Questionnaire_specs />
            case 5:
                return <Contact/>
            case 6:
                return <p>Nothing to see here</p>
            default:
                return <p>This is some default text</p>
        }
    }

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const handleClose = () => setShowModal(false);

    const onSubmit = async e => {
        e.preventDefault();

        let dim=""
        Object.entries(dimensions).map(([key, value]) => (
            dim+=key+":"+value+" "
        ));

        let func = "";
        Object.entries(functionalities).forEach(([key, value]) => {
            if (value) {
                func += key+" ";
            }
        });

        let color = specs.color.toString().replace("#",'');
        const url = import.meta.env.VITE_MC_URI;

        jsonp(`${url}&EMAIL=${contact.email}&FIRSTNAME=${contact.firstname}&LASTNAME=${contact.lastname}&ADDRESS=${contact.address}
                    &POSTCODE=${contact.postcode}&COUNTRY=${contact.country}&CITY=${contact.city}
                    &DIMENSIONS=${dim}&ROOM=${varia.room}&FUNCTIONAL=${func}&LAYOUT=${specs.layout}&MATERIAL=${specs.material}
                    &COLOR=${color}&REQ=${varia.requirements}&MODULE=${chosen_module.name}`, {param: 'c'}, (_, data) => {
            const {msg, result} = data
            if (result === "success") {
                console.log("SUPERCONTEXT");
                console.log(superContext);
                axios.post(`http://${import.meta.env.VITE_IP_ADRESS}:3000/api/contact`, superContext)
                    .then(function (response) {console.log(response);})
                    .catch(function (error) {
                        console.log(error);
                        axios.put(`http://${import.meta.env.VITE_IP_ADRESS}:3000/api/contact/${contact.email}`, superContext)
                            .then(function (response) {console.log(response);})
                            .catch(function (error) {
                                console.log(error)});
                    });
            }
            setModalMessage(msg);
            setShowModal(true);

        });
    };


    return (
        <>
            <IconContext.Provider value={{ color: "undefined" }}>
                <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                    <div className="overflow-y">
                        <a id="a" href={"https://www.furnifyhome.eu/"}>
                            <picture>
                                <source srcSet={logo_dm} media="(prefers-color-scheme: dark)" />
                                <img id="logo" src={logo} alt="furnify" />
                            </picture>
                        </a>
                        <Form onSubmit={onSubmit}>
                            {showNextPart()}
                            <Modals handleClose={handleClose} show={showModal} message={modalMessage} title={"Confirmation"}/>

                        </Form>
                        <div className="bottom_btn">
                            <button data-testid="btn-nav-sidebar-previous" onClick={previousPart} hidden={showPrevious()}>
                                <div className="bottom_btn_content">
                                    <FaAnglesLeft />
                                </div>
                            </button>
                            <button data-testid="btn-nav-sidebar-next" onClick={nextPart} hidden={showNext()}>
                                <div className="bottom_btn_content">
                                    <FaAnglesRight />
                                </div>
                            </button>
                        </div>
                    </div>
                </nav>
                <div onClick={showSidebar} className="menu-bars">
                    {sidebar ? <AiOutlineClose size={40} /> : <AiOutlineMenu size={40} />}
                </div>
            </IconContext.Provider>
        </>
    )
}

export default Sidebar;
