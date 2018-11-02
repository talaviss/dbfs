import React, { Component } from 'react';


class FinancialData extends Component {

    constructor(){
        super();
        this.state = {

        }
    };

 
    

    render() {
        const displayPosts = this.state.posts.map((x)=>{
            return (<p key={x.id}>{x.title}</p>)
        });
        return (
            <div>
                <h2 style={this.h2style}>About Tal</h2>
                {displayPosts}
            </div>
        );

        
    }
}
export default FinancialData;