import { Module } from "./module";
import { parseCsvData } from "./read_file_csv";
const MARGE = 1
let modules: Module[] = []

export const check = (val: any, varia: any, get2D: any,wallProperties:any) => {
    let func = val.functionalities
    let dim = val.dimensions
    

    let errors = {softer: false, demands: false, roomSize: false, points2D: false}

    //make sure to fill the modules
    if (modules.length == 0) {
        get_modules();
    }

    // change the size of the modules if bed is selected
    if (func.bed == true) {
        modules.forEach(mod => { mod.set_width_options(varia.size) })
    }
    //if bed is not selected make sure to return the smallest value
    else {
        modules.forEach(mod => { mod.set_width_options("140") })
    }

    //check if the exact combination is possible
    let result: Module[] = [];
    modules.forEach(mod => {
        if (mod.type(func.bed, func.office_space, func.sofa, func.storage_space)) {
            result.push(mod)
        }
    })
    //If we could not find any combination, we will try to find options where 1 is not equal and the others are
    if (result.length == 0) {
        console.log("ALGORITHM: " + "combination is not possible, looking for a softer one")
        errors.softer = true;
        modules.forEach(mod => {
            if (mod.softer_type(func.bed, func.office_space, func.sofa, func.storage_space)) {
                result.push(mod)
            }
        })
        //still not possible send message
        if (result.length == 0) {
            errors.demands = true;
            console.log("ALGORITHM: " + "softer combinations not found, please change the demands")
            return {possible:[{name: "", height: 0, width:0, depth:0, open: 0, closed:0,saved:0,bed:false,
            sofa:false,desk:false, storage:false, width_options:[],components:[]}], errors: errors};
        }
    }

    //check if room is rectangular
    if (val.rectangular) {
        // check size is correct
        let result_size: Module[] = [];
        result.forEach(mod => {
            if (mod.correct_size(dim.height, dim.length, dim.width)) {
                result_size.push(mod)
            }
        })
        if (result_size.length == 0) {
            errors.roomSize = true;
            console.log("ALGORITHM: " + "Room is not big enough for the combination")
        }
        result = result_size
        
    }
    //room has other 
    else {
        let sides2D = get2D.lines;
        if (sides2D.length!= 0) {
            let height = wallProperties.height;
            let sides: number[] = []
            let result_size: Module[] = [];
            sides2D.forEach(side => { sides.push(side.getLength()) })
            sides.sort().reverse()
            result.forEach(mod => {
                if (mod.correct_side(sides[0],height)) {
                    result_size.push(mod)
                }
            })
            if (result_size.length == 0) {
                errors.roomSize = true;
                console.log("ALGORITHM: " + "Room is not big enough for the combination")
            }
            result = result_size
        }
        else{
            errors.points2D= true;
            console.log("ALGORITHM: " + "No points given")
        }

    }
    const regularObjects=result.map(module=>{
        const regularObject={...module};
        return regularObject;
    })
    return {possible: regularObjects, errors:errors}

}

export const get_modules = () => {
    if(modules.length == 0){
        try {
            const parsedData = parseCsvData();
            parsedData.then(e => e.forEach(ev => modules.push(new Module(ev))))
            console.log("ALGORITHM: read in csv file")
        } catch (error) {
            console.log("ALGORITHM: ")
            console.error('Error parsing CSV:', error);
        }

    }
    
}