const dataStored = document.querySelector('.data-stored')
const downloadedData = document.querySelector('.downloaded-data')
const bars = [...document.querySelectorAll('.progress-total')]
const ranges = [...document.querySelectorAll('.section-calculator-slider-data-input')]

const barCosts = {
    stored: {
        min: 1,
        max: 1000,
        multiplier: 1000,
        companies: {
            logotype: 0.015,
            amazon: 0.06,
            microsoft: 0.07,
            google: 0.065,
        }
    },
    downloaded: {
        min: 1,
        max: 1000,
        multiplier: 1000,
        companies: {
            logotype: 0.015,
            amazon: 0.09,
            microsoft: 0.1,
            google: 0.12,
        }
    }
}


const init = () => {
    const maxTotal = bars.reduce((max,bar) => Math.max(getProgressMaxValue(bar.dataset.company),max),0)
    bars.map(bar => {
        bar.max = maxTotal;
        bar.min = getProgressMinValue(bar.dataset.company);
        bar.value = getProgressValue(bar.dataset.company);
    })
}

const getProgressValue = (company, type) => ranges.reduce((acc, input) => acc + [barCosts[input.dataset.type]].map(cost => (type === 'min' ? cost.min : type === 'max' ? cost.max : input.value) * cost.multiplier * cost.companies[company])[0],0)
const getProgressMinValue = (company) => getProgressValue(company, 'min')
const getProgressMaxValue = (company) => getProgressValue(company,'max')

const setProgressValues = () => bars.forEach(bar => bar.value = getProgressValue(bar.dataset.company))

const onInputHandler = () => {
    const [...rest] = bars.map((item) => item.value);

    document.querySelectorAll('.logo, .amazon, .microsoft, .google').forEach((element, i) => {
        element.textContent = rest[i]
    })

    setProgressValues()
}

dataStored.addEventListener("input", (e) => {
   onInputHandler(e.currentTarget);
})

downloadedData.addEventListener("input", (e)=> {
    onInputHandler(e.currentTarget)

})

init()