// Set color to price_change_percentage
const setColorForVolume = (values) => {
    let { value } = values

    if (!value && value !== 0) {
        return '-'
    }

    value = Number(value).toFixed(1)
    if (value === 0) {
        value = 0
    }
    if (+value > 0) {
        return <p style={{ color: 'green' }}>{value += '%'}</p>
    }
    else if (+value === 0) {
        return <p style={{ color: 'green' }}>0</p>
    }
    return <p style={{ color: 'red' }}>{value += '%'}</p>
}

export default setColorForVolume