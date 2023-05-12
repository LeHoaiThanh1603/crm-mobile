import React, { useState, useEffect } from 'react';
import './colorPicker.less';
import { SketchPicker } from 'react-color';
import { input } from '@/components/Input';

export default function ColorPicker({ hexaColor, onChange }) {
  const [display, setDisplay] = useState(false);
  const [color, setColor] = useState({ hex: hexaColor });

  const handleClick = () => {
    setDisplay(!display);
  };

  useEffect(() => {
    setColor({ hex: hexaColor });
  }, [hexaColor]);

  return (
    <input.medium
      prefix={
        <div className="color-picker-container">
          <div className="swatch" onClick={handleClick}>
            <div className="color" style={{ backgroundColor: color.hex }} />
          </div>
          {display && (
            <div className="popover">
              <div className="cover" onClick={handleClick} />
              <SketchPicker color={color} onChange={(color) => onChange(color.hex)} />
            </div>
          )}
        </div>
      }
      value={color.hex}
      onChange={(e) => onChange(e.target.value)}
    ></input.medium>
  );
}
