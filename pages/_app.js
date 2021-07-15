import 'styles/globals.css'
import 'styles/form.css'

const App = ({ Component }) => {
  return (
    <>
      <Component />
      <button
        onClick={async () => {
          const response = await fetch('https://test.shnm.ml')
          const res = await response.json()
          console.log(res)
        }}
      >
        test
      </button>
    </>
  )
}

export default App
