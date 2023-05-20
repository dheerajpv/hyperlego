import { ChangeEvent } from "react";

interface BooleanFieldProps {
    name: string;
    value: boolean;
    onChange: (val: boolean, event: ChangeEvent<HTMLInputElement>) => void;
}

const BooleanField = ({ name, value, onChange }: BooleanFieldProps) => {
    return (
        <div className="flex flex-row justify-between mx-2">
            <div>
                <input
                    type="radio"
                    value="false"
                    name={name}
                    id={`${name}-no`}
                    onChange={(e) => onChange(false, e)}
                    checked={!value}
                />
                <label htmlFor={`${name}-no`} className="ml-1">
                    No
                </label>
            </div>
            <div>
                <input
                    type="radio"
                    value="true"
                    name={name}
                    id={`${name}-yes`}
                    onChange={(e) => onChange(true, e)}
                    checked={value}
                />
                <label htmlFor={`${name}-yes`} className="ml-1">
                    Yes
                </label>
            </div>
        </div>
    );
};

export default BooleanField;
