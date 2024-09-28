import { useDispatch } from 'react-redux';
import ContractList from '../../components/contractlist/ContractList'
import './Contracts.scss'
import { useEffect } from 'react';
import { current } from '../../Redux/actions/user';

const Contracts = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    if(localStorage.getItem("token")){
      dispatch(current())
    }
  }, [dispatch]);
  return (
    <div className='contracts'>
    <div className="contractsContainer">
        <ContractList/>
      </div>
    </div>
  )
}

export default Contracts