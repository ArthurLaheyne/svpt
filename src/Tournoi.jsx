import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

const columns = [{
  Header: 'Joueur',
  accessor: 'joueur', // String-based value accessors!
}, {
  Header: 'Buy-in', // Required because our accessor is not a string
  accessor: 'buyIn',
}, {
  Header: 'Gain brut', // Required because our accessor is not a string
  accessor: 'gainBrut',
}, {
  id: 'Gain net',
  Header: 'Gain net', // Required because our accessor is not a string
  accessor: d => d.gainBrut - d.buyIn,
}];


export default function Tournoi(props) {
  return (
    <div>
      <h3>Tournoi {props.numero} du {props.date} à {props.lieu}</h3>
      <ReactTable
        data={props.resultat}
        columns={columns}
        minRows="0"
        showPagination={false}
      />
    </div>
  );
}


Tournoi.propTypes = {
  resultat: PropTypes.array.isRequired,
  numero: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  lieu: PropTypes.string.isRequired,
};
