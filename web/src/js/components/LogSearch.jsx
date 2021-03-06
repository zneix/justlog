import React, { Component } from "react";
import Filter from "./Filter";
import LogView from "./LogView";
import { connect } from "react-redux";
import loadChannels from "../actions/loadChannels";
import loadLogs from "../actions/loadLogs";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import loadBttvEmotes from "../actions/loadBttvEmotes";
import Settings from "./Settings";

class LogSearch extends Component {
    constructor(props) {
        super(props);

        props.dispatch(loadChannels());
        props.dispatch(loadBttvEmotes());
    }

    componentDidMount() {
        if (this.props.channel && this.props.username) {
            this.props.dispatch(loadLogs());
        }
    }

    render() {
        return (
            <div className="log-search">
                <ToastContainer />
                <Settings/>
                <Filter
                    channels={this.props.channels}
                />
                {Object.values(this.props.logs).map(log =>
                    <LogView key={log.getTitle()} log={log} channel={this.props.channel} username={this.props.username} />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        channels: state.channels,
        channel: state.channel,
        username: state.username,
        logs: state.logs,
    };
};

export default connect(mapStateToProps)(LogSearch);