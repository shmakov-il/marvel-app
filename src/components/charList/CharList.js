import React from "react";
import PropTypes from 'prop-types';
import MarvelService from "../../services/MarvelService";
import CharListItem from "../charListItem/CharListItem";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

import './charList.scss';

const CharList = (props) => {
    const [charList, setCharList] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [newItemsLoading, setNewItemsLoading] = React.useState(true);
    const [offset, setOffset] = React.useState(1552);
    const [charEnd, setCharEnd] = React.useState(false);
    const marvelService = new MarvelService();

    React.useEffect(() => {
        window.addEventListener("scroll", onScroll);

        return () => {
            window.removeEventListener("scroll", onScroll);
        }
    }, []);

    React.useEffect(() => {
        if (newItemsLoading && !charEnd) {
            onRequest();
        }

        if (charEnd) {
            window.removeEventListener("scroll", onScroll);
        }
    }, [newItemsLoading]);

    const onScroll = React.useCallback(() => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            setNewItemsLoading(true);
        }
    }, [])

    const onRequest = () => {
        onCharListLoading();
        marvelService.getCharactersAll(offset)
            .then(onCharListLoaded)
            .catch(onError)
            .finally(() => {
                setNewItemsLoading(false);
                setLoading(false);
            });
    }

    const onCharListLoaded = (newCharList) => {
        setCharList([...charList, ...newCharList]);
        setOffset(offset => offset + 9);
        setCharEnd(newCharList.length < 9);
    }

    const onCharListLoading = () => {
        setNewItemsLoading(true);
    }

    const onError = () => {
        setError(true);
    }

    const createCharItem = (charList) => {
        const items = charList.map(item => {
            return (
                <CharListItem
                    key={item.id}
                    {...item}
                    onSelectedChar={() => props.onSelectedChar(item.id)}
                    activeChar={props.activeChar}/>
            )
        })
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const items = createCharItem(charList);
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner />  : null;
    const content = !(error || loading) ? items : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {content}
            <button className="button button__main button__long"
                    disabled={newItemsLoading}
                    style={{display: charEnd ? 'none' : 'block'}}
                    onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onSelectedChar: PropTypes.func.isRequired,
}

export default CharList;