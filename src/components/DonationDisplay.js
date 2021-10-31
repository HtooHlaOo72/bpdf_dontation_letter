import { useState } from "react";
import convertDate from "../utils/convertDate";
import { connect } from "react-redux";

const Item=({property,value})=><div className='row my-2'>
<div className='col-5'>{property}</div>
<div className='col-2'>=</div>
<div className='col-5'>{value}</div>
</div>
function DonatonDisplay(props) {
  
  const { donation } = props;
  const [showDetail, setShowDetail] = useState(false);
  const [btnOpen, setBtnOpen] = useState(false);
  const switchDetail = () => {
    setShowDetail(!showDetail);
  };
  return (
    <div className="row my-3 item-box">
      <div className='col-8 bg-dark'>
        <div className='col-12 bg-success'>
          <Item property={'လှူတန်းသူ'} value={donation.donor} />
          <Item property={'ငွေပမာဏ'} value={donation.amount} />
          <Item property={'ရက်စွဲ'} value={convertDate(donation.createdAt)} />
          {
            showDetail
            &&
            <>
              <Item property={'အကြောင်းအရာ'} value={donation.topic} />
              <Item property={'တာဝန်ခံ'} value={donation.signedBy} />
              <Item property={'ငွေပမာဏ(စာဖြင့်)'} value={donation.donor} />
            </>
            
          }
          
        </div>
      </div>
      <div className='col-4 bg-danger d-flex justify-content-end more-btn-box'>
        <button className='btn btn-light more-btn' onClick={()=>{setBtnOpen(!btnOpen)}}>///</button>
        {
        (btnOpen)&&
        <div className='three-more'>
          <button className='btn three-more-btn'>Edit</button>
          <button className='btn three-more-btn'>Generate</button>
          <button className='btn three-more-btn'>Delete</button>
        </div>
        }
        
      </div>
      <div  className='col-12 bg-info d-flex justify-content-center' 
            onClick={()=>{switchDetail()}}>
              <button className='btn btn-dark'>See More</button>
      </div>
    </div>
  );
}

export default DonatonDisplay;
