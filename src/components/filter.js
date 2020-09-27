import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';

class FilterPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            data : [], 
            launchYear : [2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020]         
        }        
        this.getData = this.getData.bind(this);         
    }
    async getData(){
        let res = await axios.get('https://api.spacexdata.com/v3/launches?limit=100');
        console.log(res.data);
        var data = [];
        if(this.props.launchYear.length>0 && this.props.launch.length>0 ){
            console.log(this.props.launchYear,this.props.launch)
            data = res.data.filter((item)=>
                this.props.launchYear.filter(val=> val===item.launch_year && this.props.launch===item.launch_success.toString())
            )            
        }
        if(this.props.launchYear.length>0 && this.props.launch.length===0 ){
            console.log(this.props.launchYear[0],this.props.launch,this.props.launchYear.length>0 && this.props.launch.length===0)
            data = res.data.filter((item)=>
                this.props.launchYear.filter(val=> val===item.launch_year )
            )            
            console.log(data)            
        }   
        
        if(this.props.launchYear.length===0 && this.props.launch.length>0 ){
            console.log(this.props.launchYear,this.props.launch)
            data = res.data.filter((item)=> this.props.launch===item.launch_success.toString())            
        }
        
        console.log(data);
        this.setState({data: data.length!==0 ? data.slice(0,8) : res.data.filter(val=>val.launch_year==="2006") })        
    }
    componentDidMount(){
        this.getData();
    }    
    render(){  
        console.log(this.state.data,this.state)      
        return(
            <div className="landing-page">
                <h2>SpaceEx Launch Programs</h2>
                <div className="content">
                    <div className="left-section">
                        <div className="filters">
                           <h4>Filters</h4>
                           <div className="launch-year">
                               <h5>Launch Year</h5>
                               <div className="years">
                                   <ul>
                                       {
                                           this.state.launchYear.map((item,id)=>
                                               <li key={id}>
                                                   <button disabled selected={false} onClick={this.handleClick} className="year-count">{item}</button>
                                               </li>
                                           )
                                       }
                                   </ul>                                   
                               </div> 
                           </div>
                           <div className="successfull-launch">
                               <h5>Successfull launch</h5>
                               <div className="years">
                                   <button disabled selected={false} onClick={this.handleClick} className="launch-count">true</button>
                                   <button disabled selected={false} onClick={this.handleClick} className="launch-count">false</button>
                               </div>
                           </div>
                           <div className="successfull-landing">
                               <h5>Successfull landing</h5>
                               <div className="years">
                                   <button disabled selected={false} onClick={this.handleClick} className="landing-count">true</button>
                                   <button disabled selected={false} onClick={this.handleClick} className="landing-count">false</button>
                               </div>
                           </div>                                                      
                        </div>
                    </div>
                    <div className="right-section">
                        {
                            this.state.data.map((item,id)=>
                                <div className="column" key={id}>
                                    <div className="image-block"><img src={item.links.mission_patch} alt={`project-img-${id}`} /></div>
                                    <Link to="/" >{`${item.mission_name} #${++id}`}</Link>
                                    <div className="mission-id-div">
                                        <h6 className="missions">Mission Ids :</h6>
                                        <span className="mission-ids">{item.mission_id.length===0 ?  "list mission ids" : item.mission_id[0]}</span>
                                    </div>
                                    <div className="launch-year">
                                        <h6 className="missions">Launch year :</h6>
                                        <span>{item.launch_year}</span>
                                    </div>
                                    <div className="launch">
                                        <h6 className="missions">Successfull Launch :</h6>
                                        <span>{item.launch_success.toString()}</span>
                                    </div>
                                    <div className="landing">
                                        <h6 className="missions">Successfull Landing :</h6>
                                        <span>Launch Landing</span>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                <h3>Developed by : <span className="">Dinesh Kumar</span></h3>
            </div>
        )
    }
}

const mapStateToProps = (state)=>({
    launchYear : state.allReducers.launchYear,
    landing : state.allReducers.landing,
    launch : state.allReducers.launch
})

export default connect(mapStateToProps,null)(FilterPage)