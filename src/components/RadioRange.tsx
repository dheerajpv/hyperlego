import { ChangeEvent, Fragment, useEffect } from "react";

interface RadioRangeProps {
    name: string;
    max: number;
    value: number;
    onChange: (val: number, event: ChangeEvent<HTMLInputElement>) => void;
}

const RadioRange = ({ max, name, value, onChange }: RadioRangeProps) => {
    return (
        <div className="flex flex-row justify-between items-center mx-2">
            {Array.from({ length: max + 1 }, (_, i) => (
                <div key={i} className="flex flex-row justify-between mr-1">
                    <input
                        type="radio"
                        value={i}
                        name={name}
                        id={`${name}-${i}`}
                        onChange={(e) => onChange(i, e)}
                        checked={value === i}
                    />
                    <label htmlFor={`${i}`} className="mx-1">
                        {i}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default RadioRange;
