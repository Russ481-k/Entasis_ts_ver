
type Price = {
    rtd: number,
};
const Nav =(props:Price) => {

    return(
    <div className="nav">
        <h1>{props.rtd}</h1>
    </div>
    )
}
export default Nav;