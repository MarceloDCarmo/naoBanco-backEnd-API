
async function paydayDateGen(day: number){
    
    const payday = new Date(day);
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    if(payday >= today){
        const next_payday = new Date(year, month + 1, day)
        return next_payday;
    }else{
        const next_payday = new Date(year, month, day)
        return next_payday;
    }
    
}
export { paydayDateGen }