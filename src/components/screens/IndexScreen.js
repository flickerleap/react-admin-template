import React from 'react'
import { DataTable } from '../data/DataTable'
import { Loading } from '../utility/Loading'
import { AddButton } from '../data/AddButton'
import qs from 'query-string'

/**
 * Component to display data screen for model
 *
 * @param props
 * @returns {IndexScreen}
 */
export class IndexScreen extends React.Component {
  /**
   *
   * @param {Object} props
   */
  constructor (props) {
    super(props)

    this.state = {
      loading: true
    }
  }

  /**
   *
   * @returns {{page: number|*}}
   */
  getParams = () => {
    const params = this.getQueryParams()

    return {
      ...params,
      page: params.page || 1
    }
  }

  /**
   *
   * @returns {*|{}}
   */
  getQueryParams () {
    const params = qs.parse(this.props.history.location.search)

    return params || {}
  }

  /**
   * Runs code when the component has been mounted
   */
  componentDidMount () {
    this.fetchItems({})
  }

  /**
   *
   * @param {number} page
   * @param {{}} filters
   * @param {boolean} resetParams
   */
  fetchItems = ({page = 1, filters = {}, resetParams = false}) => {
    const {fetch, params: paramsFromProps = {}} = this.props
    const params = Object.assign(paramsFromProps, this.getParams())
    params.page = params.page || page
    params.filters = params.filters ? Object.assign(params.filters, filters) : filters
    if (resetParams) {
      params.filters = filters
      params.page = page
    }
    fetch(params).then((action) => {
      this.setState(() => ({
        loading: false
      }))
    })
  }

  /**
   *
   * @returns {string}
   */
  getAddUrl = () => {
    const path = this.props.location.pathname
    const lastChar = path.slice(-1)
    return lastChar === '/' ? `${path}add` : `${path}/add`
  }

  /**
   *
   * @param {{}} filters
   */
  onFilter = (filters = {}) => {
    this.setState(() => ({
      loading: true
    }))
    this.fetchItems({filters, resetParams: true})
  }

  /**
   *
   * @returns {*}
   */
  render () {
    const {title = 'View', fields = [], items = [], actions = [], pagination = {}, showAddButton = true, showFilters = true} = this.props

    return (
      <div className='row'>
        <div className='col-md-12'>
          <h3>{title}</h3>
        </div>
        <div className='col-md-12'>
          {
            showAddButton && <AddButton link={this.getAddUrl()} type={title}/>
          }
          <br/>
        </div>

        <div className='col-md-12'>
          {this.state.loading && <Loading active={this.state.loading}/>}
          <DataTable
            title={title}
            fields={fields}
            items={items}
            actions={actions}
            pagination={pagination}
            onFilter={this.onFilter}
            showFilters={showFilters}
          />
        </div>
      </div>
    )
  }
}
