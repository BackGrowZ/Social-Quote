import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ADD_QUOTE, FETCH_QUOTE } from '../reducers/citationReducer'
import { AJOUT_LIKE } from '../reducers/likeReducer'
import { AJOUT_COM } from '../reducers/commentaireReducer'
import base from '../keys'

class AddCitation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show:true,
            citation: '',
            auteur: '',
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.fetchAllQuote = this.fetchAllQuote.bind(this)
    }
    // componentDidMount() {
    //     this.fetchAllQuote()
    // }
    fetchAllQuote = async () => {
        const citation = await base.fetch('/citation/AllQuote', {
            context: this,
        })
        await this.props.fetchQuote(citation)
    }
    handleClick(e) {
        e.preventDefault();
        let addCitation = this.state.citation
        let addAuteur = this.state.auteur
        if (addAuteur !== '' && addCitation !== '') {
            this.setState({ auteur: '', citation: '' })
            this.props.addQuote(addCitation, addAuteur)
            this.props.end()
        }
    }
    handleInputChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.id;

        this.setState({
            [name]: value
        });

    }
    render() {
        let { uid } = this.props

        const addCitation = (uid && this.state.show) ? 
            <div className='container mt-5'>
                <form onSubmit={this.handleClick}>
                    <div className='form-group'>
                        <label htmlFor="citation">Citation</label>
                        <input type='text' id='citation' className='form-control' onChange={this.handleInputChange} value={this.state.citation} placeholder='Entrer votre citation'></input>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="auteur">Auteur</label>
                        <input type='text' id='auteur' className='form-control' onChange={this.handleInputChange} value={this.state.auteur} placeholder="Entrer l'auteur de la citation"></input>
                    </div>
                    <button type='submit' className="btn btn-primary">Ajouter</button>
                </form>
            </div>
            : null
        return (
            addCitation
        )
    }
}
const mapStatetoProps = state => {
    return {
        uid: state.login.uid
    }
}

// modifier
const mapDispatchToProps = dispatch => {
    return {
        addQuote: (citation, auteur) => {
            dispatch({ type: ADD_QUOTE, citation: citation, auteur: auteur })
            dispatch({ type: AJOUT_LIKE })
            dispatch({ type: AJOUT_COM })
        },
        fetchQuote: (citation) => {
            dispatch({ type: FETCH_QUOTE, citations: citation })
        }
    }
}


export default connect(mapStatetoProps, mapDispatchToProps)(AddCitation)