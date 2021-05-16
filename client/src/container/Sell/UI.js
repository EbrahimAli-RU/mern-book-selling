import Book from './Book'
import Basic from './Basic'
import Owner from './Owner'
const UI = ({ toggleState, bookData, filterData, inputHandler, toggleTab, sell, isDisabled }) => {
    return (
        <div className='div__wrapper'>
            <div className='sell-book__content'>
                <div className='detailPage__content'>
                    <div className='detailPage__nav__wrapper'>
                        <div className='detailPage__nav'>
                            <button
                                className={toggleState === 1 ? 'detailPage__tabs active-tabs' : 'detailPage__tabs'} >Photo</button>
                            <button
                                className={toggleState === 2 ? 'detailPage__tabs active-tabs' : 'detailPage__tabs'}>Book</button>
                            <button
                                className={toggleState === 3 ? 'detailPage__tabs active-tabs' : 'detailPage__tabs'} >Owner</button>
                        </div>
                    </div>

                    <div className='detailPage__container'>
                        <div className={toggleState === 1 ? 'detailPage__container__content active-content' : 'detailPage__container__content'} >
                            <Basic values={bookData} sellBook={sell} handler={inputHandler} />
                        </div>
                        <div className={toggleState === 2 ? 'detailPage__container__content active-content' : 'detailPage__container__content'}>
                            <Book values={bookData} handler={inputHandler} />
                        </div>
                        <div className={toggleState === 3 ? 'detailPage__container__content active-content' : 'detailPage__container__content'}>
                            <Owner option={filterData} values={bookData} handler={inputHandler} />
                        </div>
                    </div>
                    <div>
                        <button className='sell__button back'
                            disabled={toggleState === 1 ? true : false}
                            onClick={() => toggleTab('back')}>BACK</button>
                        <button className='sell__button next'
                            disabled={toggleState === 3 && isDisabled}
                            onClick={() => toggleTab('next')}>
                            {toggleState === 3 ? 'SUBMIT' : 'NEXT'}</button>
                    </div>

                </div>


            </div>
        </div>
    )
}

export default UI;
