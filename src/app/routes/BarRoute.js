import { provideHooks } from 'redial'
import { connect } from 'react-redux'
import DocumentMeta from 'react-helmet'
import * as barActions from 'app/actions/bar.actions'

@provideHooks({
  // return the promise for server side trigger
  defer: ({ dispatch }) => dispatch(barActions.apiFetch()),
})
@connect(state => ({
  bar: state.get('bar').get('data'),
}))
export default class BarRoute extends React.Component {
  render() {
    const { bar } = this.props
    return (
      <section className='BarRoute'>
        <DocumentMeta title='Bar' />
        <h3>Bar</h3>
        {bar.map((item, i) =>
          <p key={i}>{item}</p>
        )}
      </section>
    )
  }
}
