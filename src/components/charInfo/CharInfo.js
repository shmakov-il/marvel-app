import React from "react";
import PropTypes from 'prop-types';
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";

import './charInfo.scss';

const CharInfo = (props) => {
    const [char, setChar] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const marvelService = new MarvelService();

    React.useEffect(() => {
        updateChar();
    }, [props.charID])

    const updateChar = () => {
        const charID = props.charID;

        if (!charID) return;

        setLoading(true);
        marvelService.getCharacter(charID)
            .then(onCharLoaded)
            .catch(onError);
    }

    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(false);
    }

    const onError = () => {
        setError( true);
        setLoading(false);
    }

    const skeleton = char || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(error || loading || !char) ? <ViewCharInfo char={char}/> : null;
    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const ViewCharInfo = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    const isAvailableThumbnail = !/image_not_available.jpg$/.test(thumbnail);
    const viewComics = !comics.length ? 'No comics' : comics.map((item, i) => {
        return (
            <li className="char__comics-item"
                key={i}>
                {item.name}
            </li>
        )
    }).splice(0, 10);

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={isAvailableThumbnail ? {} : {objectFit: 'unset'}}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {viewComics}
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charID: PropTypes.number,
}

export default CharInfo;