import React, { useRef, useEffect, useState } from "react";
import Axios from "axios";
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
    const [nominationList, setNominationList] = useState([]);
    const [nominationCount, setNominationCount] = useState([]);

    const isMounted = useRef(false);
    const history = useHistory();
    

    useEffect(() => {
        isMounted.current = true;
        return () => isMounted.current = false;
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await Axios.get('http://localhost:8000/service/nominations');
                if (isMounted.current) {
                    setNominationList(res.data);
                    console.log("Nomination data from server :" + res.data);
                }
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await Axios.get('http://localhost:8000/service/nominationcount');
                if (isMounted.current) {
                    setNominationCount(res.data);
                    console.log("Nomination count data from server :" + res.data);
                }
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);


    return (
        <div className="App">
            <h1>Dev Choice Awards</h1>
            <div className="container">
                <div className="column-1 box">
                    <h3>Menu</h3>
                    <div className="navlist menu">
                        <span className="menuitem link" onClick={() => history.push('/createLink') }>Create Link</span>
                    </div>
                    <div className="navlist menu">
                        <span className="menuitem link">LINK 2</span>
                    </div>
                </div>
                <div className="column-2 box">
                    <div className="levelmain">
                        <h3>Recent Nominations</h3>
                        {
                            !nominationList.length && (<div className="nonominationdata">Sorry, no nominations to display !</div>)
                        }

                        <div className="grid-container">
                            {
                                nominationList.map(data => (
                                    <div key={data.id} className="nomination item grid-item">
                                        <div className="nominateIcon">
                                            <img src="/images/nominate_icon.PNG"></img>
                                        </div>
                                        <span className="">
                                            <label key={data.nominee}><b>{data.nominee}</b></label>
                                        </span>
                                        <span className="">
                                            <p key={data.description}>{data.description}</p>
                                        </span>
                                        <div className="nominatedby user">
                                            <span key={data.nominatedby}>Nominated by: {data.nominatedby}</span>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="leveldown">
                        <div className="container">
                            <div className="space_1 tile">
                                <h3>Previous Winners</h3>
                                <div className="oldwinner">
                                    <div className="winnerIcon">
                                        <img src="/images/trophy1.png"></img>
                                        <span className="winner name">Vinod Mathew</span>
                                        <span className="winner date">25 Apr 2021</span>
                                    </div>
                                </div>
                            </div>
                            <div className="space_1 tile">
                                <h3>Nominations Count</h3>
                                {
                                    !nominationCount.length && (<div className="nonominationdata">No nominations count to display !</div>)
                                }
                                {
                                    nominationCount.map(data => (
                                        <div key={data.id}>
                                            <div className="count badge" >
                                                <span className="badgenumber" key={data.count}>{data.count}</span>
                                                <span className="countname" key={data.nominee}>{data.nominee}</span>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="space_1 tile"><h3>Old Nominations</h3></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;