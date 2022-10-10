import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { setNewData } from '../store/rate';

let timeoutId;

const getData = async () => {
  const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
  const data = await response.json();

  return data;
};

export default function Home() {
  const data = useSelector(state => state.rates.btc);
  const dispatch = useDispatch();

  const date = data?.time.updated.slice(0, 18);

  const updateData = async () => {
    clearTimeout(timeoutId);

    const newData = await getData();
    dispatch(setNewData(newData));
    
    timeoutId = setTimeout(updateData, 10000);
  }

  useEffect(() => {
    updateData();
  }, []);

  return (
    <div className='page bg-dark'>
      {data && (
        <>
          <div className='page__box'>
            <h1 className='page__title'>{`${date} UTC`}</h1>
            <table className='table table-dark'>
              <thead>
                <tr>
                  <th>{data.chartName}</th>
                  <th>#</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(data.bpi).map(currency => (
                  <tr key={currency.code}>
                    <td>{currency.rate}</td>
                    <th>{currency.code}</th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
