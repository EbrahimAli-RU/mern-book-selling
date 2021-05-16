import { Table } from 'reactstrap'
const Owner = (props) => {
    return (
        <Table bordered>
            <tbody>
                <tr>
                    <td>Name </td>
                    <td>{props.data.name}</td>
                </tr>
                <tr>
                    <td>Mobile</td>
                    <td>{props.data.mobile}</td>
                </tr>
                <tr>
                    <td colSpan="2" style={{ textAlign: 'center', fontWeight: 'bold' }}><i>Delivery Address:</i></td>
                    {/* <td></td> */}
                </tr>
                <tr>
                    <td style={{ backgroundColor: '#f8f9fa', width: '30%' }}>Region</td>
                    <td>{props.data.region}</td>
                </tr>
                <tr>
                    <td>City</td>
                    <td>{props.data.city}</td>
                </tr>
                <tr>
                    <td>Area</td>
                    <td>{props.data.area}</td>
                </tr>

            </tbody>
        </Table>
    )
}

export default Owner