import React, { createContext, useState, useContext } from "react";

export const EmployeesContext = createContext();

export default function EmployeesProvider({ children }) {
    const [employees, setEmployees] = useState(null)

    return <EmployeesContext.Provider value={{
        employees,
        setEmployees,
    }}>
        {children}
    </EmployeesContext.Provider>

}

export function useEmployees() {
    const context = useContext(EmployeesContext)
    const { employees , setEmployees } = context;
    return { employees, setEmployees }
}