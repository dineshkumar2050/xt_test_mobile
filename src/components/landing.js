import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {filter} from '../actions/action';
import  { Redirect } from 'react-router-dom';

class LandingPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            data : [],
            launchYear : [2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020],
            successfullLaunch : "",
            successfullLanding : "",
            successfullLaunchYear : [],  
            error:"",
            redirect : false          
        }
        this.handleClick = this.handleClick.bind(this);
        this.getData = this.getData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);  
    }
    async getData(){
        let res = await axios.get('https://api.spacexdata.com/v3/launches?limit=100');
        console.log(res.data);
        let data = res.data;
        this.setState({data:res.data.slice(0,8)})        
    }
    componentDidMount(){
        this.getData();
    }
    handleClick(e){
        e.preventDefault();
        console.log(e.target.className);
        e.target.selected = !e.target.selected;        
        e.target.style.backgroundColor = e.target.selected===true ? "#7cba18" : "#c5e09b";
        console.log(e.target.selected,e.target.style,e.target.style.backgroundColor,e.target.innerText);
        var yearArray = []
        if(e.target.className==="year-count"){        
            yearArray.push(e.target.innerText);
            this.setState({successfullLaunchYear:this.state.successfullLaunchYear.some(el=>el===e.target.innerText)? this.state.successfullLaunchYear : this.state.successfullLaunchYear.concat(e.target.innerText)});            
        } 
        if(e.target.className==="launch-count") this.setState({successfullLaunch:e.target.innerText})
        if(e.target.className==="landing-count") this.setState({successfullLanding:e.target.innerText})
        console.log(this.state,e.target.className,e.target.className==="launch-count",e.target.innerText);
        console.log(this.state.successfullLaunchYear);
    }
    handleSubmit(e){
        e.preventDefault();
        console.log("Starting");
        if(this.state.successfullLaunchYear.length===0 && this.state.successfullLaunch==="" && this.state.successfullLanding===""){
            this.setState({error:"No filter selected"});
            console.log(this.state.error,"Failure")
        }
        else{
            this.setState({error:"",redirect : true});
            const data={landing:this.state.successfullLanding,launch:this.state.successfullLaunch,year:this.state.successfullLaunchYear};
            this.props.filter(data)
            console.log("Success",data);            
        }   
        console.log("Ending");     
    }
    render(){  
        console.log(this.state.data,this.state);        
        const redirect = this.state.redirect;
        if (redirect === true) {
            return <Redirect to="/filter" />
        }      
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
                                                   <button selected={false} onClick={this.handleClick} className="year-count">{item}</button>
                                               </li>
                                           )
                                       }
                                   </ul>                                   
                               </div> 
                           </div>
                           <div className="successfull-launch">
                               <h5>Successfull launch</h5>
                               <div className="years">
                                   <button selected={false} onClick={this.handleClick} className="launch-count">true</button>
                                   <button selected={false} onClick={this.handleClick} className="launch-count">false</button>
                               </div>
                           </div>
                           <div className="successfull-landing">
                               <h5>Successfull landing</h5>
                               <div className="years">
                                   <button selected={false} onClick={this.handleClick} className="landing-count">true</button>
                                   <button selected={false} onClick={this.handleClick} className="landing-count">false</button>
                               </div>
                           </div>
                           <div className="submit-section">
                               <button className="submit-filter" type="submit" onClick={this.handleSubmit}>Filter</button>
                               <span className="error">{this.state.error.length>0 ? this.state.error : "" }</span>
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

export default connect(null,{filter})(LandingPage)