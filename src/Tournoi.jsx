import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

const columns = [{
  id: 'Position',
  Header: '', // Required because our accessor is not a string
  accessor: d => '#' + d.position,
}, {
  Header: 'Joueur',
  accessor: 'joueur', // String-based value accessors!
}, {
  Header: 'Gain brut', // Required because our accessor is not a string
  accessor: 'gainBrut',
}, {
  Header: 'Buy-in', // Required because our accessor is not a string
  accessor: 'buyIn',
}, {
  id: 'Gain net',
  Header: 'Gain net', // Required because our accessor is not a string
  accessor: d => d.gainBrut - d.buyIn,
}];


export default function Tournoi(props) {
  return (
    <div className="tournoi">
      <h3>{props.id}</h3>
      <h5>{props.date}, {props.lieu}</h5>
      <ReactTable
        data={props.resultat}
        columns={columns}
        resizable={false}
        minRows="0"
        showPagination={false}
        defaultSorted={[
          {
            id: "gainBrut",
            desc: true
          }
        ]}
      />
      <hr />
    </div>
  );
}


Tournoi.propTypes = {
  resultat: PropTypes.array.isRequired,
  numero: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  lieu: PropTypes.string.isRequired,
};
