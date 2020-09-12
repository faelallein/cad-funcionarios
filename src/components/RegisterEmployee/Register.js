import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { requestFirebase } from '../../util/firebase/RequestFirebase'
import firebase from '../../firebase'
import './style.css'
import { useEmployees } from '../../context/Employees';
import validationForm, { temp } from '../../util/validationForm/validationForm'

const useStyles = makeStyles((theme) => ({
    input: { width: '48%' },
    inputAmount: { width: '48%' },
    multiline:{ width: '100%' }
}));

function RegisterEmployee({closeModal}) {
    const { employees, setEmployees } = useEmployees()    
    const [ validation, setValidation] = useState(temp)
    const classes = useStyles();
    const [ employee, setEmployee ] = useState({
        first_name : '',
        last_name: '',
        dateBirth: '',
        office: '',
        amount: '',
        descriptionOffice: ''
    })
    

    const addFirebase = async () => {
        if (Object.values(validationForm(employee)).every(e => e.error === false)) {
            let key = firebase.database().ref().child('employee').push().key
            await requestFirebase.addOrUpdate(key, employee)
            setEmployees({ ...employees, [key]: employee })   
            setValidation({ ...temp })
            closeModal()
        } else {
            setValidation({ ...validationForm(employee) })
        }  
    }
    
    return <div className="register">
            <p style={{ marginTop: '0px', fontSize: 26 }}>Cadastro</p>
            <div style={{ width : '100%', margin: '20px 0px', display: 'flex', justifyContent: 'space-between'}}>
                <TextField label="Nome" error={validation.first_name.error} helperText={validation.first_name.type}
                    variant="outlined" size="small" className={classes.input} onChange={e => {setEmployee({...employee,  first_name : e.target.value})}}
                />
                <TextField label="Sobrenome" onChange={e => { setEmployee({ ...employee, last_name: e.target.value }) }}
                variant="outlined" size="small" className={classes.input} error={validation.last_name.error} helperText={validation.last_name.type}
                />
            </div>
            <div style={{ width: '100%', margin: '20px 0px', display: 'flex', justifyContent: 'space-between' }}>
                <TextField label="Data de Nascimento" onChange={e => {setEmployee({...employee, dateBirth : e.target.value})}}
                variant="outlined" size="small" className={classes.input} error={validation.dateBirth.error} helperText={validation.dateBirth.type}
                />
                <TextField label="Cargo" onChange={e => {setEmployee({...employee, office : e.target.value})}}
                variant="outlined" size="small" className={classes.input} error={validation.office.error} helperText={validation.office.type}
                />
            </div>
            <div style={{ margin: '20px 0px', display: 'flex', justifyContent: 'space-between' }}>
                <TextField label="Salário" onChange={e => {setEmployee({...employee, amount : e.target.value})}}
                variant="outlined" size="small" className={classes.inputAmount} error={validation.amount.error} helperText={validation.amount.type}
                />
            </div>
            <div style={{ margin: '20px 0px', display: 'flex', justifyContent: 'space-between' }}>
                <TextField label="Descrição do Cargo" multiline 
                    rows={5} variant="outlined" className={classes.multiline} onChange={e => {setEmployee({...employee, descriptionOffice: e.target.value})}}
                    error={validation.descriptionOffice.error} helperText={validation.descriptionOffice.type}
                />
            </div>
            <Button variant="contained" color="primary" onClick={()=> {addFirebase()}}
                    style={{ marginRight: '10px', backgroundImage: 'linear-gradient(90deg, #2fcf24 0%, #10640a 100%)' }}>
                Cadastrar 
            </Button>                
      </div>;
}

export default RegisterEmployee;