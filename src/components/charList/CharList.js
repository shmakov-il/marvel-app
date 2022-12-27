import './charList.scss';
import {Component} from "react";
import PropTypes from 'prop-types';
import MarvelService from "../../services/MarvelService";
import CharListItem from "../charListItem/CharListItem";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        newItemsLoading: false,
        offset: 200,
        charEnd: false,
    }

    marvelService = new MarvelService();

    componentDidMount() {
        if (this.state.offset < 209) {
            this.onRequest();
        }
        window.addEventListener("scroll", this.onScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.onScroll);
    }

    onScroll = () => {
        if (this.state.offset < 209) return;
        if (this.state.newItemsLoading) return;
        if (this.state.charEnd) window.removeEventListener("scroll", this.onScroll);

        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            this.onRequest(this.state.offset);
        }
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getCharactersAll(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError);
    }

    onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) ended = true;

        this.setState(({charList, offset}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemsLoading: false,
            offset: offset + 9,
            charEnd: ended,
        }))
    }

    onCharListLoading = () => {
        this.setState({
            newItemsLoading: true
        })
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false,
        })
    }

    createCharItem = (charList) => {
        const items = charList.map(item => {
            return (
                <CharListItem
                    key={item.id}
                    {...item}
                    onSelectedChar={() => this.props.onSelectedChar(item.id)}
                    activeChar={this.props.activeChar}/>
            )
        })
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    render() {
        const {charList, loading, error, offset, newItemsLoading, charEnd} = this.state;
        const items = this.createCharItem(charList)
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
                        onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onSelectedChar: PropTypes.func.isRequired,
}

export default CharList;