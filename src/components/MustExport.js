import dayjs from "dayjs";
import { useEffect, useRef } from "react";
import {
  exportComponentAsJPEG,
  exportComponentAsPDF,
  exportComponentAsPNG,
} from "react-component-export-image";
import Logo from "../utils/images/bpdf_logo.jpg";
import uuid from "react-uuid";
import convertDate from "../utils/convertDate";
const MustExport = ({ name, amount, responsibleBy, reason }) => {
  const toExport = useRef();
  const exportComponent = () => {
    const file_name = uuid();
    exportComponentAsPDF(toExport,{fileName:file_name, html2CanvasOptions:{w:1200,h:1600,unit:"px"}});
  };
  useEffect(exportComponent, []);
  console.log(name, amount);
  return (
    <div className="must-export" ref={toExport}>
      <img src={Logo} className="certi-logo" alt="..."/>
      <h1 className="certi-header">Bago People Defense Force - BPDF</h1>
      <h2 className="certi-sub-header">မှတ်တမ်းတင်ဂုဏ်ပြုလွှာ</h2>
      <div className="certi-date-box">
        <span>ရက်စွဲ။{"    "}။</span>
        <span className="certi-date">
          {convertDate(dayjs().format("DD/MM/YY"))}
        </span>
      </div>
      <div className='certi-text'>
      <div className="certi-bg-color">
        
        <p className="whole-reason">
          {reason
            ? reason
            :  `ပြည်သူလူထုအား စစ်ကောင်စီမှ လက်နက်ကိုင်ကာ အကြမ်းဖက်နေသော စစ်အာဏာရှင်စနစ်ကျရှုံးရေးအတွက် 
                အသက်နှင့်ရင်းကာ တိုက်ပွဲ၀င်လျှက်ရှိသော ပြည်သူ့ကာကွယ်ရေးတပ်ဖွဲ့ (ပဲခူးတိုင်း) BPDF အတွက်လိုအပ်သော နေရာများတွင်
                အသုံးပြုနိုင်ရန်`
            }
        </p>
        <p>
          <span>{name}</span> မှ <span>{amount}/-</span> ကျပ်
        </p>
        <p>
          ပေးပို့လှူဒန်းမှူခြင်းအား ဂုဏ်ယူ ၀မ်းမြောက်စွာ မှတ်တမ်းတင်အပ်ပါသည်။
        </p>
      </div>
      </div>
      <div className="row mt-5">
        <div className="col-6"></div>
        <div className="col-6 foot-box">
          <p className="responsibleBy">တာ၀န်ခံ({responsibleBy})</p>
          <p className="responsibleBy">Bago People Defense Force-BPDF</p>
        </div>
      </div>
    </div>
  );
};

export default MustExport;
