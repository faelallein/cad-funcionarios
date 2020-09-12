import firebase from '../../firebase'
const database = firebase.database();

export const requestFirebase = {
    addOrUpdate: (ref, data) => {
        return new Promise((resolve, reject) => {
            const fref = database.ref()

            let update = {}
            update[`/employees/` + ref] = data

            fref.update(update)
            resolve('Update')
        })
    },
    get: () => {
        return new Promise((resolve, reject) => {
            const fref = database.ref('employees')

            fref.once('value').then(s => {
                let value = s.val()
                resolve(value)
            })
        })
    },
    del: (ref) => {
        return new Promise((resolve, reject) => {
            const fref = database.ref(`/employees/${ref}`)

            fref.remove()
            resolve('Delete')
        })
    }
}