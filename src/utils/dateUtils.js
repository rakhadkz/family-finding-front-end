
export const last12months = () => {
    let monthName = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    let d = new Date();
    d.setDate(1);
    let res = []
    for (let i=0; i<=11; i++) {
        res.push(monthName[d.getMonth()])
        d.setMonth(d.getMonth() - 1);
    }
    return res.reverse()
}