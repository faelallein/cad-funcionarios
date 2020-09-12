import React, { useEffect, useCallback } from 'react';
import './App.css';
import ListEmployees from './components/ListEmployees'
import ModalRegister from './components/RegisterEmployee/ModalRegister'

import { requestFirebase } from './util/firebase/RequestFirebase'
import { LocalStorage } from './util/localstorage/LocalStorage'
import { useEmployees } from './context/Employees'
import { animationApp } from './animations/animations'

function App() {
    const { setEmployees } = useEmployees()

    const getFirebase = useCallback(async () => {
        const firebase = await requestFirebase.get()
        const storage = LocalStorage.getLocalStorage('employees')

        if (storage === null || storage !== firebase) {
            LocalStorage.addLocalStorage('employees', firebase)
        }
        setEmployees(firebase)

        animationApp('data-title', 'reset')
        animationApp('data-reg', 'reset')
        animationApp('data-list', 'reset')
    }, [setEmployees])


    useEffect(() => {
        getFirebase()
    }, [getFirebase])

    return (
        <section className="App">
            <p className="title" data-title>Cadastro de Funcionarios</p>
            <div data-reg>
                <ModalRegister />
            </div><br /><br />
            <div data-list>
                <ListEmployees />
            </div>
        </section>
    );
}

export default App;