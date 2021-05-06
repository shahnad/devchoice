import React, { useRef, useEffect, useState } from "react";
import Axios from "axios";

const formFields = [
    ["Name of Nominee", "nominate someone"],
    ["email", "nominee email"],
    ["description", "reason for nomination"],
    ["nominatedby", "nominated by"]
  ];
const CreateLink = () =>{
  const [isFormCreated, setIsFormCreated] = useState(false);
  const onClickEnableForm = () => setIsFormCreated(true);

    return(
        <div className="App">
            <h1>Create Link</h1>
            {isFormCreated && (
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
                    <input type="submit" />
                </form>
            )}
            {!isFormCreated && (
                <input value="Create Link" type="button" onClick={onClickEnableForm} />
            )}
        </div>
    )

}

export default CreateLink