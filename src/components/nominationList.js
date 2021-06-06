
import React, { useRef, useEffect, useState } from "react";
import Axios from "axios";
import {Link} from "react-router-dom";
const moment = require('moment');

const NominationList = () => {
    const [nominationGroup, setNominationGroup] = useState({});
    const uniqueName = [];
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;
        return () => isMounted.current = false;
    }, []);

    useEffect(() => {
        let newGroup = {};
        const fetchData = async () => {
            try {
                const res = await Axios.get('http://localhost:8000/service/nominationgroup');
                if (isMounted.current) {
                    for (const elem of res.data){
                        if (!newGroup.hasOwnProperty(elem.nomineename)){
                            newGroup[elem.nomineename] = {
                                createdAt: "",
                                description: []
                            };
                        }
                        newGroup[elem.nomineename].description.push(elem.description);
                        newGroup[elem.nomineename].createdAt = elem.createdAt;
                    }
                    setNominationGroup(newGroup);
                    console.log("Nomination data from server :" + res.data);
                }
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="App">
            <div className="leftNavItem">
                <a><Link to={'/dashboard'} className="nav-link"> <b>Dashboard</b> </Link></a>
            </div>
            <h1 className="header"><b>Nomination List</b></h1>
            <div className="wrap">
                <div id="sidebar-left">
                    <th>Nominee name</th>
                </div>
                <div id="main-content">
                    <th>Reason for Nomination</th>
                </div>
                <div id="sidebar-right">
                    <th>Date</th>
                </div>
            </div>

            {

                Object.keys(nominationGroup).map(nomineename  =>(
                <div className="wrap">
                            <div key={nomineename} id="sidebar-left">
                                {nomineename}
                            </div>
                            <div id="main-content">

                                {
                                    nominationGroup[nomineename].description.map(desc => (
                                        <li key={desc} className="nomlistdata"><li>{desc}</li></li>
                                    ))
                                }
                            </div>
                            <div key={nominationGroup[nomineename].createdAt} id="sidebar-right">
                                {moment(nominationGroup[nomineename].createdAt).format('DD-MMM-YYYY')}
                            </div>
                    <hr></hr>
                </div>
                ))}
        </div>
    )

}
export default NominationList;