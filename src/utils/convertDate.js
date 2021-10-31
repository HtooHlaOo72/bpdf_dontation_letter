export default function convertDate(dateText){//convert dd/mm/yyyy to Myanmar Date
    dateText=dateText.split("T")[0];
    let [year,month,day]=dateText.split('-');
    day=convertNumber(day);
    month=convertMonth(month);
    year=convertNumber(year);
    const dateResult=year+' ခုနှစ်၊ '+month+'၊ '+day+' ရက်';
    return dateResult;
}

function convertNumber(text){
    const number=['၀','၁','၂','၃','၄','၅','၆','၇','၈','၉'];
    text=text.split('').map((word)=>number[word]).join('');
    return text;
}

function convertMonth(month){
    let months=[
        'ဇန်န၀ါရီလ',
        'ဖေဖော်၀ါရီလ',
        'မတ်လ',
        'ဧပြီလ',
        'မေလ',
        'ဇွန်လ',
        'ဇူလိုင်လ',
        'ဩဂုတ်လ',
        'စက်တင်ဘာလ',
        'အောက်တိုဘာလ',
        'နို၀င်ဘာလ',
        'ဒီဇင်ဘာလ'
    ];
    return months[month-1];
}

