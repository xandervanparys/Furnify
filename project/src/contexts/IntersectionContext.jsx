import { createContext, useContext, useState } from 'react';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useConfiguratorContext } from './ConfiguratorContext';
import { useTranslation } from 'react-i18next'

const IntersectionContext = createContext();

export const IntersectionProvider = ({ children }) => {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const lng = navigator.language;
        i18n.changeLanguage(lng);
    }, [])

    const dObstructions = useRef({});
    const [errorBoxes, setErrorBoxes] = useState([]);
    const [modalMessage, setModalMessage] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const { getLightsAndOtherObstacles } = useConfiguratorContext();
    const obstacles = getLightsAndOtherObstacles();

    useEffect(() => {
        removeDObstruction();
    });


    // Add a component to the list of dObstructions when it mounts
    const addDObstruction = (mesh, obstructionKey) => {
        if (mesh && !dObstructions.current[obstructionKey]) {
            dObstructions.current[obstructionKey] = mesh; // Storing mesh with its ID as the key
        }
    };

    // Remove a component from the list of dObstructions when it unmounts/removed from contextprovider list
    const removeDObstruction = () => {
        const keys = obstacles.map(obstacle => obstacle.id);
        for (let key in dObstructions.current) {
            //check if key is in keys and if not remove it
            if (!keys.includes(key)) {
                delete dObstructions.current[key];
            }
        }
    };

    // Cleanup: remove all dObstructions when the component unmounts
    useEffect(() => {
        return () => {
            dObstructions.current = {};
        };
    }, []);

    const checkIntersections = () => {

        // Convert dictionary of meshes to an array of meshes
        const meshes = Object.values(dObstructions.current);

        // Create bounding boxes for the meshes
        const boundingBoxes = meshes.map(mesh => {
            const box = new THREE.Box3();
            if (mesh instanceof THREE.Group) {
                mesh.children.forEach(child => box.expandByObject(child));
            } else {
                mesh.geometry.computeBoundingBox();
                box.copy(mesh.geometry.boundingBox).applyMatrix4(mesh.matrixWorld);
            }
            return box;
        });

        // Check for intersections between each pair of bounding boxes
        let intersectionsDetected = false;
        const tempErrorBoxes = [];

        for (let i = 0; i < boundingBoxes.length; i++) {
            for (let j = i + 1; j < boundingBoxes.length; j++) {
                if (boundingBoxes[i].intersectsBox(boundingBoxes[j])) {
                    intersectionsDetected = true;
                    // Handle intersection
                    if (!tempErrorBoxes.includes(boundingBoxes[i])) {

                        tempErrorBoxes.push(boundingBoxes[i]);

                    }
                    if (!tempErrorBoxes.includes(boundingBoxes[j])) {

                        tempErrorBoxes.push(boundingBoxes[j]);

                    } 
                }
            }
        }

        if (intersectionsDetected) {
            setModalTitle(t('alert.yes').toString())
            setModalMessage( t('alert.adjust').toString())
        }

        if (!intersectionsDetected) {
            setModalTitle(t('alert.no').toString())
            setModalMessage(t('alert.proceed').toString()+". "+t('alert.again').toString());
        }
        //update errorBoxes
        setErrorBoxes(tempErrorBoxes);
    };

    const getErrorBoxes = () => {
        return errorBoxes;
    }


    const value = {
        addDObstruction,
        removeDObstruction,
        checkIntersections,
        getErrorBoxes,
        modalMessage,
        modalTitle

    };

    return (
        <IntersectionContext.Provider value={value}>
            {children}
        </IntersectionContext.Provider>
    );
};

export const useIntersectionContext = () => {
    return useContext(IntersectionContext);
};