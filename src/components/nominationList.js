
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
        const fetchData = async () => {
            try {
                const res = await Axios.get('http://localhost:8000/service/nominationgroup');
                if (isMounted.current) {
                    setNominationGroup(res.data);
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
                            <div key={nominationGroup[nomineename].nomineename} id="sidebar-left">
                                {nominationGroup[nomineename].nomineename}
                            </div>
                            <div id="main-content">
                                <li key={nominationGroup[nomineename].description} className="nomlistdata"><li>{nominationGroup[nomineename].description}</li></li>
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