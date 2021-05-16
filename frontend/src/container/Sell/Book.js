import Input from '../../component/dropodownInput/Input'
import SellInput from './Input'
const Book = (props) => {
    const { edition, language, price, publication, numberOfPage, missingPage, missingPageYes } = props.values
    const option = ['Bangla', 'English']
    const editoinOption = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Nineth', 'Tenth', 'Or More than Ten']
    return (
        <>
            <div>
                <div className='sell__book-left__input-container'>
                    <Input mark='Edition'
                        option={editoinOption}
                        isDisable={false}
                        name='edition'
                        value={edition}
                        handler={props.handler} />
                </div>
                <div className='sell__book-right__input-container'>
                    <Input mark='Language'
                        option={option}
                        isDisable={false}
                        name='language'
                        value={language}
                        handler={props.handler} />
                </div>
            </div>
            <div>
                <div className='sell__book-left__input-container'>
                    <SellInput type='number'
                        placeholder='Price'
                        value={price}
                        handler={props.handler}
                        name='price'
                        isRequired={true} />
                </div>
                <div className='sell__book-right__input-container'>
                    <SellInput type='text'
                        placeholder='Publication'
                        value={publication}
                        handler={props.handler}
                        name='publication'
                        isRequired={true} />
                </div>
            </div>
            <div style={{ position: 'relative' }}>
                <div className='sell__book-left__input-container'>
                    <SellInput type='number'
                        placeholder='Number Of Page'
                        value={numberOfPage}
                        handler={props.handler}
                        name='numberOfPage'
                        isRequired={true} />
                </div>
                <div className='sell__book-missingPage-div'>
                    <p className='sell__book-missingPage-title'>Missing Page:</p>
                    <input className='sell__book-missingPage-input'
                        value='yes' onChange={props.handler}
                        checked={missingPage.toLowerCase() !== 'no' ? true : false}
                        type="radio"
                        id="yes"
                        name='missingPage' />
                    <label htmlFor="yes"> Yes</label>
                    <input className='sell__book-missingPage-input'
                        checked={missingPage.toLowerCase() === 'no' ? true : false}
                        value='no'
                        onChange={props.handler}
                        type="radio"
                        id="no"
                        name='missingPage' />
                    <label htmlFor="no"> No</label>
                </div>
            </div>
            {missingPage === 'yes' || missingPage !== 'no' ?
                <div>
                    <textarea name='missingPageYes'
                        value={missingPageYes}
                        onChange={props.handler}
                        placeholder='Ex. 15 to 32, 53 to 76 '
                        className='input__container__auth-input' />
                </div> : null}
        </>
    )
}

export default Book