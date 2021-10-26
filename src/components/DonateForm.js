import React,{useRef,useState} from 'react';
import {useFormik} from 'formik';
import axios from 'axios';

import MustExport from './MustExport';

export default function DonateForm() {
    const toExport=useRef();
    const url='https://sheet.best/api/sheets/983278aa-0a93-4713-9183-ccd8f1aa9f4f';
    const [isSubmit,setSubmit]=useState(false);
    const [data,setData]=useState({});
    //export component as image or pdf
    
    const formik=useFormik({
        initialValues:{
            name:'',
            amount:'',
            reason:'',
            responsibler:'',
        },
        onSubmit:async (values)=>{
            setData(values);
            await setSubmit(true);
        }
    })
    
    return (
        <div className="container">
            <h1>Donation Form</h1>
        <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
            <label htmlFor="name" className="form-label">
                အလှူရှင်အမည်
            </label>
            <input
                type="text"
                className="form-control"
                id="name"
                name='name'
                placeholder="အလှူရှင်အမည်"
                value={formik.values.name}
                onChange={formik.handleChange}
            />
            </div>
            <div className="mb-3">
            <label htmlFor="amount" className="form-label">
                ငွေပမာဏ
            </label>
            <input
                type="number"
                className="form-control"
                id="amount"
                name='amount'
                placeholder="၁၀၀၀၀၀"
                value={formik.values.amount}
                onChange={formik.handleChange}
            />
            </div>
            <div className="mb-3">
            <label htmlFor="reason" className="form-label">
                အကြောင်းအရာ
            </label>
            <textarea
                placeholder='စစ်အာဏာရှင်စနစ်အမြစ်ပြတ်ပပျောက်ရေး'
                className="form-control"
                name='reason'
                id="reason"
                rows="3"
                value={formik.values.reason}
                onChange={formik.handleChange}
            ></textarea>
            </div>
            <div className="mb-3">
            <label htmlFor="responsibledBy" className="form-label">
                တာ၀န်ခံအမည်
            </label>
            <input
                type="text"
                className="form-control"
                id="responsibledBy"
                name='responsibleBy'
                placeholder="တာ၀န်ခံအမည်"
                value={formik.values.responsibler}
                onChange={formik.handleChange}
            />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        {isSubmit&&<MustExport toExport={toExport} data={data} />}
        </div>
    );
}
