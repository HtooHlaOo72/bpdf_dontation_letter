export default function convertDate(dateText){//convert dd/mm/yyyy to Myanmar Date
    let [day,month,year]=dateText.split('/');
    day=convertNumber(day);
    month=convertMonth(month);
    year='၂၀'+convertNumber(year);
    const dateResult=year+' ခုနှစ်၊ '+month+'လ၊ '+day+' ရက်';
    return dateResult;
}

function convertNumber(text){
    const number=['၀','၁','၂','၃','၄','၅','၆','၇','၈','၉'];
    text=text.split('').map((word)=>number[word]).join('');
    return text;
}

function convertMonth(month){
    let months=[
        'ဇန်န၀ါရီ',
        'ဖေဖော်၀ါရီ',
        'မတ်',
        'ဧပြီ',
        'မေ',
        'ဇွန်',
        'ဇူလိုင်',
        'ဩဂုတ်',
        'စက်တင်ဘာ',
        'အောက်တိုဘာ',
        'နို၀င်ဘာ',
        'ဒီဇင်ဘာ'
    ];
    return months[month-1];
}
