const CharListItem = ({name, thumbnail, onSelectedChar, id, activeChar}) => {
    const isAvailableThumbnail = !/image_not_available.jpg$/.test(thumbnail);
    const classActiveChar = `char__item${id !== activeChar ? '' : " char__item_selected"}`
    return (
        <li className={classActiveChar}
            onClick={onSelectedChar}
            onKeyDown={(e) => {
                if (e.key === 'Enter') onSelectedChar();
            }}
            tabIndex={0}>
            <img src={thumbnail}
                 alt={name}
                 style={isAvailableThumbnail ? {} : {objectFit: 'unset'}}/>
            <div className="char__name">{name}</div>
        </li>
    )
}

export default CharListItem;