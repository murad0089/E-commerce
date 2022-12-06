export default function getdate(date){
    const data=new Date(date)
    const day=data.getDate()
    const month=data.getMonth()
    const year=data.getFullYear()
    let monthname
    switch (month) {
        case 0:
            monthname='Jan'
            break;
        case 1:
            monthname='Feb'
            break;
        case 2:
            monthname='Mar'
            break;
        case 3:
            monthname='Apr'
            break;
        case 4:
            monthname='May'
            break;
        case 5:
            monthname='Jun'
            break;
        case 6:
            monthname='Jul'
            break;
        case 7:
            monthname='Aug'
            break;
        case 8:
            monthname='Sep'
            break;
        case 9:
            monthname='Oct'
            break;
        case 10:
            monthname='Nov'
            break;
        case 11:
            monthname='Dec'
            break;
    
        
    }
    return `${day} ${monthname} ${year}`
}