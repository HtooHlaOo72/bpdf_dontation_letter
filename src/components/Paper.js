import cx from "classnames";
import { createRef,useEffect } from "react";
import * as htmlToImage from "html-to-image";
import Logo from "../utils/images/bpdf_logo.jpg";
import Sign from "../utils/images/sign.webp";

import css from "../sass/paper.module.sass";
import {saveAs} from 'file-saver';
import uuid from 'react-uuid';
import {connect} from 'react-redux';
import { useHistory,useParams } from "react-router";
import convertDate, { convertNumber } from "../utils/convertDate";
import convertId from "../utils/generateId";
const Paper = (props) => {
  let history=useHistory();
  const  {type}=useParams();
  const cert = createRef();
  let data=(type==="money")?props.donation:props.supply;
  let {donor,amount,amountText,unit,signedBy,topic,date,serialNo,supply}=data;
  date=date&&convertDate(date);
  amount=amount&&convertNumber(amount+'');
  let isAuth=props.auth.isAuthenticated;

  const saveImage = () =>
    htmlToImage.toPng(cert.current, { pixelRatio: 1.5 }).then((data) => {
      saveAs(data,uuid() );
    });
  useEffect(()=>{
      
      if(!isAuth) {
        history.push('/login')
      }else{
        saveImage()
      }
  });
  // const handleInputBoxes = (e) => {
  //   var min = 100,
  //     max = 500,
  //     pad_right = 5;

  //   e.target.style.width = min + "px";
  //   e.target.onkeypress =
  //     e.target.onkeydown =
  //     e.target.onkeyup =
  //       function () {
  //         var input = this;
  //         setTimeout(function () {
  //           var tmp = document.createElement("div");
  //           tmp.style.padding = "0";
  //           if (getComputedStyle)
  //             tmp.style.cssText = getComputedStyle(input, null).cssText;
  //           if (e.target.currentStyle)
  //             tmp.style.cssText = e.target.currentStyle.cssText;
  //           tmp.style.width = "";
  //           tmp.style.position = "absolute";
  //           tmp.innerHTML = e.target.value
  //             .replace(/&/g, "&amp;")
  //             .replace(/</g, "&lt;")
  //             .replace(/>/g, "&gt;")
  //             .replace(/"/g, "&quot;")
  //             .replace(/'/g, "&#039;")
  //             .replace(/ /g, "&nbsp;");
  //           e.target.parentNode.appendChild(tmp);
  //           var width = tmp.clientWidth + pad_right + 1;
  //           tmp.parentNode.removeChild(tmp);
  //           if (min <= width && width <= max)
  //             e.target.style.width = width + "px";
  //         }, 1);
  //       };
  // };

  // const saveAss = (blob, fileName) => {
  //   var elem = window.document.createElement("a");
  //   elem.href = blob;
  //   elem.download = fileName;
  //   elem.style = "display:none;";
  //   (document.body || document.documentElement).appendChild(elem);
  //   if (typeof elem.click === "function") {
  //     elem.click();
  //   } else {
  //     elem.target = "_blank";
  //     elem.dispatchEvent(
  //       new MouseEvent("click", {
  //         view: window,
  //         bubbles: true,
  //         cancelable: true,
  //       })
  //     );
  //   }
  //   URL.revokeObjectURL(elem.href);
  //   elem.remove();
  // };

  

  return (
    <div className={cx(css.paper, "container")}>
      <div className="row h-100">
        <div className="col-md-8 mx-auto text-center d-flex justify-content-center align-items-center">
          <div ref={cert} id="paper" className={css.cert}>
            <div className={css.heading}>
              <div style={{textAlign:"start",marginLeft:"20px"}}>
                <img src={Logo} alt="Logo"/>
              </div>
              
              <h1 className='fw-bolder'>Bago People Defense Force - BPDF</h1>
              <p className="lead fw-bold mb-5">မှတ်တမ်းတင်ဂုဏ်ပြုလွှာ</p>
            </div>
            <div className={css.date}>
              ရက်စွဲ။&nbsp;&nbsp;&nbsp;&nbsp;။
              {date? date : "အောက်တိုဘာလ၊ ၂၂ရက်၊၂၀၂၁ခုနှစ်"}
            </div>
            <p className={css.maintext} id='main_text'>
              {"    "}
              ပြည်သူလူထုအား စစ်ကောင်စီမှ လက်နက်ကိုင်ကာ အကြမ်းဖက်နေသော
              စစ်အာဏာရှင်စနစ်ကျရှုံးရေးအတွက် အသက်နှင့်ရင်းကာ
              တိုက်ပွဲဝင်လျှက်ရှိသော<br/> ပြည်သူ့ကာကွယ်ရေးတပ်ဖွဲ့ (ပဲခူးတိုင်း){" "}
              <span className="fw-bolder">BPDF</span> အတွက်<br/>
              {(topic)?topic:"လိုအပ်သော နေရာများတွင် အသုံးပြုနိုင်ရန်"}
              <br />
              <span className={css.student}>
                <b>
                  {
                    (donor)
                    ?donor
                    :"မောင်အောင်အောင်"
                  }
                </b>{" "}
                မှ{" "}
                
                {
                  (type==="money")&&
                  <b>
                  {
                    amount
                    ?amount+"/-"
                    :"0"
                  }
                  {
                    " "
                  }
                  {
                    unit
                    ?unit
                    :"MMK"
                  }
                  <br />
                  {
                    amountText
                    ?`(${amountText})`
                    :"(မြန်မာငွေကျပ် ဆယ်သိန်းတိတိ)"
                  }
                </b>
                }
                {
                  (type==='supply')&&
                  <b>
                    {
                      supply
                    }
                  </b>
                }
              </span>
              <br />
              ပေးပို့လှူဒါန်းခြင်းအား ဂုဏ်ယူ ဝမ်းမြောက်စွာ
              မှတ်တမ်းတင်အပ်ပါသည်။
            </p>
            <div className={css.teacher}>
              <div style={{textAlign:"end",marginRight:"50px"}}>
                <img src={Sign} alt="Sign" id='sign' />
              </div>
              <h6>တာဝန်ခံ({signedBy?signedBy:"ရဲနောင်"})</h6>
              <p>Bago People Defense Force-BPDF</p>
              
            </div>
            <h6 className='uniq-id my-5'>အမှတ်စဉ်-{serialNo?convertId(serialNo):"00001"}</h6>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  donation:state.donationList.donationGen,
  supply:state.supplyList.g_supply
});
export default connect(mapStateToProps,null)(Paper);
