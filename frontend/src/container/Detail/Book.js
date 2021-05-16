import { Table } from 'reactstrap'

const Book = (props) => {
    return (
        <Table bordered>
            <tbody>
                <tr>
                    <td>Book name: </td>
                    <td>{props.data.bookName}</td>
                </tr>
                <tr>
                    <td>Author name:</td>
                    <td>{props.data.authorName}</td>
                </tr>
                <tr>
                    <td>Edition:</td>
                    <td>{props.data.edition}</td>
                </tr>
                <tr>
                    <td >Number of Page</td>
                    <td>{props.data.numberOfPage}</td>
                </tr>
                <tr>
                    <td>Missing page</td>
                    <td>{props.data.missingPage}</td>
                </tr>
                <tr>
                    <td>Publication</td>
                    <td>{props.data.publication}</td>
                </tr>
                <tr>
                    <td>Price</td>
                    <td>{props.data.price}</td>
                </tr>
                <tr>
                    <td>Language</td>
                    <td>{props.data.language}</td>
                </tr>
            </tbody>
        </Table>
    )
}

export default Book