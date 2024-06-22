import React, { createContext, useContext, useState } from 'react';

const RoomWallLightupContext = createContext();

export const RoomWallLightupProvider = ({ children }) => {
    
    const [selectedWall, setSelectedWall] = useState(null);

  return (
    <RoomWallLightupContext.Provider value={{ selectedWall, setSelectedWall }}>
      {children}
    </RoomWallLightupContext.Provider>
  );
};

export const useRoomWallLightupContext = () => useContext(RoomWallLightupContext);