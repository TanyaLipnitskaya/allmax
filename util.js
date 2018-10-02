export const setToLS = (key, value) => {
    try {
        localStorage.setItem(key, value)
    } catch (error) {
        alert(error)
    }
};
export const getFromLS = (key) => {
    try {
        return localStorage.getItem(key)
    } catch (error) {
        alert(error)
    }
};
export const setToLSasJSON = (key, value) => {
    try {
        const JSONedValue = JSON.stringify(value)
        localStorage.setItem(key, JSONedValue)
    } catch (error) {
        alert(error)
    }
};
export const getFromLSasJSON = (key) => {
    try {
        const lsItem = localStorage.getItem(key)
        if (lsItem === null) {
            alert("Alas")
        }
        return JSON.parse(lsItem)

    } catch (error) {
        alert(error)
    }
};