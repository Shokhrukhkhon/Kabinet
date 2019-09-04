import * as React from 'react';
import { connect } from 'react-redux';


class Timer extends React.Component<any, any>{
    constructor(props: any) {
        super(props);

        this.state = {
            start: null,  // 2000,
            vaqt: "00:00.00",
            id: null,
            is_started: false,
            is_paused: false,
            lap: []
        }
    }

    // fs

    play() {

        if (!this.state.start) {
            this.setState({
                start: new Date()
            });
        }

        let id = setInterval(() => {
            this.next();
        }, 15);

        this.setState({
            id,
            is_started: true
        });
    }

    pause() {
        if (this.state.id)
            clearInterval(this.state.id);

        this.setState({
            is_paused: true
        });
    }

    stop (){
        this.setState({
            start: null,
            vaqt: "00:00.00",
            id: null,
            is_started: false,
            is_paused: false,
            lap: []
        })
    }

    lap(){
        this.setState({
            lap: [...this.state.lap, this.state.vaqt]
        });
       
    }

    next() {
        let date = new Date(); // 2003

        let otgan = (date.getTime() - this.state.start.getTime()) / 10;

        otgan = Math.floor(otgan);

        let min = Math.floor(otgan / 6000);
        let sec = Math.floor(otgan % 6000 / 100);
        let msec = (otgan % 6000) % 100;

        let vaqt = (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec) + "." + msec;

        this.setState({
            vaqt
        });
    }

    render() {

        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className = "col - 6" >
                            <i className="fa fa-clock"></i>
                            <h3>{this.state.vaqt}</h3>
                            <hr/>
                            <ul>
                            {this.state.lap.map((element: any, index: any) => {
                                return (<li key={index}>{
                                   element
                                }</li>)
                            })}
                        </ul>



                            {(!this.state.is_started || this.state.is_started && this.state.is_paused ) && (<button className="btn btn-default btn-sm" onClick={(e:any) => {
                    this.play();
                }}><i className="fa fa-play"></i></button>)}

                {this.state.is_started && !this.state.is_paused && (<button className="btn btn-default btn-sm" onClick={(e:any) => {
                    this.pause();
                }}><i className="fa fa-pause"></i></button>)}
                
                {this.state.is_started && this.state.is_paused && (<button className="btn btn-default btn-sm" onClick={(e:any) => {
                    this.stop();
                }}><i className="fa fa-stop"></i></button>)}
                {this.state.is_started && !this.state.is_paused && (<button className="btn btn-default btn-sm" onClick = {(e:any) => {
                    this.lap();
                }}><i className="fa fa-flag-checkered"></i></button>)}
                        
                        </div>
                    </div>
                </div>
                
                
                

                
            </div>
        );
    }
}

function mapStateToProps(state: any) {
    return state;
}

export default connect(mapStateToProps)(Timer);

