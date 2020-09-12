import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './style.css'
import { requestFirebase } from '../../util/firebase/RequestFirebase'
import { useEmployees } from '../../context/Employees'
import validationForm, { temp } from '../../util/validationForm/validationForm'

const useStyles = makeStyles((theme) => ({
    input: { width: '48%' },
    inputAmount: { width: '48%' },
    multiline: { width: '100%' },
}));

function EditEmployee({keyUnq , closeModal}) {    
    const { employees, setEmployees } = useEmployees()   
    const [ employee, setEmployee ] = useState(employees[keyUnq])
    const [ validation, setValidation ] = useState(validationForm(employee))

    const classes = useStyles();

    const update = async () => {    
        if (Object.values(validationForm(employee)).every(e => e.error === false)){
            await requestFirebase.addOrUpdate(keyUnq, employee)
            setEmployees({ ...employees, [keyUnq]: employee })
            setValidation({ ...temp })
            closeModal()
        } else {
            setValidation({ ...validationForm(employee) })
        }        
    }

    return <div className="edit">
        <p style={{marginTop:'0px', fontSize: 26}}>Editar</p>
        <div style={{ width: '100%', margin: '20px 0px', display: 'flex', justifyContent: 'space-between' }}>
            <TextField label="Nome" defaultValue={employee.first_name} error={validation.first_name.error} helperText={validation.first_name.type}
                variant="outlined" size="small" className={classes.input} onChange={e => { setEmployee({ ...employee, first_name: e.target.value }) }}
            />
            <TextField label="Sobrenome" onChange={e => { setEmployee({ ...employee, last_name: e.target.value }) }}
                variant="outlined" size="small" className={classes.input} defaultValue={employee.last_name} 
                error={validation.last_name.error} helperText={validation.last_name.type}
            />
        </div>
        <div style={{ width: '100%', margin: '20px 0px', display: 'flex', justifyContent: 'space-between' }}>
            <TextField label="Data de Nascimento" onChange={e => { setEmployee({ ...employee, dateBirth: e.target.value }) }}
                variant="outlined" size="small" className={classes.input} defaultValue={employee.dateBirth} 
                error={validation.dateBirth.error} helperText={validation.dateBirth.type}
            />
            <TextField label="Cargo" onChange={e => { setEmployee({ ...employee, office: e.target.value }) }}
                variant="outlined" size="small" className={classes.input} defaultValue={employee.office}
                error={validation.office.error} helperText={validation.office.type}
            />
        </div>
        <div style={{ margin: '20px 0px', display: 'flex', justifyContent: 'space-between' }}>
            <TextField label="Salário" onChange={e => { setEmployee({ ...employee, amount: e.target.value }) }}
                variant="outlined" size="small" className={classes.inputAmount} defaultValue={employee.amount}
                error={validation.amount.error} helperText={validation.amount.type}
            />
        </div>
        <div style={{ margin: '20px 0px', display: 'flex', justifyContent: 'space-between' }}>
            <TextField label="Descrição do Cargo" multiline defaultValue={employee.descriptionOffice}
                rows={5} variant="outlined" className={classes.multiline} onChange={e => { setEmployee({ ...employee, descriptionOffice: e.target.value }) }}
                error={validation.descriptionOffice.error} helperText={validation.descriptionOffice.type}
            />
        </div>
        <Button variant="contained" color="primary" onClick={() => { update() }}
            style={{ marginRight: '10px', backgroundImage: 'linear-gradient(90deg, #2fcf24 0%, #10640a 100%)' }}>
            Editar
        </Button>
    </div>;
}

export default EditEmployee;