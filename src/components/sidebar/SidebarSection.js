const SidebarSection = ({ title, items, toggle }) => {
    return (
        <div className='menu'>
            <p>{ title }</p>
            {
                items.map((item, idx) =>
                    <button key={ idx }>
                        <i className={ 'bi ' + item.icon }></i> { item.title }
                        <div className='form-check form-switch'>
                            <input
                                className='form-check-input'
                                type='checkbox'
                                role='switch'
                                checked={ item.set }
                                onChange={ () => { toggle(idx) } }>
                            </input>
                        </div>
                    </button>
                )
            }
        </div>
    );
};

export default SidebarSection;