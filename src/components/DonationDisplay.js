import { useState } from "react";
import convertDate from "../utils/convertDate";
import {AiFillCaretDown} from 'react-icons/ai';
import {BiDotsVertical} from 'react-icons/bi';


const Item=({property,value})=><div className='row my-2'>
<div className='col-5'>{property}</div>
<div className='col-2'>=</div>
<div className='col-5'>{value}</div>
<hr />
</div>
function DonatonDisplay(props) {
  
  const { donation } = props;
  const [showDetail, setShowDetail] = useState(false);
  const [btnOpen, setBtnOpen] = useState(false);
  const switchDetail = () => {
    setShowDetail(!showDetail);
  };
  return (
    <div className="row my-3  bg-warning item-box ">
      <div className='col-8 my-2 '>
        <div className='col-12 '>
          <Item property={'လှူတန်းသူ'} value={donation.donor} />
          <Item property={'ငွေပမာဏ'} value={donation.amount+" "+donation.unit} />
          <Item property={'ရက်စွဲ'} value={convertDate(donation.createdAt)} />
          {
            showDetail
            &&
            <>
              <Item property={'အကြောင်းအရာ'} value={donation.topic} />
              <Item property={'တာဝန်ခံ'} value={donation.signedBy} />
              <Item property={'ငွေပမာဏ(စာဖြင့်)'} value={donation.amountText} />
              <Item property={'Serial Number'} value={donation.serialNo} />
            </>
            
          }
          
        </div>
      </div>
      <div className='col-4 bg-warning d-flex justify-content-end more-btn-box'>
        <div className='more-btn' onClick={()=>{setBtnOpen(!btnOpen)}}>
          <BiDotsVertical />
        </div>
        {
        (btnOpen)&&
        <div className='three-more'>
          <button className='btn three-more-btn' onClick={()=>props.updateClick(donation)}>Edit</button>
          <button className='btn three-more-btn' onClick={()=>props.generateClick(donation)}>Generate</button>
          <button className='btn three-more-del' onClick={()=>props.deleteClick(donation._id)}>Delete</button>
        </div>
        }
        
      </div>
      <div  className='col-12 bg-warning d-flex justify-content-center seemore-btn-box'>
              <button className='btn  card-btn'
                      onClick={()=>{switchDetail()}}
              >See More <AiFillCaretDown /></button>
      </div>
    </div>
  );
}

export default DonatonDisplay;
