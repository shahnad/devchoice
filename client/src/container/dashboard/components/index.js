import React from "react";
import { makeStyles, CssBaseline } from "@material-ui/core";
import Appbar from "../../../components/Appbar";


const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
    },

}));

export default function Dashboard(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Appbar {...props}/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                {props.children}
            </main>
        </div>

    );
}
