export const animationApp = (data, className) => {
    var target = document.querySelectorAll(`[${data}]`)
    target.forEach(e => {
        e.classList.add(`${className}`)
    })
}