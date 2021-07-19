import React, { useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import EmployeeList from './EmployeeList'
import SelectedDetails from './SelectedList'
import AlertDialogue from '../../../../components/Dialogue'
import { makeStyles, createStyles } from '@material-ui/core/styles';
import SelectPersonDialogue from '../../../../components/Dialogue/SelectedDialogue'

const useStyles = makeStyles((theme) => createStyles({
    root: {
        padding: 20
    },
    title: {
        marginBottom: theme.spacing(5),
        textAlign: 'center'
    }
}));

export default function NominationList() {
    const [openDialogue, setopenDialogue] = useState(false)
    const [selectedPerson, setselectedPerson] = useState({
        openAlert: false,
        person: '',
    })
    const classes = useStyles();
    const [employees, setEmployees] = useState({
        employeeList: [
            { id: 0, name: 'SHAHNAD', department: 'driver' },
            { id: 1, name: 'VINAY', department: 'sales' },
            { id: 2, name: 'DAS', department: 'marketing' },
            { id: 3, name: 'VINOD', department: 'sales' },
            { id: 4, name: 'RAM', department: 'audit' },
            { id: 5, name: 'KAVYA', department: 'sales' },
            { id: 6, name: 'MALU', department: 'desk' },
            { id: 7, name: 'ANJALY', department: 'security' },
            { id: 8, name: 'VINOD', department: 'sales' },
            { id: 9, name: 'RAM', department: 'audit' },
            { id: 10, name: 'KAVYA', department: 'sales' },
            { id: 11, name: 'MALU', department: 'desk' },
            { id: 12, name: 'ANJALY', department: 'security' },
        ],
        selectedList: []
    })

    const selectEmployeeList = (row) => {
        if (employees?.selectedList?.length === 3) {
            setopenDialogue(true)
        } else {

            setselectedPerson({ ...selectedPerson, openAlert: true, person: row })

        }
    }

    const removeEmployeeFromSelected = (row) => {
        const newArray = [...employees.selectedList]
        const data = newArray.filter(emp => emp.id !== row.id)
        setEmployees({
            ...employees,
            employeeList: [...employees.employeeList, row],
            selectedList: data
        })
    }

    const handleCloseDialogue = () => {
        setopenDialogue(false)
    }

    const EmployeeConfirmVotes = () => {

        const newArray = [...employees.employeeList]
        const data = newArray.filter(emp => emp.id !== selectedPerson?.person?.id)

        setEmployees({
            ...employees,
            employeeList: data,
            selectedList: [...employees.selectedList, selectedPerson?.person]
        })
        handleCloseSelectedersonDialogue()
    }

    const VoteCompleted = () => {
        console.log('confirmed');

    }

    const handleCloseSelectedersonDialogue = () => {
        setselectedPerson({ ...selectedPerson, openAlert: false, person: {} })
    }


    return (
        <>
            <AlertDialogue open={openDialogue} handleCloseDialogue={handleCloseDialogue} dialogueBody={
                {
                    title: "You can nominate 3 employees only",
                    description: 'You can choose 3 employees at a time . are you sure to proceed ?',
                    cancelLabel: 'Cancel',
                    okLabel: 'Confirm'
                }}
                yes={VoteCompleted}
                no={handleCloseDialogue}
            />
            <SelectPersonDialogue
                open={selectedPerson.openAlert}
                handleCloseDialogue={handleCloseSelectedersonDialogue}
                dialogueBody={
                    {
                        title: `You are selected ${selectedPerson?.person?.name}`,
                        description: 'Say something about this person ',
                        cancelLabel: 'Cancel',
                        okLabel: 'Submit'
                    }}
                yes={EmployeeConfirmVotes}
                no={handleCloseSelectedersonDialogue}

            />

            <Grid container spacing={0} className={classes.root} >
                <Grid item xs={employees?.selectedList?.length ? 8 : 12} direction="row" justifyContent="space-between" >
                    <Typography variant="h5" className={classes.title}>
                        Selected for nominations
                    </Typography>
                    <EmployeeList employees={employees} selectEmployeeList={selectEmployeeList} />
                </Grid>
                {employees?.selectedList?.length && <Grid item xs={4} >
                    <Typography variant="h5" className={classes.title}>
                        Selected
                    </Typography>
                    <SelectedDetails employees={employees} removeEmployeeFromSelected={removeEmployeeFromSelected} />
                </Grid>}
            </Grid>
        </>
    )
}
