type Props = {
    data: number,
}
const Header =(props:Props) => {

    return(
    <div className="header">
        <h1>Header{props.data}</h1>
    </div>
    )
}
export default Header;