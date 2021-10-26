import dayjs from 'dayjs';
import { useEffect } from 'react';
import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from 'react-component-export-image';

const style={
    width:"100%",
    height:"120vw",
    backgroundColor:'yellow',
    color:'black'
}

const MustExport=(props)=>{
    const {name,amount,reason} = props.data;
    const exportComponent=()=>{
        exportComponentAsPNG(props.toExport);
    }
    useEffect(exportComponent,[]);
    return (
    <div style={style} ref={props.toExport}>
        <div>Logo</div>
        <h1 className='certi-header'>Bago People Defence Force - BPDF</h1>
        <h2 className='certi-sub-header'>မှတ်တမ်းတင်ဂုဏ်ပြုလွှာ</h2>
        <span>{dayjs().format('DD/MM/YY')}</span>
        <p>
            ပြည်သူလူထုအား စစ်ကောင်စီမှ လက်နက်ကိုင်ကာ အကြမ်းဖက်နေသော စစ်အာဏာရှင်စနစ်ကျရှုံးရေးအတွက် 
            အသက်နှင့်ရင်းကာ တိုက်ပွဲ၀င်လျှက်ရှိသော ပြည်သူ့ကာကွယ်ရေးတပ်ဖွဲ့ (ပဲခူးတိုင်း) BPDF အတွက်လိုအပ်သော နေရာများတွင်
            အသုံးပြုနိုင်ရန် <span>{name}</span> မှ <span>{amount}/-</span> ကျပ် ပေးပို့လှူဒန်းမှူခြင်းအား 
            ဂုဏ်ယူ ၀မ်းမြောက်စွာ မှတ်တမ်းတင်အပ်ပါသည်။
        </p>
        
        
    </div>
    );
}

export default MustExport;