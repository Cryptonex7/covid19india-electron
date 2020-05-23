import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useStyles} from './styles';
import {getMetrics} from '../../services/actions';
import LandingSection from './components/LandingSection';

function HomePage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const graphData = useSelector((state) => state.thunk.graphData);

  useEffect(() => {
    dispatch(getMetrics);

    setInterval(() => {
      dispatch(getMetrics);
    }, 1000 * 60 * 30); // ? 30 mins of interval
  }, [dispatch]);

  return Object.keys(graphData).length > 0 ? (
    <div className={classes.flexCol}>
      <div className={classes.root}>
        <div className={classes.compressor}>
          {/* Header Section  */}
          <LandingSection />
          <div className={classes.stat} style={{flexDirection: 'row'}}>
            <div className={classes.stat}>
              <h1 style={{color: '#FF1D02'}}>Confirmed</h1>
              <h2 style={{color: '#FF1D02'}}>
                {parseInt(
                  graphData.cases_time_series[
                    graphData.cases_time_series.length - 1
                  ].totalconfirmed
                ).toLocaleString()}
              </h2>
            </div>
            <div className={classes.stat}>
              <h1 style={{color: '#7FDE94'}}>Recovered</h1>
              <h2 style={{color: '#7FDE94'}}>
                {parseInt(
                  graphData.cases_time_series[
                    graphData.cases_time_series.length - 1
                  ].totalrecovered
                ).toLocaleString()}
              </h2>
            </div>
            <div className={classes.stat}>
              <h1 style={{color: '#BCB7AD'}}>Deceased</h1>
              <h2 style={{color: '#BCB7AD'}}>
                {parseInt(
                  graphData.cases_time_series[
                    graphData.cases_time_series.length - 1
                  ].totaldeceased
                ).toLocaleString()}
              </h2>
            </div>
          </div>
          <h6 style={{margin: 0, color: '#329BF1'}}>
            as of{' '}
            {
              graphData.cases_time_series[
                graphData.cases_time_series.length - 1
              ].date
            }{' '}
            {new Date().getFullYear()}
          </h6>
        </div>
      </div>
    </div>
  ) : (
    <div className="loader"></div>
  );
}

export default HomePage;
