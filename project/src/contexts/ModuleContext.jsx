import { createContext, useContext, useState } from 'react';

export const ModuleContext = createContext();

// eslint-disable-next-line react/prop-types
export const ModuleProvider = ({ children }) => {
    const [errors, setErrors]= useState({softer: false, demands: false, roomSize: false, points2D: false})
    const [possible_modules, setPossileModules] = useState([{name: "", height: 0, width:0, depth:0, open: 0, closed:0,saved:0,bed:false,
    sofa:false,desk:false, storage:false, marge:0, width_options:[],components:[]}])
    const [chosen_module, setChosenModule] = useState({name: "", height: 0, width:0, depth:0, open: 0, closed:0,saved:0,bed:false,
    sofa:false,desk:false, storage:false, marge:0, width_options:[],components:[], scale:{x:1, y:1, z:1}})
    return (
        <ModuleContext.Provider
            value={{
                errors,
                setErrors,
                possible_modules,
                setPossileModules,
                chosen_module,
                setChosenModule
            }}>
            {children}
        </ModuleContext.Provider>
    )
}

export const useModuleContext = () => {
    return useContext(ModuleContext);
}