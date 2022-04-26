/**
 * Input
 *
 * Input variables are passed
 *
 * @author Sam Johnston
 * @id W17004648
 * @github https://github.com/SamJohnstonNE/dissertation
 */

const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
        placeholder={placeholder}
        type={type}
        step="0.0001" // value in ether format
        value={value}
        onChange={(e) => handleChange(e, name)}
        className="my-2 w-full rounded-full p-2 outline-none text-black border-none text-sm"
    />
);

export default Input;
