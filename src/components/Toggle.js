const Toggle = ({ toggle, handleToggleChange }) => {
    return (
        <button className='toggle-container' onClick={handleToggleChange}>
            <div className={`toggle-btn ${!toggle ? "disable" : ""}`}>
                {toggle ? "^ Ascending moves" : "v Descending moves"}
            </div>
        </button>
    );
};

export default Toggle;