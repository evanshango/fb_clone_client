const Shortcut = ({link, name, image}) => {
    return (
        <a href={link} className="shortcut_item hover2" target={'_blank'} rel={'noreferrer'}>
            <img src={image} alt={name}/>
            <span>{name}</span>
        </a>
    )
}

export default Shortcut
