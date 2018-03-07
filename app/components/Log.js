import React, { Component } from 'react';
import { clearInterval, setInterval } from 'timers';

/**const Switch = ({value, isPaused}) => (
    <div>
        <button className='btn' onClick={isPaused}>{value}</button>
    </div>
);**/

/**const reducer = (state = 'Pause', action) => {
    switch (action.type) {
        case 'ISPAUSED':
            return state = 'Resume';  
        case 'UNPAUSED':
            return state;
        default:
            return state;
    };
};**/

/**const store = createStore(reducer);**/

/**const render = () => {
    render(<button
            value={store.getState()}
            isPaused={() => store.dispatch({type:'ISPAUSED'})}
            unPaused={() => store.dispatch({type:'UNPAUSED'})}
            />,
        document.getElementById('btn')
    );
};

store.subscribe(render);**/

class Log extends Component {
  constructor(){
    super();
    this.state={
      data:[],
      time: new Date(),
      isPaused: false
    };
  }

  handleClickOnLikeButton () {
    this.setState({
      isPaused: !this.state.isPaused
    })
  }

  fetchJSON(){
    fetch('https://join.reckon.com/stock-pricing', {
        method: 'GET',
      }).then((Response) => Response.json())
      .then((jsonData) => {
        console.log(jsonData)
        this.setState({
          data:jsonData
        });
      });
  }

  currentTime(){
    this.setState({
      time: new Date()
    })
  }

  componentDidMount(){
    this.timer = setInterval(()=> this.fetchJSON(), 2000),
    this.datetime = setInterval(()=>this.currentTime(), 2000)
  }

  render () {
    const pausedLog = this.props.likedText || 'Resume'
    const resumeLog = this.props.unlikedText || 'Pause'
    return (
      <div className='logcavans'>
        <div className='logtitle'><h1>Log</h1></div>
        <button className='btn' onClick={this.handleClickOnLikeButton.bind(this)}>
        {this.state.isPaused ? pausedLog : resumeLog} Log
        </button>
        <div className='log'>
        <span>Updates for {this.state.time.toLocaleDateString()}{this.state.time.toLocaleTimeString()}</span>
        {
          this.state.data.map((dynamicData,key)=>
          <div>
            <span>{dynamicData.code}  :  </span>
            <span> ${dynamicData.price}</span>
          </div>
          )
        }
        </div>
      </div>
    );
  }
}


export default Log;