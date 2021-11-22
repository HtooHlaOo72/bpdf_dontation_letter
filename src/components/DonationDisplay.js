import {useHistory} from 'react-router-dom';
// const Item=({property,value})=><div className='row my-2'>
// <div className='col-5'>{property}</div>
// <div className='col-2'>=</div>
// <div className='col-5'>{value}</div>
// <hr />
// </div>



const DonorData=({donor,amount,serialNo,setDetail})=>

(<div className='row my-2'>
  <div className='col-3 d-flex align-items-center'>{donor}</div>
  <div className='col-3 d-flex align-items-center'>{amount}</div>
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
  const { donation } = props;
  const setDetail=async ()=>{
    await props.generateClick(donation);
    history.push('/detail');
  }
  return (
    <div className="row my-3  bg-warning item-box ">
        <div className='col-12 '>
          <DonorData  donor={donation.donor} 
                      amount={donation.amount+" "+donation.unit}
                      serialNo={donation.serialNo}
                      setDetail={setDetail}
          />
        </div>
    </div>
  );
}

export default DonatonDisplay;
