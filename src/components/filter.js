import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

class FilterPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            data : [], 
            launchYear : [2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020],
            successfullLaunch : [],
            successfullLanding : [],
            successfullLaunchYear : [],
            error:"",
            myColor : ""  
        }
        this.handleClick = this.handleClick.bind(this);
        this.getData = this.getData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.filterData = this.filterData.bind(this);         
    }
    async getData(){
        let collectedData = [];        
        if(this.props.launchYear.length>0 && this.props.launch.length===1 && this.props.landing.length===0){
            await this.props.launchYear.forEach(val=> collectedData = collectedData.concat(this.props.datas.filter(item=>item.launch_year===val && item.launch_success.toString()===this.props.launch[0] )))
            return await this.setState({data:collectedData})
        }
        if(this.props.launchYear.length>0 && this.props.launch.length===1 && this.props.landing.length>0){
            await this.props.launchYear.forEach(eachItem=>this.props.landing.forEach(val=>collectedData=collectedData.concat(this.props.datas.filter(item=>item.launch_year===eachItem && item.launch_success.toString()===this.props.launch[0] && item.rocket.first_stage.cores[0].land_success===JSON.parse(val)))))
            return await this.setState({data:collectedData})
        }
        if(this.props.launchYear.length>0 && this.props.launch.length!==1 && this.props.landing.length===0){
            await this.props.launchYear.forEach(val=> collectedData = collectedData.concat(this.props.datas.filter(item=>item.launch_year===val)))
            return await this.setState({data:collectedData})
        }
        if(this.props.launchYear.length>0 && this.props.launch.length!==1 && this.props.landing.length>0){
            await this.props.launchYear.forEach(val=>this.props.landing.forEach(eachItem=>collectedData = collectedData.concat(this.props.datas.filter(item=>item.launch_year===val && item.rocket.first_stage.cores[0].land_success===JSON.parse(eachItem) ))))
            return await this.setState({data:collectedData})
        }
        if(this.props.launchYear.length===0 && this.props.launch.length===1 && this.props.landing.length===0){
            collectedData = await this.props.datas.filter(item=>item.launch_success.toString()===this.props.launch[0])
            return await this.setState({data:collectedData})
        }
        if(this.props.launchYear.length===0 && this.props.launch.length===1 && this.props.landing.length>0){
            await this.props.landing.forEach(val=>collectedData=collectedData.concat(this.props.datas.filter(item=>item.launch_success===this.props.launch[0] && item.rocket.first_stage.cores[0].land_success===JSON.parse(val) )))
            return await this.setState({data:collectedData})
        }
        if(this.props.launchYear.length===0 && this.props.launch.length!==1 && this.props.landing.length===0){
            collectedData = await this.props.datas;
            return await this.setState({data:collectedData})
        }
        if(this.props.launchYear.length===0 && this.props.launch.length!==1 && this.props.landing.length>0){
            collectedData = await this.props.landing.forEach(val=>collectedData=collectedData.concat(this.props.datas.filter(item=>item.rocket.first_stage.cores[0].land_success===val)))
            return await this.setState({data:collectedData})
        }     
    }
    componentWillMount(){
        this.setState({myColor:"#c5e09b"})
        this.getData();
    }
    handleClick(e){
        e.preventDefault();
        e.target.selected = !e.target.selected;        
        e.target.style.backgroundColor = e.target.selected===true ? "#7cba18" : "#c5e09b";    
        if(e.target.className==="year-count"){ 
            if(!e.target.selected) return this.setState({successfullLaunchYear : this.state.successfullLaunchYear.filter(item=>item!==e.target.innerText)})            
            else return this.setState({successfullLaunchYear:this.state.successfullLaunchYear.some(el=>el===e.target.innerText)? this.state.successfullLaunchYear : this.state.successfullLaunchYear.concat(e.target.innerText)});            
        } 
        if(e.target.className==="launch-count"){
            if(!e.target.selected) return this.setState({successfullLaunch : this.state.successfullLaunch.filter(item=>item!==e.target.innerText)})            
            else return this.setState({successfullLaunch:this.state.successfullLaunch.some(el=>el===e.target.innerText)? this.state.successfullLaunch : this.state.successfullLaunch.concat(e.target.innerText)});        
        } 
        if(e.target.className==="landing-count"){
            if(!e.target.selected) return this.setState({successfullLanding : this.state.successfullLanding.filter(item=>item!==e.target.innerText)})            
            else return this.setState({successfullLanding:this.state.successfullLanding.some(el=>el===e.target.innerText)? this.state.successfullLanding : this.state.successfullLanding.concat(e.target.innerText)});
        }         
    }
    async filterData(){
        this.setState({data:[]})
        let collectedData = [];
        if(this.state.successfullLaunchYear.length>0 && this.state.successfullLaunch.length===1 && this.state.successfullLanding.length===0){
            await this.state.successfullLaunchYear.forEach(val=> collectedData = collectedData.concat(this.props.datas.filter(item=>item.launch_year===val && item.launch_success.toString()===this.state.successfullLaunch[0] )))
            return await this.setState({data:collectedData})
        }
        if(this.state.successfullLaunchYear.length>0 && this.state.successfullLaunch.length===1 && this.state.successfullLanding.length>0){
            await this.state.successfullLaunchYear.forEach(eachItem=>this.state.successfullLanding.forEach(val=>collectedData=collectedData.concat(this.props.datas.filter(item=>item.launch_year===eachItem && item.launch_success.toString()===this.state.successfullLaunch[0] && item.rocket.first_stage.cores[0].land_success===JSON.parse(val)))))
            return await this.setState({data:collectedData})
        }
        if(this.state.successfullLaunchYear.length>0 && this.state.successfullLaunch.length!==1 && this.state.successfullLanding.length===0){
            await this.state.successfullLaunchYear.forEach(val=> collectedData = collectedData.concat(this.props.datas.filter(item=>item.launch_year===val)))
            return await this.setState({data:collectedData})
        }
        if(this.state.successfullLaunchYear.length>0 && this.state.successfullLaunch.length!==1 && this.state.successfullLanding.length>0){
            await this.state.successfullLaunchYear.forEach(val=>this.state.successfullLanding.forEach(eachItem=>collectedData = collectedData.concat(this.props.datas.filter(item=>item.launch_year===val && item.rocket.first_stage.cores[0].land_success===JSON.parse(eachItem) ))))
            return await this.setState({data:collectedData})
        }
        if(this.state.successfullLaunchYear.length===0 && this.state.successfullLaunch.length===1 && this.state.successfullLanding.length===0){
            collectedData = await this.props.datas.filter(item=>item.launch_success.toString()===this.state.successfullLaunch[0])
            return await this.setState({data:collectedData})
        }
        if(this.state.successfullLaunchYear.length===0 && this.state.successfullLaunch.length===1 && this.state.successfullLanding.length>0){
            await this.state.successfullLanding.forEach(val=>collectedData=collectedData.concat(this.props.datas.filter(item=>item.launch_success===this.state.successfullLaunch && item.rocket.first_stage.cores[0].land_success===JSON.parse(val) )))
            return await this.setState({data:collectedData})
        }
        if(this.state.successfullLaunchYear.length===0 && this.state.successfullLaunch.length!==1 && this.state.successfullLanding.length===0){
            collectedData = await this.props.datas;
            return await this.setState({data:collectedData})
        }
        if(this.state.successfullLaunchYear.length===0 && this.state.successfullLaunch.length!==1 && this.state.successfullLanding.length>0){
            collectedData = await this.state.successfullLanding.forEach(val=>collectedData=collectedData.concat(this.props.datas.filter(item=>item.rocket.first_stage.cores[0].land_success===val)))
            return await this.setState({data:collectedData})
        }
        return await this.setState({data:collectedData})
    }
    handleSubmit(e){
        e.preventDefault();
        if(this.state.successfullLaunchYear.length===0 && this.state.successfullLaunch.length===0 && this.state.successfullLanding.length===0 ){
            this.setState({error:"No filter selected"});
        }
        else{           
            this.filterData();
            this.setState({error:"",successfullLaunchYear:[],successfullLaunch:[],successfullLanding:[]});
        }
        this.setState({myColor:"#c5e09a"})        
    }    
    render(){       
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
                                                   <button style={{backgroundColor:this.state.myColor}} selected={false} onClick={this.handleClick} className="year-count">{item}</button>
                                               </li>
                                           )
                                       }
                                   </ul>                                   
                               </div> 
                           </div>
                           <div className="successfull-launch">
                               <h5>Successfull launch</h5>
                               <div className="years">
                                   <button style={{backgroundColor:this.state.myColor}} selected={false} onClick={this.handleClick} className="launch-count">true</button>
                                   <button style={{backgroundColor:this.state.myColor}} selected={false} onClick={this.handleClick} className="launch-count">false</button>
                               </div>
                           </div>
                           <div className="successfull-landing">
                               <h5>Successfull landing</h5>
                               <div className="years">
                                   <button style={{backgroundColor:this.state.myColor}} selected={false} onClick={this.handleClick} className="landing-count">true</button>
                                   <button style={{backgroundColor:this.state.myColor}} selected={false} onClick={this.handleClick} className="landing-count">false</button>
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
                                        <span>{ item.rocket.first_stage.cores[0].land_success===null? "null" : item.rocket.first_stage.cores[0].land_success.toString()}</span>
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
    launch : state.allReducers.launch,
    datas : state.allReducers.data
})

export default connect(mapStateToProps,null)(FilterPage)