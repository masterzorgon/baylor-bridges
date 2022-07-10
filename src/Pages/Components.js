import React from "react";

const Components = () => {
    return (
        <>
            <div>Components</div>
            <div className="grid grid-cols-4">
                <div>
                    <input type="checkbox" id="checkbox" />
                    <label htmlFor="checkbox">Checkbox</label>
                </div>

                <div>
                    <input type="radio" id="radio" />
                    <label htmlFor="radio">Radio</label>
                </div>

                <div>
                    <label htmlFor="text">Text</label>
                    <input type="text" id="text" />
                </div>

                <button>Button</button>
                <button primary="">Button</button>
                <button secondary="">Button</button>

                <select id="country" name="country">
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                </select>
            </div>
        </>
    );
};

export default Components;