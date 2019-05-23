import React, {Component} from 'react'
import axios from 'axios'

class View extends Component{
    constructor(props){
        super(props)
        this.state={
            clicked:false,
            username:'',
            password:''
        }
    }

    handleInput = (prop,val) => {
        this.setState({
            [prop]:val
        })
    }

    handleEyeClick = () => {
        this.setState({
            clicked:!this.state.clicked
        })
    }

    handleSubmit = () => {
        const {username,password} = this.state
        axios.post('/api/puppet',{username,password})
        .then(res => { 
            console.log(res.data)
        })
        .catch(err => console.log(err))
    }

    render(){
        const {clicked} = this.state
        let displayEye = 0
        let displayType = 'password'

        if(clicked === false){
            displayEye = 0
            displayType = 'password'
        }else{
            displayEye = '-'
            displayType = 'text'
        }

        // console.log(this.state)
        return(
            <div>
                View
                <div className='inputs'>
                    <input 
                        type='text' 
                        placeholder='Username' 
                        onChange={(e)=>this.handleInput('username',e.target.value)}
                    />
                </div>
                <div className='inputs'>
                    <input 
                        type={displayType} 
                        placeholder='Password' 
                        onChange={(e)=>this.handleInput('password',e.target.value)}
                    />
                    <button id='eye' onClick={this.handleEyeClick}>{displayEye}</button>
                </div>
                <button id='submit-button' onClick={this.handleSubmit}>Submit</button>
            </div>
        )
    }
}

export default View