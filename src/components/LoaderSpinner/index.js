import Loader from 'react-loader-spinner'

const LoaderSpinner = () => (
  <div className="loader__cont">
    <Loader
      type="Puff"
      height="80"
      width="80"
      radius={9}
      color="#F7931E"
      ariaLabel="three-dots-loading"
      wrapperStyle
      wrapperClass
    />
  </div>
)

export default LoaderSpinner
