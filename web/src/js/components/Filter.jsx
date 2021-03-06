import React, { Component } from "react";
import { connect } from "react-redux";
import setCurrent from "./../actions/setCurrent";
import AutocompleteInput from "./AutocompleteInput";
import loadLogs from "../actions/loadLogs";
import LoadingSpinner from "./LoadingSpinner";

class Filter extends Component {
    username;

    render() {
        return (
            <form className="filter" autoComplete="off" onSubmit={this.onSubmit}>
                <AutocompleteInput placeholder="channel" onChange={this.onChannelChange} value={this.props.channel} autocompletions={this.props.channels.map(channel => channel.name)} onSubmit={() => this.username.focus()} />
                <input
                    ref={el => this.username = el}
                    type="text"
                    placeholder="username"
                    onChange={this.onUsernameChange}
                    value={this.props.username}
                />
                <button type="submit" className="show-logs">{this.props.loading ? <LoadingSpinner /> : <>Show logs</>}</button>
            </form>
        )
    }

    onChannelChange = (channel) => {
        this.props.dispatch(setCurrent(channel, this.props.username));
    }

    onUsernameChange = (e) => {
        this.props.dispatch(setCurrent(this.props.channel, e.target.value));
    }

    onSubmit = (e) => {
        e.preventDefault();

        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        params.set('channel', this.props.channel);
        params.set('username', this.props.username);
        window.location.search = params.toString();

        this.props.dispatch(loadLogs());
    }
}

const mapStateToProps = (state) => ({
    channels: state.channels,
    channel: state.channel,
    username: state.username,
    loading: state.loading
});

export default connect(mapStateToProps)(Filter);