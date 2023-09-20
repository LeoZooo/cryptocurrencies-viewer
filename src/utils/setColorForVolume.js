// Set color to price_change_percentage
const setColorForVolume = (values, priceName) => {
    let value

    if (priceName === 'price_change_percentage_1h_in_currency') {
        value = values.value
    }
    else if (priceName === 'price_change_percentage_24h_in_currency') {
        value = values.value
    }
    else {
        value = values.value
    }

    if (!value) {
        return '-'
    }

    value = Number(value).toFixed(1)
    if (value === 0) {
        value = 0
    }
    if (+value >= 0) {
        return <p style={{ color: 'green' }}>{value += '%'}</p>
    }
    else {
        return <p style={{ color: 'red' }}>{value += '%'}</p>
    }
}

export default setColorForVolume