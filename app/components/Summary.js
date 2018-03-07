import React, { Component } from 'react';
import { setInterval } from 'timers';

class Summary extends Component {
    constructor(){
        super();
        this.state={
          data:[],
          predata:[],
          lastdata:[]
        };
      }
    
      fetchJSON(){
        fetch('https://cors-anywhere.herokuapp.com/'+'https://join.reckon.com/stock-pricing', {
            method: 'GET'
          }).then((Response) => Response.json())
          .then((jsonData) => {
            console.log(jsonData)
            this.setState({
              data:jsonData
            });
          });
      }

      fetchlastJSON(){
        fetch('https://cors-anywhere.herokuapp.com/'+'https://join.reckon.com/stock-pricing', {
            method: 'GET'
          }).then((Response) => Response.json())
          .then((jsonData) => {
            console.log(jsonData)
            this.setState({
              lastdata:jsonData
            });
          });
      }

      fetchpreJSON(){
        fetch('https://cors-anywhere.herokuapp.com/'+'https://join.reckon.com/stock-pricing', {
            method: 'GET'
          }).then((Response) => Response.json())
          .then((jsonData) => {
            console.log(jsonData)
            this.setState({
              predata:jsonData
            });
          });
      }
    
      componentDidMount(){
        this.timer = setInterval(()=> this.fetchJSON(), 2000),
        this.lasttimer = setInterval(()=> this.fetchlastJSON(), 4000),
        this.fetchpreJSON()
      }
    

  render () {
    return (
        <div className='sumcavans'>
            <div className='sumtitle'><h1>Summary</h1></div>
            <table className='pricetable'>
              <tr>
                  <td>Stock</td><br/><br/>
                  <td>Starting</td><br/><br/>
                  <td>Lowest</td><br/><br/>
                  <td>Highest</td><br/><br/>
                  <td>Current</td><br/><br/>
              </tr>
              {
                  this.state.data.map((dynamicData,key)=>
              <tr>
                  <td>{dynamicData.code}</td><br/><br/>
                  <td>{this.state.predata[key].price}</td><br/><br/>
                  <td>{dynamicData.price<this.state.predata[key].price ? dynamicData.price : this.state.predata[key].price}</td><br/><br/>
                  <td>{dynamicData.price>this.state.predata[key].price ? dynamicData.price : this.state.predata[key].price}</td><br/><br/>
                  <td>{dynamicData.price}</td><br/><br/>
             </tr>
             )
             }
             </table>
        </div>
        );
    }
}

export default Summary;