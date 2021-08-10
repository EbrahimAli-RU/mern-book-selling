import React from 'react'
import SellInput from './Input'
import UploadImage from './UploadImage'
const Basic = (props) => {
    const { bookName, authorName, coverphoto, coverphoto1, photos, photos1 } = props.values
    return (
        <>
            <SellInput type='text'
                placeholder='Book Name'
                value={bookName}
                handler={props.handler}
                name='bookName'
                isRequired={true} />

            <SellInput type='text'
                placeholder='Author Name'
                value={authorName}
                handler={props.handler}
                name='authorName'
                isRequired={true} />
            {props.sellBook ? <>
                <div className='form__group' style={{ display: 'inline-block', marginRight: '1rem' }}>
                    <img className='sellbook__image' src={coverphoto1} alt='cover' />
                    <br />
                    <UploadImage
                        buttonTitle='Cover photo'
                        inputName='coverphoto'
                        isMultiple={false}
                        handler={props.handler} />
                </div>
                <div className='form__group' style={{ display: 'inline-block' }}>
                    {photos1.map(el =>
                        <img key={el} className='sellbook__image' src={el} alt='other' />)}
                    <br />
                    <UploadImage
                        buttonTitle='photos'
                        inputName='photos'
                        isMultiple={true}
                        handler={props.handler} />
                </div> </> : <>
                <div className='form__group' style={{ display: 'inline-block', marginRight: '1rem' }}>
                    {coverphoto1 !== '' ? <img className='sellbook__image' src={coverphoto1} alt='cover' /> :
                        <img className='sellbook__image' src={`data:image/png;base64, ${new Buffer.from(coverphoto).toString("base64")}`} alt='cover' />}
                    <br />
                    <UploadImage
                        buttonTitle='Cover photo'
                        inputName='coverphoto'
                        isMultiple={false}
                        handler={props.handler} />
                </div>
                <div className='form__group' style={{ display: 'inline-block' }}>
                    {photos1.length !== 0 ? <>
                        {photos1.map(el =>
                            <img key={el} className='sellbook__image' src={el} alt='other' />)}</> :
                        <>
                            {photos.map((el, i) =>
                                <img key={i} className='sellbook__image' src={`data:image/png;base64, ${new Buffer.from(el).toString("base64")}`} alt='other' />)}
                        </>}
                    <br />
                    <UploadImage
                        buttonTitle='photos'
                        inputName='photos'
                        isMultiple={true}
                        handler={props.handler} />
                </div> </>}
        </>
    )
}

export default Basic