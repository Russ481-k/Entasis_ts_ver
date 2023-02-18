
type Price = {
    currentPrice: number,
};
const Nav =(currentPrice:Price) => {

    return(
    <div className="nav">
        <h1>{currentPrice.currentPrice}</h1>
    </div>
    )
}
export default Nav;