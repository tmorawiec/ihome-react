import React from 'react';
import { userService, authenticationService } from '@/_services';
// import socketIOClient from "socket.io-client";
import io from "socket.io-client";

import Flat from "./flat";



class HomePage extends React.Component {
    constructor(props) {
        super(props);

        

        this.state = {
            currentUser: authenticationService.currentUserValue,
            users: null,
            clicks: 0,
            value: 3,
            kuchnia: 50,

            response: false,

            switches: {
              room: 0,
              hall: 0,
              bedroom: 0,
              kitchen: 0,
              bathroom: 0,
              balcony: 0,
            },
            testowy: 0
            

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        
     
        this.socket = io.connect('http://localhost:3030', {
            query: {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoidXNlcjEyMyIsInBhc3N3b3JkIjoiMTIzNCIsImZpcnN0TmFtZSI6IkpvbiIsImxhc3ROYW1lIjoiRG9lIiwiZG9iIjoiMTIvMTEvMTk5MSIsImVtYWlsIjoidXNlckBnbWFpbC5jb20iLCJhZGRyZXNzIjp7InN0cmVldCI6IjU1NSBCYXlzaG9yZSBCbHZkIiwiY2l0eSI6IlRhbXBhIiwic3RhdGUiOiJGbG9yaWRhIiwiemlwIjoiMzM4MTMifX0sImlhdCI6MTU2MTExODU3MSwiZXhwIjoxNTYxMTIyMTcxfQ.tRp1ROAq0qH-8dHofd3t4xUSX_dAgWFNzUT4POkwP7Y'}
          });
        this.sendMessage = ev => {
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', "Wiadomość z reacta");

        }
    }

    componentDidMount() {
        userService.getAll().then(users => this.setState({ users }));
        

        this.socket.on("FromAPI", data => this.setState({ response: data }));

        // przyjmuje dane od serwera node (dane wysłane od innego klienta, swoje nie wracają)
        this.socket.on("dane_zmiana_suwaka", data => this.setState({ value: data }));



        

    }

    handleChange(event) {
        this.setState({value: event.target.value});
        console.log(event.target.value);
        this.socket.emit('suwak', event.target.value);
      }
    handleChange2(event) {
        this.setState({testowy: event.target.value});

     
      }



    



    render() {
        const { currentUser, users, response } = this.state;

        return (
            <div>
                <h1>Hi {currentUser.firstName}!</h1>
                <h5>Yor JWT is: {currentUser.token}</h5>
                <p>You're logged in with React & JWT!!</p>
                <h3>Users from secure api end point:</h3>
                {users &&
                    <ul>
                        {users.map(user =>
                            <li key={user.id}>{user.firstName} {user.lastName}</li>
                        )}
                    </ul>
                }

                <p>
                    <output>{this.state.value}</output>
                    <input 
                    id="typeinp" 
                    type="range" 
                    min="0" max="255" 
                    defaultValue={this.state.value} 
                    value={this.state.value}
                    onChange={this.handleChange}
                    step="1"
                    />
                </p>
                <p>
                    <output>{this.state.testowy}</output>
                    <input 
                    id="typeinp" 
                    type="range" 
                    min="0" max="255" 
                    defaultValue={this.state.testowy} 
                    value={this.state.testowy}
                    onChange={this.handleChange2}
                    step="1"
                    />
                </p>
                

                

        <div>
        <output>Klinięcia: {this.state.clicks}</output>
        <button onClick={this.increment.bind(this)}>Kliknij</button>
                <output>Tu będzie stan obiektu: {this.state.testowy}</output>
        </div>

        <div style={{ textAlign: "center" }}>
          {response
              ? <p>
                Wiadomość z websocketa: {response}
              </p>
              : <p>Loading...</p>}
        </div>

        <button onClick={this.sendMessage} className="btn btn-primary form-control">Send websocket</button>

        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
                
                <Flat 
                        room={`rgba( 255, 165, 0, ${this.state.value/255} )`}
                        hall="gray" 
                        bedroom="gray"
                        kitchen={this.state.value}
                        bathroom="gray"
                        balcony="gray"
                    />
        

            </div>


 

               
              

           
        );
    }

   
    increment() {
        console.log("was", this.state.clicks);
        this.setState({
          clicks: this.state.clicks + 1
        }, () => {
          console.log("is", this.state.clicks)
        });
      }






}


export { HomePage };