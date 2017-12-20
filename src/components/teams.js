import React, { Component } from 'react'
import { Link } from 'react-router-dom'


const URL_TEAMS = 'http://localhost:3004/teams'


class Teams extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: [],
            filtered: [],
            keyword: ''
        }
    }

    componentDidMount() {
        fetch(URL_TEAMS, {
            method: 'GET'
        })
        .then(response=>response.json())
        .then(json=>{
            this.setState({
                teams: json,
                filtered: json
            })
        })
    }

    // Filter Function

    searchTeam = (event) => {
        const keyword = event.target.value;
        if(keyword !== '') {
            const list = this.state.teams.filter((item)=>{
                return item.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1
            })
            this.setState({
                filtered: list,
                keyword: event.target.value
            })
        }
        else {
            this.setState({
                filtered: this.state.teams,
                keyword
            });
        }
    }

    renderList = ({filtered}) => {
        return filtered.map((item)=>{
            return(
                <Link key={item.id} to={`/team/${item.name}`} className="team_item">
                    <img alt={item.name} src={`images/teams/${item.logo}`} />
                </Link>
            )
        })
    }

    render() {
        return (
            <div className="teams_component">
                <div className="teams_input">
                    <input 
                        value={this.state.keyword}
                        type="text" 
                        placeholder="Search for a team" 
                        onChange={e=> this.searchTeam(e)}
                    />
                </div>
                <div className="teams_container">

                        {this.renderList(this.state)}

            

                </div>
            </div>
        )
    }
}

export default Teams