import Lottie from 'lottie-react'
import loaderAnimation from '../../assets/loader.json'

const AppLoader = () => {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#ffffff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999
    }}>
      <Lottie
        animationData={loaderAnimation}
        loop={false}
        style={{ width: 300, height: 300 }}
      />
    </div>
  )
}

export default AppLoader