import React, { Component } from "react";

class FlightTable extends Component {
  constructor(props) {
    super(props);
    this.sortHandler = this.sortHandler.bind(this);
    this.onMouseDownHandler = this.onMouseDownHandler.bind(this);
    this.onContextMenuHandler = this.onContextMenuHandler.bind(this);
  }

  sortHandler(item) {
    this.props.onSort(item);
  }

  onContextMenuHandler(e) {
    this.props.handleRightClick(e);
  }

  onMouseDownHandler(e) {
    this.props.handleClick(e);
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            {this.props.columns.map((item, i) => (
              <th
                id={item.includes(";") ? item.split(";")[0].trim() : item}
                key={i}
                className={item.includes(";") ? item.split(";")[1].trim() : ""}
                onClick={() => this.sortHandler(item)}
              >
                {item.includes(";") ? item.split(";")[0].trim() : item}
                <hr />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {this.props.content.map((i, ii) => (
            <tr key={"tr" + ii} id={ii}>
              {Object.keys(i).map((j, jj) =>
                jj < this.props.columns.length ? (
                  <td
                    id={`${ii}/${jj}`}
                    onContextMenu={this.onContextMenuHandler}
                    onMouseDown={this.onMouseDownHandler}
                    key={jj}
                    className={i[j].split(";")[i[j].split(";").length - 1]}
                  >
                    {i[j].split(";")[i[j].split(";").length - 2]}
                  </td>
                ) : (
                  undefined
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default FlightTable;

// export default function Thead(props) {
//   return (
//     <thead>
//       <tr>
//         {props.columns.map((item, i) => (
//           <th
//             key={i}
//             className={item.includes(";") ? item.split(";")[1].trim() : ""}
//             onClick={this.handler}
//           >
//             {item.includes(";") ? item.split(";")[0].trim() : item}
//             <hr />
//           </th>
//         ))}
//       </tr>
//     </thead>
//   );
// }
