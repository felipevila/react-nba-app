import React, { Component } from 'react'

class Subscriptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            error: false,
            success: false
        }
    }

    onChangeInput = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    // Function that writes the new email in the database
    saveSubscription = (email) => {
        const URL_EMAIL = 'http://localhost:3004/subcriptions';

        fetch(URL_EMAIL,{
            method: 'POST',        
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({email})
        })
        .then(res=>res.json())
        .then(()=> {
            this.setState({
                email: '',
                success: true
            })
        })
    }

    clearMessages = () => {
        setTimeout(function() {
            this.setState({
                error: false,
                success: false
            })
        }.bind(this), 3000);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let email = this.state.email;
        // This regular expression validates email addresses
        let regex = /\S+@\S+\.\S+/;

        // If validation passes we call the function to save email in the DB (see above)
        if(regex.test(email)) {
            this.saveSubscription(email)
        }
        else {
           this.setState({ error: true })
        }
        this.clearMessages();
    }

    render() {
        return (
            <div className="subscribe_panel">
                <h3>Subscribe to us</h3>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input 
                            type="text" 
                            placeholder="youremail@email.com"
                            value={this.state.email}
                            onChange={this.onChangeInput}
                        />
                        <div className={this.state.error ? "error show" : "error"}>Please enter a valid email</div>
                        <div className={this.state.success ? "success show" : "success"}>Thanks so much!</div>
                    </form>
                </div>
                <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at turpis ligula. Ut et risus imperdiet, efficitur neque id, consequat erat.</small>
            </div>
        )
    }
}

export default Subscriptions;