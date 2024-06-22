import React, { useState } from 'react';
import { use2d } from '../../contexts/2dContext';
import { useTranslation } from 'react-i18next';

export function SliderHeightComponent({setWallProperties, wallProperties}) {
    const { t, i18n } = useTranslation();

  // Handle changing the slider
  const handleSliderChange = (event) => {
    const newValue = event.target.value;
    setWallProperties({height: newValue, thickness: wallProperties.thickness});  // Update the state with the new slider value
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', margin: '30px 0px 0px 10px'}}>
      <input
        className="slider"
        type="range"
        min="0.00"
        max="10"
        step="0.1"
        value={wallProperties.height}  // Bind the slider's value to the component's state
        onChange={handleSliderChange}  // Set the method to call on value change
      />
      <div style={{margin: '0px 0px 0px 10px'}}>{t('floorplan.height')}: {wallProperties.height}m</div>
    </div>
  );
}
