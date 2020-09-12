import React, { useEffect , memo} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import Fab from '@material-ui/core/Fab'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import TableRow from '@material-ui/core/TableRow';
import { requestFirebase } from '../util/firebase/RequestFirebase'
import { LocalStorage } from '../util/localstorage/LocalStorage'
import { useEmployees } from '../context/Employees'
import ModalEdit from './EditEmployee/ModalEdit'

const columns = [
    { id: 'name', label: 'Nome', minWidth: 170 },
    { id: 'dateBirth', label: 'Data de Nascimento', minWidth: 100 },
    { id: 'office', label: 'Cargo', minWidth: 100 },
    { id: 'amount', label: 'Salário', minWidth: 100 },
    { id: 'edit', label: 'Editar', maxWidth: 80 },
    { id: 'del', label: 'Deletar', maxWidth: 80 },
];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

function ListEmployees() {
    const classes = useStyles();
    const { employees, setEmployees } = useEmployees()
    const [ page, setPage] = React.useState(0);
    const [ rowsPerPage, setRowsPerPage] = React.useState(10);
    const [ rows, setRows ] = React.useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };   

    useEffect(() => {  
        const createData = (name, dateBirth, office, amount, key) => {
            let edit = <ModalEdit keyUnq={key}/>
            let del = <Fab size="small" color="secondary" aria-label="edit" onClick={() => deleteFirebase(key)}
                style={{ backgroundImage: 'linear-gradient(90deg, #c21616 0%, #630c0c 100%)' }}><DeleteForeverIcon /></Fab>

            return { name, dateBirth, office, amount, edit, del, key };
        }

        const deleteFirebase = (key) => {
            requestFirebase.del(key)

            let aux = employees
            delete aux[key]
            setEmployees({...aux})
        }
        
        const attRows = (employees, createData) => {
            let auxArray = Object.values(employees).map((element, index) =>
                createData(`${element.first_name} ${element.last_name}`, element.dateBirth, element.office, element.amount, Object.keys(employees)[index])
            )

            return auxArray
        }

        if (employees){
            setRows(attRows(employees, createData))
            LocalStorage.addLocalStorage('employees', employees)
        }

    },[employees, setEmployees])

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    <b>{column.label}</b> 
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.key}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default memo(ListEmployees)