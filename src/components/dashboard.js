import React, { useRef, useEffect, useState } from "react";
import Axios from "axios";
import {Link, useHistory} from 'react-router-dom';
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import { useGoogleLogout  } from 'react-google-login';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const useStyles = makeStyles(theme => ({
    modal: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
        //maxWidth: "500px"
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    },
    form: {
        fontfamily: "Georgia",
        padding: "20px",
        width: "20%",
        maxWidth: "500px",
        background: "#f4f7f8"
    },
    area: {
        width: "100%",
        background: "rgba(234, 234, 250,.1)",
        border: "none",
        borderRadius: "4px",
        fontSize: "15px",
        outline: "0",
        padding: "10px",
        margin: "1em auto",
        boxSizing: "border-box",
        backgroundColor: "#e8eeef",
        color: "#8a97a0"
    },
    submit: {
        color: "#FFF",
        margin: "1em auto",
        background: "#1abc9c",
        fontSize: "18px",
        textAlign: "center",
        fontStyle: "normal",
        width: "50%",
        border: "1px solid #16a085",
        borderWidth: "1px 1px 3px",
        marginBottom: "10px",
        padding: "10px",
        marginLeft:"90px",
        borderRadius:"5px"
    },
    label: {
        color: "#161717",
        textAlign: "center",
        fontSize: "18px",
        paddingLeft:"35px"
    },
    p: {
        color: "#161717",
        textAlign: "center",
        fontSize: "18px",

    }
}));
const Dashboard = props => {
    const [nominationList, setNominationList] = useState([]);
    const [nominationCount, setNominationCount] = useState([]);
    const [teamwiseNomination, setTeamwiseNomination] = useState([]);
    const [image, setImage] = useState("");
    const [open, setOpen] = useState(false);
    const [nameText, setNameText] = useState("");
    const classes = useStyles();

    const isMounted = useRef(false);
    const history = useHistory();
    

    useEffect(() => {
        isMounted.current = true;
        return () => isMounted.current = false;
    }, []);

    useEffect(() =>{
     const userImage = window.localStorage.getItem("userImage");
     setImage(userImage);
    })

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


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await Axios.get('http://localhost:8000/service/teamwisenomination');
                if (isMounted.current) {
                    setTeamwiseNomination(res.data);
                    console.log("Team wise nomination from server :" + res.data);
                }
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);

    const onLogoutSuccess = (res) => {
        localStorage.removeItem("loginEmail");
        localStorage.removeItem("userImage");
        history.push("/");
        console.log("Logged out successfully !");
    }

    const onFailure = () => {
        console.log("Handle failure cases !")
    }
    const { signOut } = useGoogleLogout ({
        clientId,
        onLogoutSuccess,
        onFailure
    })


    return (
        <div className="App">
            <div className="navbar-nav">
                <a><Link to={'/dashboard'} className="nav-link"> <b>Dashboard</b> </Link></a>
                <a><Link to={'/createLink'} className="nav-link"> <b>Create Link</b> </Link></a>
                <div className="profileImage">
                    <img src={image}></img>
                    <span className="dropdown-content">
                        <a href="" onClick={signOut}>Log out</a>
                    </span>
                </div>
            </div>


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
                                            <label key={data.nomineename}><b>{data.nomineename}</b></label>
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
                                <div className="grid-container">

                                {
                                    nominationCount.map(data => (
                                        <div key={data.id}>
                                            <div onClick={() => {setOpen(!open); }} className="count badge" >
                                                <span className="badgenumber" value={data.count} key={data.count}>{data.EmailCount}</span>
                                                <span className="countname" key={data.nomineename}  onClick={()=>setNameText(data.nomineename)}>{data.nomineename}</span>
                                            </div>
                                        </div>
                                    ))
                                }
                                </div>
                            </div>
                            <div className="space_1 tile">
                                <h3>Teamwise Nominations</h3>
                                <div className="grid-container">
                                    {
                                        teamwiseNomination.map(data =>(
                                        <div key={data.id} className="team-1">
                                            <h5 key={data.nomineeteam}>{data.nomineeteam}</h5>
                                            <span key={data.nomineename} className="data-1">{data.nomineename}</span>
                                        </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
                className={classes.modal}>
                <form className={classes.form}>
                    <label className={classes.label}>Are you sure to confirm the winner</label>
                    <p className={classes.p}><b>{nameText}</b></p>
                    <input className={classes.submit} type="submit" value="Confirm" />
                </form>
            </Modal>
        </div>
    )
}

export default Dashboard;