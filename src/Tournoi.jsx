import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import AvatarMini from './AvatarMini';


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
            id: "Position",
            desc: false
          }
        ]}
      />
      <hr />
    </div>
  );
}


Tournoi.propTypes = {
  resultat: PropTypes.array.isRequired,
  date: PropTypes.string.isRequired,
  lieu: PropTypes.string.isRequired,
};

const columns = [{
  id: 'Position',
  Header: '', // Required because our accessor is not a string
  accessor: d => '#' + d.position,
  maxWidth: 50
}, {
  Header: 'Joueur',
  accessor: 'joueur',
  Cell: row => (
    <div>
      <AvatarMini joueur={row.value} width="30" height="30" /> {row.value}
    </div>
  )
}, {
  Header: 'Gain brut', // Required because our accessor is not a string
  accessor: 'gainBrut',
  sortMethod: inverseSort
}, {
  Header: 'Buy-in', // Required because our accessor is not a string
  accessor: 'buyIn',
}, {
  id: 'Gain net',
  Header: 'Gain net', // Required because our accessor is not a string
  accessor: d => d.gainBrut - d.buyIn,
  sortMethod: inverseSort
}];

function inverseSort(a, b, desc) {
  // force null and undefined to the bottom
  a = a === null || a === undefined ? -Infinity : a;
  b = b === null || b === undefined ? -Infinity : b;
  // force any string values to lowercase
  a = typeof a === "string" ? a.toLowerCase() : a;
  b = typeof b === "string" ? b.toLowerCase() : b;
  // Return either 1 or -1 to indicate a sort priority
  if (a < b) {
    return 1;
  }
  if (a > b) {
    return -1;
  }
  // returning 0 or undefined will use any subsequent column sorting methods or the row index as a tiebreaker
  return 0;
}
