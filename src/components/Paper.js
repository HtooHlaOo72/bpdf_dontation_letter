import cx from "classnames";
import { createRef } from "react";
import * as htmlToImage from "html-to-image";
import Logo from "../utils/images/bpdf_logo.jpg";
import css from "../sass/paper.module.sass";

const Paper = () => {
    const cert = createRef();

    const handleInputBoxes = (e) => {
        var min = 100,
            max = 500,
            pad_right = 5;

        e.target.style.width = min + "px";
        e.target.onkeypress =
            e.target.onkeydown =
            e.target.onkeyup =
                function () {
                    var input = this;
                    setTimeout(function () {
                        var tmp = document.createElement("div");
                        tmp.style.padding = "0";
                        if (getComputedStyle)
                            tmp.style.cssText = getComputedStyle(
                                input,
                                null
                            ).cssText;
                        if (e.target.currentStyle)
                            tmp.style.cssText = e.target.currentStyle.cssText;
                        tmp.style.width = "";
                        tmp.style.position = "absolute";
                        tmp.innerHTML = e.target.value
                            .replace(/&/g, "&amp;")
                            .replace(/</g, "&lt;")
                            .replace(/>/g, "&gt;")
                            .replace(/"/g, "&quot;")
                            .replace(/'/g, "&#039;")
                            .replace(/ /g, "&nbsp;");
                        e.target.parentNode.appendChild(tmp);
                        var width = tmp.clientWidth + pad_right + 1;
                        tmp.parentNode.removeChild(tmp);
                        if (min <= width && width <= max)
                            e.target.style.width = width + "px";
                    }, 1);
                };
    };

    const saveAs = (blob, fileName) => {
        var elem = window.document.createElement("a");
        elem.href = blob;
        elem.download = fileName;
        elem.style = "display:none;";
        (document.body || document.documentElement).appendChild(elem);
        if (typeof elem.click === "function") {
            elem.click();
        } else {
            elem.target = "_blank";
            elem.dispatchEvent(
                new MouseEvent("click", {
                    view: window,
                    bubbles: true,
                    cancelable: true,
                })
            );
        }
        URL.revokeObjectURL(elem.href);
        elem.remove();
    };

    const saveImage = () =>
        htmlToImage.toPng(cert.current,{pixelRatio:1.5}).then((data) => {
            saveAs(data, prompt("Filename without extension"));
        });

    return (
        <div className={cx(css.paper, "container")}>
            <div className="row h-100">
                <div className="col-md-8 mx-auto text-center d-flex justify-content-center align-items-center">
                    <div ref={cert} id="paper" className={css.cert}>
                        <button
                            className={cx(
                                "btn btn-outline-dark",
                                css.downloadBtn
                            )}
                            onClick={saveImage}
                            data-html2canvas-ignore="true"
                        >
                            save
                        </button>
                        <div className={css.heading}>
                            <img src={Logo} alt="Logo" />
                            <h1>Bago People Defense Force - BPDF</h1>
                            <p className="lead fw-bolder mb-5">
                              မှတ်တမ်းတင်ဂုဏ်ပြုလွှာ
                            </p>
                        </div>
                        <div className={css.date}>
                            ရက်စွဲ ။{"  "}။
                            <input
                                type="text"
                                className={css.input}
                                placeholder="နေ့စွဲ"
                                size="6"
                                onChange={handleInputBoxes}
                            />
                        </div>
                        <p className={css.maintext}>
                        ပြည်သူလူထုအား စစ်ကောင်စီမှ လက်နက်ကိုင်ကာ အကြမ်းဖက်နေသော စစ်အာဏာရှင်စနစ်ကျရှုံးရေးအတွက် 
                အသက်နှင့်ရင်းကာ တိုက်ပွဲ၀င်လျှက်ရှိသော ပြည်သူ့ကာကွယ်ရေးတပ်ဖွဲ့ (ပဲခူးတိုင်း) <span className='fw-bolder'>BPDF</span> အတွက်လိုအပ်သော နေရာများတွင်
                အသုံးပြုနိုင်ရန်
                            <br />
                            <span className={css.student}>
                                <b>
                                    <input
                                        type="text"
                                        className={css.input}
                                        placeholder="အမည်"
                                        size="6"
                                        onChange={handleInputBoxes}
                                    />
                                </b>{" "}
                                  မှ {" "}
                                <b>
                                    <input
                                        type="text"
                                        className={css.input}
                                        placeholder="ပမာဏ"
                                        size="6"
                                        onChange={handleInputBoxes}
                                    />
                                </b>
                            </span>
                            <br />
                            ပေးပို့လှူဒန်းမှူခြင်းအား ဂုဏ်ယူ ၀မ်းမြောက်စွာ မှတ်တမ်းတင်အပ်ပါသည်။
                        </p>
                        <div className={css.teacher}>
                            <h5>တာ၀န်ခံ(အောင်အောင်)</h5>
                            <p>Bago People Defense Force-BPDF</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Paper;
