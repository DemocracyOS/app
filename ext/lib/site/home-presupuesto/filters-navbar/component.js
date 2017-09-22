import React, { Component } from 'react'
import ReactOutsideEvent from 'react-outside-event'
import distritos from '../distritos.json'

let distritoCurrent = ''

class FiltersNavbar extends Component {
  constructor (props) {
    super(props)

    this.state = {

      distrito: distritos[0],

      appliedFilters: {
        edad: {
          adultos: false,
          jovenes: false
        },
        distrito: {
          centro: false,
          noroeste: false,
          norte: false,
          oeste: false,
          sudoeste: false,
          sur: false
        },
        anio: {
          proyectos2015: false,
          proyectos2016: false,
          proyectos2017: false
        },
        estado: {
          proyectados: false,
          ejecucion: false,
          finalizados: false
        }
      },

      selectFilters: {
        edad: {
          adultos: false,
          jovenes: false
        },
        distrito: {
          centro: false,
          noroeste: false,
          norte: false,
          oeste: false,
          sudoeste: false,
          sur: false
        },
        anio: {
          proyectos2015: false,
          proyectos2016: false,
          proyectos2017: false
        },
        estado: {
          proyectados: false,
          ejecucion: false,
          finalizados: false
        }
      },

      navbarUI: {
        edad: null,
        distrito: null,
        anio: null,
        estado: null
      },

      activeDropdown: ''
    }
  }

  //this.handleCheckboxChange = this.handleCheckboxChange.bind(this) O USAR ARROW FUNCTION
  // LAS ARROW FUNCTIONS TIENEN EL SCOPE DEL COMPONENTE

  handleCheckboxChange = (select) => (e) => {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const id = target.id

    let selectFilters = Object.assign({}, this.state.selectFilters)

    selectFilters[select][id] = value

    this.setState({
      selectFilters: selectFilters
    }, function () {
      console.log(this.state.selectFilters)
    })
  }

  // cancelApplyFilters = () => {
  //   console.log('entra en cancelApplyFilters')
  //   //console.log('initial applied filters ', this.state.appliedFilters)
  //   var appliedFilters = this.state.appliedFilters
  //   this.setState ({
  //     // se actualiza selectFilters y se cierra el dropdown
  //     selectFilters: appliedFilters,
  //     activeDropdown: ''
  //   })
  // }

  // applyFilters = () => {
  //   console.log('entra en applyFilters')
  //   var selectFilters = this.state.selectFilters
  //   this.setState ({
  //     // se actualiza appliedFilters y se cierra el dropdown
  //     appliedFilters: selectFilters,
  //     activeDropdown: ''
  //   })
  // }

  handleDropdown = (id) => (e) => {
    // si se apreta el botón de un dropdown ya abierto, se cierra
    if (this.state.activeDropdown == id) {
      this.setState({activeDropdown: ''})
    } else {
      // se actualiza selectFilters y se abre el dropdown
      // var appliedFilters = this.state.appliedFilters
      this.setState({
        selectFilters: Object.assign({}, this.state.appliedFilters),  // NO FUNCA
        activeDropdown: id
      })
    }
  }

  handleDistritoFilterChange = (distrito) => {
    distritoCurrent = distrito.name
    window.history.pushState(null, null, `#${distrito.name}`)
    this.setState({ distrito }, this.fetchForums)
  }

  // cerrar dropdown si hago click afuera
  onOutsideEvent = () => {
    if (!this.state.activeDropdown) return
    this.setState({activeDropdown: ''})
  }


  render () {
    return (
      <div>
    {this.props.stage == 'votacion' ? (
        <DistritoFilter
              active={this.state.distrito}
              onChange={this.handleDistritoFilterChange} />
        ) : (
        <header>

          <div className='stage-header'>
            <div className='pp-stage'>
              Seguimiento de proyectos
            </div>
            <span className='header-text'>Elegí tu filtro:</span>
          </div>

          <nav>
            <div className='filter'>
              <button
                type='button'
                id="filtro-edad"
                className='btn btn-md btn-outline-primary'
                onClick={this.handleDropdown('opciones-edad')}
                >
                <span className='btn-content'><span className='btn-text'>Rango de edad</span> <span className='badge'>2</span></span> <span className='caret-down'>▾</span>
              </button>
              {this.state.activeDropdown == 'opciones-edad' && (
              <div className='filter-dropdown' id="opciones-edad">
                <div className='filter-options'>

                  <div className='filter-column'>
                    <div className='option-container'>
                      <div className='check-container'>
                        <input onChange={this.handleCheckboxChange('edad')} type='checkbox' id='adultos' name='edad' checked={this.state.selectFilters.edad.adultos} />
                        <label htmlFor='adultos'></label>
                      </div>
                      <label htmlFor='adultos'>Proyecto adultos</label>
                    </div>
                    <div className='option-container'>
                      <div className='check-container'>
                        <input onChange={this.handleCheckboxChange('edad')} type='checkbox' id='jovenes' name='edad' checked={this.state.selectFilters.edad.jovenes} />
                        <label htmlFor='jovenes'></label>
                      </div>
                      <label htmlFor='jovenes'>Proyecto jóvenes</label>
                    </div>
                  </div>

                </div>
                <div className='dropdown-actions'>
                  <a className='cancelar' onClick={this.cancelApplyFilters}>Cancelar</a>
                  <a className='aplicar' onClick={this.applyFilters}>Aplicar</a>
                </div>
              </div>
              )}
            </div>

            <div className='filter'>
              <button
                type='button'
                id="filtro-distrito"
                className = 'btn btn-md btn-outline-primary'
                onClick = {this.handleDropdown('opciones-distrito')}>
                <span className='btn-content'><span className='btn-text'>Distrito</span> <span className='badge'>3</span></span> <span className='caret-down'>▾</span>
              </button>
              {this.state.activeDropdown == 'opciones-distrito' && (
                <div className='filter-dropdown' id="opciones-distrito">

                  <div className='filter-options'>

                    <div className='filter-column'>
                      <div className='option-container'>
                        <div className='check-container'>
                          <input onChange={this.handleCheckboxChange('distrito')} type='checkbox' id='centro' name='distrito' checked={this.state.selectFilters.distrito.centro} />
                          <label htmlFor='centro'></label>
                        </div>
                        <label htmlFor='centro'>Centro</label>
                      </div>
                      <div className='option-container'>
                        <div className='check-container'>
                          <input onChange={this.handleCheckboxChange('distrito')} type='checkbox' id='noroeste' name='distrito' checked={this.state.selectFilters.distrito.noroeste} />
                          <label htmlFor='noroeste'></label>
                        </div>
                        <label htmlFor='noroeste'>Noroeste</label>
                      </div>
                      <div className='option-container'>
                        <div className='check-container'>
                          <input onChange={this.handleCheckboxChange('distrito')} type='checkbox' id='norte' name='distrito' checked={this.state.selectFilters.distrito.norte} />
                          <label htmlFor='norte'></label>
                        </div>
                        <label htmlFor='norte'>Norte</label>
                      </div>
                    </div>

                    <div className='filter-column'>
                      <div className='option-container'>
                        <div className='check-container'>
                          <input onChange={this.handleCheckboxChange('distrito')} type='checkbox' id='oeste' name='distrito' checked={this.state.selectFilters.distrito.oeste} />
                          <label htmlFor='oeste'></label>
                        </div>
                        <label htmlFor='oeste'>Oeste</label>
                      </div>
                      <div className='option-container'>
                        <div className='check-container'>
                          <input onChange={this.handleCheckboxChange('distrito')} type='checkbox' id='sudoeste' name='distrito' checked={this.state.selectFilters.distrito.sudoeste} />
                          <label htmlFor='sudoeste'></label>
                        </div>
                        <label htmlFor='sudoeste'>Sudoeste</label>
                      </div>
                       <div className='option-container'>
                        <div className='check-container'>
                          <input onChange={this.handleCheckboxChange('distrito')} type='checkbox' id='sur' name='distrito' checked={this.state.selectFilters.distrito.sur} />
                          <label htmlFor='sur'></label>
                        </div>
                        <label htmlFor='sur'>Sur</label>
                      </div>
                    </div>

                  </div>
                  <div className='dropdown-actions'>
                    <a className='cancelar' onClick={this.cancelApplyFilters}>Cancelar</a>
                    <a className='aplicar' onClick={this.applyFilters}>Aplicar</a>
                  </div>
                </div>
                )}
            </div>

            <div className='filter'>
              <button
                type='button'
                id="filtro-anio"
                className = 'btn btn-md btn-outline-primary'
                onClick = {this.handleDropdown('opciones-anio')}>
                <span className='btn-content'><span className='btn-text'>Año</span> <span className='badge'>2</span></span> <span className='caret-down'>▾</span>
              </button>
              {this.state.activeDropdown == 'opciones-anio' && (
                <div className='filter-dropdown' id="opciones-anio">
                  <div className='filter-options'>

                    <div className='filter-column'>
                      <div className='option-container'>
                        <div className='check-container'>
                          <input onChange={this.handleCheckboxChange('anio')} type='checkbox' id='proyectos2015' name='anio' checked={this.state.selectFilters.anio.proyectos2015} />
                          <label htmlFor='proyectos2015'></label>
                        </div>
                        <label htmlFor='proyectos2015'>2015</label>
                      </div>
                      <div className='option-container'>
                        <div className='check-container'>
                          <input onChange={this.handleCheckboxChange('anio')} type='checkbox' id='proyectos2016' name='anio' checked={this.state.selectFilters.anio.proyectos2016} />
                          <label htmlFor='proyectos2016'></label>
                        </div>
                        <label htmlFor='proyectos2016'>2016</label>
                      </div>
                      <div className='option-container'>
                        <div className='check-container'>
                          <input onChange={this.handleCheckboxChange('anio')} type='checkbox' id='proyectos2017' name='anio' checked={this.state.selectFilters.anio.proyectos2017} />
                          <label htmlFor='proyectos2017'></label>
                        </div>
                        <label htmlFor='proyectos2017'>2017</label>
                      </div>
                    </div>

                  </div>
                  <div className='dropdown-actions'>
                    <a className='cancelar' onClick={this.cancelApplyFilters}>Cancelar</a>
                    <a className='aplicar' onClick={this.applyFilters}>Aplicar</a>
                  </div>
                </div>
                )}
            </div>

            <div className='filter'>
              <button
                type='button'
                id="filtro-estado"
                className = 'btn btn-md btn-outline-primary'
                onClick = {this.handleDropdown('opciones-estado')}>
                <span className='btn-content'><span className='btn-text'>Estado</span> <span className='badge'>2</span></span> <span className='caret-down'>▾</span>
              </button>
              {this.state.activeDropdown == 'opciones-estado' && (
                <div className='filter-dropdown' id="opciones-estado">
                  <div className='filter-options'>

                    <div className='filter-column'>
                      <div className='option-container'>
                        <div className='check-container'>
                          <input onChange={this.handleCheckboxChange('estado')} type='checkbox' id='proyectados' name='estado' checked={this.state.selectFilters.estado.proyectados} />
                          <label htmlFor='proyectados'></label>
                        </div>
                        <label htmlFor='proyectados'>Proyectados</label>
                      </div>
                      <div className='option-container'>
                        <div className='check-container'>
                          <input onChange={this.handleCheckboxChange('estado')}  type='checkbox' id='ejecucion' name='estado' checked={this.state.selectFilters.estado.ejecucion} />
                          <label htmlFor='ejecucion'></label>
                        </div>
                        <label htmlFor='ejecucion'>En ejecución</label>
                      </div>
                      <div className='option-container'>
                        <div className='check-container'>
                          <input onChange={this.handleCheckboxChange('estado')} type='checkbox' id='finalizados' name='estado' checked={this.state.selectFilters.estado.finalizados} />
                          <label htmlFor='finalizados'></label>
                        </div>
                        <label htmlFor='finalizados'>Finalizados</label>
                      </div>
                    </div>

                  </div>

                  <div className='dropdown-actions'>
                    <a className='cancelar' onClick={this.cancelApplyFilters}>Cancelar</a>
                    <a className='aplicar' onClick={this.applyFilters}>Aplicar</a>
                  </div>
                </div>
                )}
            </div>
          </nav>
        </header>
      )}
      </div>
  )} // cierro el render

} // cierro el componente

export default ReactOutsideEvent(FiltersNavbar)


function DistritoFilter (props) {
  const { active, onChange } = props

  console.log('distritofilter', distritos.map)
  console.log('props', props)

  return (
    <header>
      <div className='stage-header'>
        <div className='pp-stage'>
          Votación abierta
        </div>
        <span className='header-text'>Elegí tu distrito:</span>
      </div>
      <nav>
        <div className='filter'>
          {distritos.map((d) => {
            const isActive = d.name === active.name ? ' active' : ''
            return (
              <button
                type='button'
                key={d.name}
                data-name={d.name}
                onClick={() => onChange(d)}
                className={`btn btn-md btn-outline-primary${isActive} btn-votacion`}>
                <span className='btn-content'><span className='btn-text'>{d.title}</span></span>
              </button>
            )
          })}
        </div>
      </nav>
    </header>
  )
}