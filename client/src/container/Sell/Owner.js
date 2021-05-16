import Input from '../../component/dropodownInput/Input'
import SellInput from './Input'
const Owner = (props) => {
    const { name, mobile, region, city, area } = props.values
    const regionOption = ["barisal", "chittagong", "dhaka", "khulna", "mymensingh", "rajshahi", "sylhet", "rangpur"]
    return (
        <>
            <div>
                <div className='sell__book-left__input-container'>
                    <SellInput type='text'
                        placeholder='Owner Name'
                        name='name'
                        value={name}
                        handler={props.handler}
                        isRequired={true} />
                </div>
                <div className='sell__book-right__input-container'>
                    <SellInput type='text'
                        placeholder='Mobile'
                        name='mobile'
                        value={mobile}
                        handler={props.handler}
                        isRequired={true} />
                </div>
            </div>
            <div>
                <div className='sell__book-left__input-container'>
                    <Input option={regionOption}
                        mark='Region'
                        value={region}
                        handler={props.handler}
                        isDisable={false}
                        name='region' />
                </div>
                <div className='sell__book-right__input-container'>
                    <Input option={props.option.city}
                        mark='City'
                        value={city}
                        handler={props.handler}
                        isDisable={region === ''}
                        name='city' />
                </div>
            </div>
            <div>
                <div style={{ width: '46%', display: 'inline-block', }}>
                    <Input option={props.option.area}
                        mark='Area'
                        value={area}
                        handler={props.handler}
                        isDisable={region === '' || city === ''}
                        name='area' />
                </div>
            </div>
            <div>
                <textarea placeholder='Address' className='input__container__auth-input' />
            </div>
        </>
    )
}

export default Owner