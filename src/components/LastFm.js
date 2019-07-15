import React from 'react';
import Axios from 'axios';
import {API_KEY} from '../Config';
import PropTypes from 'prop-types';
import './LastFm.css';

export default class LastFm extends React.Component {
    static propTypes = {
        user: PropTypes.string,
    }

    state = {
        name: null,
        artist: null,
        album: null,
        image: null,
    }

    getMostRecentAlbum = () => {
        const { user } = this.props;

        const url = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${user}&api_key=${API_KEY}&format=json&limit=1`;
        Axios.get(url).then((response) => {
            console.log(response);
            const { artist, album, name, image} = response.data.recenttracks.track[0];
            this.setState({
                name: name,
                artist: artist['#text'],
                album: album['#text'],
                image: image[3]['#text'],
            });
        })
    }

    componentDidMount() {
        this.getMostRecentAlbum();
        this.interval = setInterval(() => this.getMostRecentAlbum(), 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render () {
        const {name, artist, album, image} = this.state;

        return (
            <div class="last_fm_art_box" style={{ backgroundImage: `url(${image})` }}>
                <div class="last_fm_text_box">
                    <div>{name}</div>
                    <div>{`${artist} - ${album}`}</div>
                </div>
            </div>
        );
    }
}
