export const temp = {
    first_name : { error: false, type: "" },
    last_name : { error: false, type: "" },
    dateBirth : { error: false, type: "" },
    office: { error: false, type: "" },
    amount: { error: false, type: "" },
    descriptionOffice: { error: false, type: "" }
}

export default function validation(employee){
    let temp = {}

    temp.first_name = employee.first_name ? { error: false, type: "" } : { error: true, type: "Campo Obrigatório" }

    temp.last_name = employee.last_name ? { error: false, type: "" } : { error: true, type: "Campo Obrigatório" }

    temp.dateBirth = (/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i).test(employee.dateBirth)
     ? { error: false, type: "" } : { error: true, type: "Data não é valida" }

    temp.office = employee.office ? { error: false, type: "" } : { error: true, type: "Campo Obrigatório" }

    temp.amount = employee.amount ? { error: false, type: "" } : { error: true, type: "Campo Obrigatório" }

    temp.descriptionOffice = employee.descriptionOffice ? { error: false, type: "" } : { error: true, type: "Campo Obrigatório" }

    return temp
}