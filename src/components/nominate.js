import React, { useRef, useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import Axios from "axios";

const formFields = [
    ["Name of Nominee", "nominate someone"],
    ["email", "nominee email"],
    ["description", "reason for nomination"],
    ["nominatedby", "nominated by"]
];
const Nominate = () => {
    return (
        <div>
            <h1>Nominate</h1>
            <form className="linkForm inputForm">
                    {formFields.map(([name, value]) => {
                        return (
                        <div className="inputField" key={name}>
                            { 
                            name === "description" ? (
                                <textarea  placeholder={value} name={name} />
                            ) : (
                                <input placeholder={value} name={name} type="text" />
                            ) }
                        </div>
                        );
                    })}
                    <span className="nominatebutton">
                    <input type="submit" />
                    </span>
                    
                </form>
        </div>
    )
}

export default Nominate