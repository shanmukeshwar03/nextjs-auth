const Form = (props) => {
  return (
    <form className='form__container' onSubmit={props.onSubmit}>
      {props.loading && <span className='tint'></span>}
      {props.loading && <span className='loading'></span>}
      {props.error && <header className='form__error'>{props.error}</header>}
      {props.success && (
        <header className='form__success'>{props.success}</header>
      )}
      <h1>{props.title}</h1>
      {props.children}
    </form>
  )
}
export default Form
