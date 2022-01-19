import {useHistory} from 'react-router-dom';
// const Item=({property,value})=><div className='row my-2'>
// <div className='col-5'>{property}</div>
// <div className='col-2'>=</div>
// <div className='col-5'>{value}</div>
// <hr />
// </div>



const DonorData=({donor,sup,serialNo,setDetail})=>

(<div className='row my-2'>
  <div className='col-3 d-flex align-items-center'>{donor}</div>
  <div className='col-3 d-flex align-items-center'>{sup}</div>
  <div className='col-3 d-flex align-items-center'>{serialNo}</div>
  <div className='col-3 d-flex justify-content-end'>
    <button className='btn btn-dark text-warning detail-btn'
            onClick={setDetail}
    >
      Detail
    </button>
  </div>

</div>)
function DonatonDisplay(props) {
  const history=useHistory();
  const { donation,supply,type } = props;
  const setDetail=async ()=>{
    await props.generateClick((type==="money")?donation:supply._id);
    history.push(`/detail/${type}`);
  }
  return (
    <div className="row my-2  bg-warning item-box ">
      <div className="col-12 ">
        {(type === "money") 
        ? (
          <DonorData
            donor={donation.donor}
            sup={donation.amount.toLocaleString("en-US") + " " + donation.unit}
            serialNo={donation.serialNo}
            setDetail={setDetail}
          />
        )
        :(
          <DonorData
            donor={supply.donor}
            sup={supply.supply}
            serialNo={"S_"+supply.serialNo}
            setDetail={setDetail}
          />
        )
      }
      </div>
    </div>
  );
}

export default DonatonDisplay;
