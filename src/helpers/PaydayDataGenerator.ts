
async function paydayDateGen(day: number){
    
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const payday = new Date(year, month, day);

    console.log(payday + "É maior ou igual a" + today)
    if(payday >= today){
        return payday;
    }else{
        const next_payday = new Date(year, month + 1, day)
        return next_payday;
    }
    
}
export { paydayDateGen }