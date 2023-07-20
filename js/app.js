document.addEventListener('DOMContentLoaded', app);
const formulario = document.querySelector('.formulario')
const resultado = document.querySelector('.resultado')

const obj = {
    day: '',
    month: '',
    year: ''
}

function app(){
    
    const inputDay = document.querySelector('.day');
    const inputMonth = document.querySelector('.month');
    const inputYear = document.querySelector('.year');
    
    inputDay.addEventListener('blur', leerApp);
    inputMonth.addEventListener('blur', leerApp);
    inputYear.addEventListener('blur', leerApp);
    formulario.addEventListener('submit', calcularEdad)
}

function leerApp(e){
    e.preventDefault();
    console.log(e.target.value);
    limpiarHTML(e.target.parentElement);
    //Agregaremos un Switch Mas Tarde
    if(e.target.value.trim() === ''){
        console.log(`el campo ${e.target.name} es obligatorio`);
        mensajeError(`The field "${e.target.name}" is required`, e.target.parentElement)
        return;
    }
    if(e.target.classList.contains('day') && e.target.value > Number(31)){
        console.log('No es Valido');
        mensajeError(`Must be a valid "${e.target.name}"`, e.target.parentElement)
        return;
    }
    if(e.target.classList.contains('month') && e.target.value > Number(12)){
        console.log('No es Valido');
        mensajeError(`Must be a valid "${e.target.name}"`, e.target.parentElement)
        return;
    }
    if(e.target.classList.contains('year') && e.target.value > Number(new Date().getFullYear())){
        console.log('No es Valido');
        mensajeError(`Must be a valid "${e.target.name}"`, e.target.parentElement)
        return;
    }
    obj[e.target.name] = e.target.value;
    console.log(obj);
}

function mensajeError(mensaje, referencia){
    console.log(referencia);
    const divError = document.createElement('p')
    divError.classList.add('error')
    divError.textContent = mensaje;

    const inputText = referencia.firstElementChild;
    console.log(inputText);
    inputText.classList.remove('inputText')
    inputText.classList.add('inputTextError');

    referencia.appendChild(divError);
}

function calcularEdad(e){
    e.preventDefault();
    const {day, month, year} = obj;
    if(day && month && year){
        const nacimiento = new Date(`${month}, ${day}, ${year}`);
        console.log(nacimiento);
        const diff = Date.now() - nacimiento;
        console.log(diff);
        let ageDate = new Date(diff)
        console.log(ageDate);
        let ageYears = ageDate.getUTCFullYear() - 1970; //1970 es la fecha que empezo a contar a partir de
        let ageMonth = ageDate.getUTCMonth();
        let ageDay = ageDate.getUTCDate() - 1;
        console.log(ageYears, ageMonth, ageDay);
        imprimirEdad(ageYears, ageMonth, ageDay);
    }else{
        const day = document.querySelector('.inputsAge__day');
        const month = document.querySelector('.inputsAge__month');
        const year = document.querySelector('.inputsAge__year');

        const divErrorDay = document.createElement('p')
        divErrorDay.classList.add('error')
        divErrorDay.textContent = `The field "Day" is required`

        const divErrorMonth = document.createElement('p')
        divErrorMonth.classList.add('error')
        divErrorMonth.textContent = `The field "Month" is required`

        const divErrorYear = document.createElement('p')
        divErrorYear.classList.add('error')
        divErrorYear.textContent = `The field "Year" is required`

        day.appendChild(divErrorDay);
        month.appendChild(divErrorMonth);
        year.appendChild(divErrorYear);

    }

}

function imprimirEdad(years, months, days){
    const yearInput = document.querySelector('.yearResult')
    const monthInput = document.querySelector('.monthResult')
    const dayInput = document.querySelector('.dayResult')

    yearInput.textContent = years;
    monthInput.textContent = months;
    dayInput.textContent = days;

}

function limpiarHTML(referencia){
    const alerta = referencia.querySelector('.error')
    const alertaText = referencia.querySelector('.inputTextError')
    if(alerta){
        alerta.remove()
    }
    if(alertaText){
        alertaText.classList.remove('inputTextError')
        alertaText.classList.add('inputText')
    }
}
